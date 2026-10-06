import 'server-only'

import { Client, isFullDatabase } from '@notionhq/client'
import type {
  PageObjectResponse,
  QueryDataSourceResponse
} from '@notionhq/client/build/src/api-endpoints'
import { NotionToMarkdown } from 'notion-to-md'
import { unstable_cache } from 'next/cache'
import { slugify } from './slugify'

/**
 * Tag used to invalidate the cached blog posts list from the revalidate-blog
 * webhook so newly published / edited posts (and refreshed Notion S3 cover URLs)
 * appear immediately.
 */
export const NOTION_BLOG_POSTS_TAG = 'notion-blog-posts'

/**
 * Notion's `cover.file.url` and any markdown body images are AWS S3 presigned
 * URLs that expire roughly 1 hour after issuance. We must refresh them faster
 * than that, otherwise /_next/image proxies the optimizer to an expired URL
 * and returns 502. 15 minutes leaves plenty of buffer.
 */
const NOTION_BLOG_POSTS_REVALIDATE_SECONDS = 900

const parseNotionDatabaseId = (value?: string) => {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null

  const directMatch = trimmed.match(/[0-9a-fA-F]{32}|[0-9a-fA-F-]{36}/)?.[0]
  if (directMatch) return directMatch

  try {
    const parsed = new URL(trimmed)
    const extracted = parsed.pathname.match(/[0-9a-fA-F]{32}|[0-9a-fA-F-]{36}/)?.[0]
    return extracted ?? null
  } catch {
    return null
  }
}

const notionToken = process.env.NOTION_TOKEN
const notionDatabaseId = parseNotionDatabaseId(process.env.NOTION_BLOG_DATABASE_ID)

const notion = notionToken ? new Client({ auth: notionToken }) : null
const n2m = notion ? new NotionToMarkdown({ notionClient: notion as unknown as never }) : null

/**
 * Extract the video id from a YouTube URL (watch, short, embed, youtu.be).
 * Returns `null` for non-YouTube URLs.
 */
function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') return parsed.pathname.slice(1).split('/')[0] || null
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname === '/watch') return parsed.searchParams.get('v')
      const embedMatch = parsed.pathname.match(/^\/(?:embed|shorts)\/([^/?]+)/)
      if (embedMatch) return embedMatch[1]
    }
    return null
  } catch {
    return null
  }
}

/** Responsive 16:9 iframe wrapper for a YouTube embed. */
function youTubeEmbed(videoId: string): string {
  return [
    '<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:0.75rem;">',
    `<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" `,
    `src="https://www.youtube.com/embed/${videoId}" `,
    `allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" `,
    `allowfullscreen></iframe>`,
    '</div>'
  ].join('')
}

/**
 * Named size presets for the `[size]` caption hint. Authors add one of these
 * (wrapped in square brackets) anywhere in a Notion image caption to control
 * how wide the image renders on the blog:
 *
 *   [small]      → 420px   – pull-quotes, icons, small charts
 *   [medium]     → 540px   – default when no hint is given
 *   [large]      → 720px   – wide diagrams, screenshots
 *   [full]       → 100%    – edge-to-edge in the prose container
 *   [width:600]  → 600px   – any arbitrary pixel value
 *
 * The hint is stripped from the visible caption text.
 */
const IMAGE_SIZE_PRESETS: Record<string, string> = {
  small: '420px',
  medium: '540px',
  large: '720px',
  full: '100%'
}
const IMAGE_SIZE_DEFAULT = '540px'

/** Match `[small]`, `[large]`, `[full]`, `[width:600]`, etc. in a caption. */
const SIZE_HINT_RE = /\[(?:(small|medium|large|full)|width:(\d+))\]/i

function parseImageCaption(raw: string): { caption: string; maxWidth: string } {
  const match = raw.match(SIZE_HINT_RE)
  if (!match) return { caption: raw.trim(), maxWidth: IMAGE_SIZE_DEFAULT }

  const caption = raw.replace(SIZE_HINT_RE, '').trim()
  if (match[2]) return { caption, maxWidth: `${match[2]}px` }
  return { caption, maxWidth: IMAGE_SIZE_PRESETS[match[1].toLowerCase()] ?? IMAGE_SIZE_DEFAULT }
}

if (n2m) {
  /**
   * Notion stores images at full resolution regardless of the display width the
   * user set in the editor. The public API does not expose that display width.
   *
   * This transformer outputs a centered <figure> with a max-width derived from
   * (in priority order):
   *   1. A `[size]` hint in the Notion caption  — author-controlled
   *   2. Undocumented `format.block_width` data  — if the API ever returns it
   *   3. The default (540px)                     — matches typical Notion charts
   */
  n2m.setCustomTransformer('image', async (block) => {
    const b = block as Record<string, any>
    const image = b.image
    if (!image) return ''

    const url: string | undefined =
      image.type === 'external' ? image.external?.url : image.file?.url
    if (!url) return ''

    const rawCaption = (image.caption ?? []).map((c: any) => c.plain_text).join('')
    const { caption, maxWidth } = parseImageCaption(rawCaption)
    const alt = caption.replace(/"/g, '&quot;')

    // Undocumented API width takes precedence over the CSS default but not a
    // caption hint (authors always win).
    const apiWidth: number | undefined = b.format?.block_width ?? image.width
    const finalWidth = rawCaption.match(SIZE_HINT_RE) ? maxWidth : apiWidth ? `${apiWidth}px` : maxWidth

    const captionHtml = caption
      ? `<figcaption class="notion-image-caption">${caption}</figcaption>`
      : ''

    return [
      `<figure class="notion-image" style="max-width:${finalWidth};">`,
      `<img src="${url}" alt="${alt}" loading="lazy" />`,
      captionHtml,
      `</figure>`
    ].join('')
  })

  n2m.setCustomTransformer('video', async (block) => {
    const video = (block as Record<string, any>).video
    if (!video) return ''
    const url: string | undefined =
      video.type === 'external' ? video.external?.url : video.file?.url
    if (!url) return ''

    const ytId = extractYouTubeId(url)
    if (ytId) return youTubeEmbed(ytId)

    return `<video controls style="width:100%;border-radius:0.75rem;"><source src="${url}" /></video>`
  })

  n2m.setCustomTransformer('embed', async (block) => {
    const embed = (block as Record<string, any>).embed
    const url: string | undefined = embed?.url
    if (!url) return ''

    const ytId = extractYouTubeId(url)
    if (ytId) return youTubeEmbed(ytId)

    return `[${url}](${url})`
  })
}

let cachedDataSourceId: string | null = null

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

const getErrorHttpStatus = (error: unknown): number | null => {
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: unknown }).status
    if (typeof status === 'number') return status
  }
  return null
}

const isRetriableNotionError = (error: unknown) => {
  const status = getErrorHttpStatus(error)
  if (status === null) return false
  return status === 429 || status === 502 || status === 503 || status === 504
}

const withNotionRetry = async <T>(label: string, fn: () => Promise<T>): Promise<T> => {
  const maxAttempts = 5
  let lastError: unknown

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (!isRetriableNotionError(error) || attempt === maxAttempts) {
        throw error
      }
      const backoffMs = 400 * 2 ** (attempt - 1) + Math.floor(Math.random() * 250)
      console.warn(
        `[notion-blog] ${label} failed (attempt ${attempt}/${maxAttempts}), retrying in ${backoffMs}ms`,
        error
      )
      await sleep(backoffMs)
    }
  }

  throw lastError
}

const hasNotionConfig = () => Boolean(notion && notionToken && notionDatabaseId)

const getBlogDataSourceId = async (): Promise<string> => {
  if (cachedDataSourceId) return cachedDataSourceId

  const database = await withNotionRetry('databases.retrieve', () =>
    notion!.databases.retrieve({ database_id: notionDatabaseId! })
  )

  if (!isFullDatabase(database)) {
    throw new Error(
      'Notion returned a partial database object. Make sure NOTION_TOKEN has access to the blog database.'
    )
  }

  const firstDataSource = database.data_sources?.[0]

  if (!firstDataSource) {
    throw new Error(
      'No data sources found on the Notion blog database. The integration may not have access to the database.'
    )
  }

  cachedDataSourceId = firstDataSource.id
  return cachedDataSourceId
}

type DatabaseRow = QueryDataSourceResponse['results'][number]
type FullPageRow = Extract<DatabaseRow, PageObjectResponse>

const isFullPage = (row: DatabaseRow): row is FullPageRow =>
  row.object === 'page' && 'properties' in row

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  publishedAt: string | null
  authors: string[]
  tags: string[]
  coverImageUrl: string | null
  coverEnabled: boolean
  lastEditedTime: string
}

const getTitle = (page: FullPageRow): string => {
  const property = page.properties.Name
  if (!property || property.type !== 'title') return ''
  return property.title
    .map((item) => item.plain_text)
    .join('')
    .trim()
}

const getDescription = (page: FullPageRow): string => {
  const property = page.properties.Description
  if (!property || property.type !== 'rich_text') return ''
  return property.rich_text
    .map((item) => item.plain_text)
    .join('')
    .trim()
}

const getDate = (page: FullPageRow): string | null => {
  const property = page.properties.Date
  if (!property || property.type !== 'date' || !property.date?.start) return null
  return property.date.start
}

const getTags = (page: FullPageRow): string[] => {
  const property = page.properties.tags
  if (!property || property.type !== 'multi_select') return []
  return property.multi_select.map((tag) => tag.name).filter(Boolean)
}

const getAuthors = (page: FullPageRow): string[] => {
  const property = page.properties.Authors
  if (!property || property.type !== 'people') return []
  return property.people
    .map((author) => ('name' in author ? author.name : null))
    .filter((name): name is string => Boolean(name))
}

const getCoverEnabled = (page: FullPageRow): boolean => {
  const property = page.properties['Cover photo']
  if (!property || property.type !== 'checkbox') return false
  return Boolean(property.checkbox)
}

const getCoverImageUrl = (page: FullPageRow): string | null => {
  if (!page.cover) return null
  if (page.cover.type === 'external') return page.cover.external.url
  if (page.cover.type === 'file') return page.cover.file.url
  return null
}

const toUniqueSlugs = (titles: string[]) => {
  const counts = new Map<string, number>()

  return titles.map((title) => {
    const baseSlug = slugify(title)
    if (!baseSlug) return null

    const currentCount = counts.get(baseSlug) ?? 0
    const nextCount = currentCount + 1
    counts.set(baseSlug, nextCount)
    return nextCount === 1 ? baseSlug : `${baseSlug}-${nextCount}`
  })
}

const loadBlogPostsFromNotion = async (): Promise<BlogPost[]> => {
  const dataSourceId = await getBlogDataSourceId()

  const pages: FullPageRow[] = []
  let cursor: string | undefined

  do {
    const response: QueryDataSourceResponse = await withNotionRetry('dataSources.query', () =>
      notion!.dataSources.query({
        data_source_id: dataSourceId,
        page_size: 100,
        start_cursor: cursor,
        filter: {
          property: 'hidden',
          checkbox: { equals: false }
        },
        sorts: [
          { property: 'Date', direction: 'descending' },
          { timestamp: 'last_edited_time', direction: 'descending' }
        ]
      })
    )

    for (const row of response.results) {
      if (isFullPage(row)) pages.push(row)
    }

    cursor = response.has_more ? response.next_cursor ?? undefined : undefined
  } while (cursor)

  const validPages = pages.filter((page) => getTitle(page).length > 0)
  const titles = validPages.map((page) => getTitle(page))
  const slugs = toUniqueSlugs(titles)

  const posts: BlogPost[] = []
  for (let index = 0; index < validPages.length; index++) {
    const slug = slugs[index]
    if (!slug) continue
    const page = validPages[index]
    posts.push({
      id: page.id,
      slug,
      title: titles[index],
      excerpt: getDescription(page),
      publishedAt: getDate(page),
      authors: getAuthors(page),
      tags: getTags(page),
      coverImageUrl: getCoverImageUrl(page),
      coverEnabled: getCoverEnabled(page),
      lastEditedTime: page.last_edited_time
    })
  }

  return posts
}

/**
 * Cross-instance cache. Replaces the previous module-scoped promise, which
 * was effectively never invalidated on warm Vercel lambdas — that caused
 * stale Notion S3 URLs to keep being served well past their 1-hour expiry,
 * which made /_next/image return 502 for some cover images.
 */
const cachedLoadBlogPostsFromNotion = unstable_cache(
  () => loadBlogPostsFromNotion(),
  [NOTION_BLOG_POSTS_TAG],
  {
    tags: [NOTION_BLOG_POSTS_TAG],
    revalidate: NOTION_BLOG_POSTS_REVALIDATE_SECONDS
  }
)

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  if (!hasNotionConfig()) return []

  if (process.env.NODE_ENV !== 'production') {
    return loadBlogPostsFromNotion()
  }

  return cachedLoadBlogPostsFromNotion()
}

/** Notion page id with the dashes stripped, matching the bare ids that appear as hrefs. */
const compactNotionId = (id: string) => id.replace(/-/g, '').toLowerCase()

/**
 * Maps compact Notion page ids to blog slugs.
 *
 * Links authored inside Notion serialise to a bare `/<32-hex-page-id>` href, which
 * has no matching route on this site and 404s. Where the id belongs to a post in the
 * blog database we can rewrite it to the real slug; see `resolveNotionHref`.
 */
export const getNotionIdToSlugMap = async (): Promise<Record<string, string>> => {
  const posts = await getBlogPosts()
  const map: Record<string, string> = {}
  for (const post of posts) {
    map[compactNotionId(post.id)] = post.slug
  }
  return map
}

const loadBlogPostBySlug = async (
  slug: string
): Promise<{ post: BlogPost; markdown: string } | null> => {
  if (!hasNotionConfig() || !n2m) return null

  const posts = await getBlogPosts()
  const post = posts.find((entry) => entry.slug === slug)

  if (!post) return null

  try {
    const blocks = await withNotionRetry(`pageToMarkdown:${slug}`, () =>
      n2m.pageToMarkdown(post.id)
    )
    const markdown = n2m.toMarkdownString(blocks).parent ?? ''
    return { post, markdown }
  } catch (error) {
    console.error(`[notion-blog] Failed to fetch markdown for slug "${slug}":`, error)
    return null
  }
}

/**
 * Every route calls this twice: once from `generateMetadata` and once from the page
 * itself. `pageToMarkdown` walks the page block by block, so each uncached call is
 * many Notion requests, and at 161 posts that doubling was enough to get the build
 * rate limited. A prerender then sat in `withNotionRetry`'s backoff until it blew
 * past Next's static generation timeout and failed the deploy.
 *
 * Caching per slug collapses the pair back to one fetch. React's `cache()` would be
 * the idiomatic way to dedupe between generateMetadata and the page, but this repo is
 * on React 18.2, which does not export it.
 *
 * The revalidate window matches the posts list deliberately: markdown embeds the same
 * ~1h presigned S3 image URLs, so it must not be held longer than that cache is.
 */
const cachedLoadBlogPostBySlug = (slug: string) =>
  unstable_cache(() => loadBlogPostBySlug(slug), [NOTION_BLOG_POSTS_TAG, 'post', slug], {
    tags: [NOTION_BLOG_POSTS_TAG],
    revalidate: NOTION_BLOG_POSTS_REVALIDATE_SECONDS
  })()

export const getBlogPostBySlug = async (
  slug: string
): Promise<{ post: BlogPost; markdown: string } | null> => {
  if (!hasNotionConfig() || !n2m) return null

  if (process.env.NODE_ENV !== 'production') {
    return loadBlogPostBySlug(slug)
  }

  return cachedLoadBlogPostBySlug(slug)
}

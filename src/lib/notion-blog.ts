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

export const getBlogPostBySlug = async (
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

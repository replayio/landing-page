import 'server-only'

import { Client, isFullDatabase } from '@notionhq/client'
import type {
  PageObjectResponse,
  QueryDataSourceResponse
} from '@notionhq/client/build/src/api-endpoints'
import { NotionToMarkdown } from 'notion-to-md'

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

const hasNotionConfig = () => Boolean(notion && notionToken && notionDatabaseId)

const getBlogDataSourceId = async (): Promise<string> => {
  if (cachedDataSourceId) return cachedDataSourceId

  const database = await notion!.databases.retrieve({ database_id: notionDatabaseId! })

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

const slugify = (input: string) => {
  const normalized = input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['".,/#!$%^&*;:{}=_`~()?[\]<>\\|+]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return normalized
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

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  if (!hasNotionConfig()) return []

  const dataSourceId = await getBlogDataSourceId()

  const pages: FullPageRow[] = []
  let cursor: string | undefined

  do {
    const response: QueryDataSourceResponse = await notion!.dataSources.query({
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

export const getBlogPostBySlug = async (
  slug: string
): Promise<{ post: BlogPost; markdown: string } | null> => {
  if (!hasNotionConfig() || !n2m) return null

  const posts = await getBlogPosts()
  const post = posts.find((entry) => entry.slug === slug)

  if (!post) return null

  try {
    const blocks = await n2m.pageToMarkdown(post.id)
    const markdown = n2m.toMarkdownString(blocks).parent ?? ''
    return { post, markdown }
  } catch (error) {
    console.error(`[notion-blog] Failed to fetch markdown for slug "${slug}":`, error)
    return null
  }
}

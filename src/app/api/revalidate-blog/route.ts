import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/** Manual body */
type ManualBody = {
  secret?: string
  slug?: string
}

/** Notion webhook delivery (shape from Notion API 2026-03-11) */
type NotionWebhookBody = {
  verification_token?: string
  id?: string
  timestamp?: string
  workspace_id?: string
  type?: string
  entity?: { id?: string; type?: string }
  data?: {
    parent?: {
      id?: string
      type?: string
      data_source_id?: string
    }
  }
}

const NOTION_PAGE_EVENT_TYPES = new Set(['page.created', 'page.content_updated', 'page.deleted'])

const slugify = (input: string) => {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B]/g, '')
    .replace(/[\u201C\u201D\u201E\u201F]/g, '')
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/[\u2026]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const normalizeNotionId = (value: string | undefined | null) => {
  if (!value) return null
  const match = value.match(/[0-9a-fA-F]{32}|[0-9a-fA-F-]{36}/i)?.[0]
  if (!match) return null
  return match.replace(/-/g, '').toLowerCase()
}

const parseConfiguredBlogDatabaseId = () => {
  const raw = process.env.NOTION_BLOG_DATABASE_ID?.trim()
  if (!raw) return null
  try {
    const fromUrl = new URL(raw).pathname.match(/[0-9a-fA-F]{32}|[0-9a-fA-F-]{36}/i)?.[0]
    if (fromUrl) return normalizeNotionId(fromUrl)
  } catch {
    // not a URL
  }
  return normalizeNotionId(raw)
}

const parseSecret = (request: NextRequest, body: ManualBody | NotionWebhookBody | null) => {
  const searchSecret = request.nextUrl.searchParams.get('secret')
  const headerSecret = request.headers.get('x-revalidate-secret')
  return searchSecret ?? headerSecret ?? (body as ManualBody)?.secret ?? null
}

const parseSlug = (request: NextRequest, body: ManualBody | NotionWebhookBody | null) => {
  const rawSlug = request.nextUrl.searchParams.get('slug') ?? (body as ManualBody)?.slug
  if (!rawSlug) return null

  const cleaned = rawSlug.trim().replace(/^\/+|\/+$/g, '')
  if (!cleaned) return null

  const normalized = cleaned.startsWith('blog/') ? cleaned.slice(5) : cleaned
  const slug = slugify(normalized)
  return slug || null
}

const isNotionWebhookPayload = (body: unknown): body is NotionWebhookBody =>
  typeof body === 'object' &&
  body !== null &&
  'workspace_id' in body &&
  typeof (body as NotionWebhookBody).type === 'string' &&
  (body as NotionWebhookBody).type!.startsWith('page.')

const shouldRevalidateFromNotion = (
  body: NotionWebhookBody
): { revalidate: true } | { revalidate: false; reason: string } => {
  const configuredDb = parseConfiguredBlogDatabaseId()
  if (!configuredDb) {
    return { revalidate: false, reason: 'NOTION_BLOG_DATABASE_ID not configured' }
  }

  if (body.entity?.type !== 'page') {
    return { revalidate: false, reason: 'entity is not a page' }
  }

  const eventType = body.type
  if (!eventType || !NOTION_PAGE_EVENT_TYPES.has(eventType)) {
    return { revalidate: false, reason: `unsupported event type: ${eventType ?? 'missing'}` }
  }

  const parent = body.data?.parent
  if (parent?.type !== 'database') {
    return { revalidate: false, reason: `parent is not a database (got ${parent?.type ?? 'none'})` }
  }

  const parentId = normalizeNotionId(parent.id)
  if (!parentId || parentId !== configuredDb) {
    return {
      revalidate: false,
      reason: 'parent database id does not match NOTION_BLOG_DATABASE_ID'
    }
  }

  return { revalidate: true }
}

export async function POST(request: NextRequest) {
  let body: ManualBody | NotionWebhookBody | null = null

  try {
    body = (await request.json()) as ManualBody | NotionWebhookBody
  } catch {
    body = null
  }

  console.log('body', body)
  // Notion subscription verification (no auth; one-time probe)
  if (body && typeof (body as NotionWebhookBody).verification_token === 'string') {
    return NextResponse.json({ ok: true })
  }

  const expectedSecret = process.env.NOTION_REVALIDATE_SECRET

  if (!expectedSecret) {
    return NextResponse.json(
      { ok: false, message: 'NOTION_REVALIDATE_SECRET is not configured.' },
      { status: 500 }
    )
  }

  const incomingSecret = parseSecret(request, body)

  if (incomingSecret !== expectedSecret) {
    return NextResponse.json({ ok: false, message: 'Invalid secret.' }, { status: 401 })
  }

  // Notion webhook: only blog DB + page create/update/delete
  if (body && isNotionWebhookPayload(body)) {
    const decision = shouldRevalidateFromNotion(body)

    if (!decision.revalidate) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: decision.reason
      })
    }

    revalidatePath('/blog')
    revalidatePath('/blog/[slug]', 'page')

    return NextResponse.json({
      ok: true,
      source: 'notion',
      event: body.type,
      revalidated: ['/blog', '/blog/*']
    })
  }

  // Manual / Zapier / curl
  revalidatePath('/blog')
  const slug = parseSlug(request, body)

  if (slug) {
    revalidatePath(`/blog/${slug}`)
  }

  return NextResponse.json({
    ok: true,
    source: 'manual',
    message: slug ? `Revalidated /blog and /blog/${slug}.` : 'Revalidated /blog.',
    revalidated: slug ? ['/blog', `/blog/${slug}`] : ['/blog']
  })
}

import { createHmac, timingSafeEqual } from 'node:crypto'

import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { NOTION_BLOG_POSTS_TAG } from '~/lib/notion-blog'

/** Manual body */
type ManualBody = {
  secret?: string
  slug?: string
}

/** Notion webhook delivery (see https://developers.notion.com/reference/webhooks) */
type NotionWebhookParent = {
  type?: string
  id?: string
  database_id?: string
  data_source_id?: string
  page_id?: string
}

type NotionWebhookBody = {
  verification_token?: string
  id?: string
  timestamp?: string
  workspace_id?: string
  type?: string
  entity?: { id?: string; type?: string }
  data?: {
    parent?: NotionWebhookParent
  }
}

const NOTION_PAGE_EVENT_TYPES = new Set([
  'page.created',
  'page.content_updated',
  'page.deleted',
  'page.properties_updated'
])

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

/** Initial subscription probe: body contains verification_token only (no event `type`). */
const isNotionSubscriptionVerification = (
  body: unknown
): body is { verification_token: string } => {
  if (!body || typeof body !== 'object') return false
  const o = body as Record<string, unknown>
  return typeof o.verification_token === 'string' && typeof o.type !== 'string'
}

const verifyNotionWebhookSignature = (
  rawBody: string,
  signatureHeader: string | null,
  verificationToken: string
): boolean => {
  if (!signatureHeader || !signatureHeader.startsWith('sha256=')) return false
  const digest = createHmac('sha256', verificationToken).update(rawBody, 'utf8').digest('hex')
  const expected = `sha256=${digest}`
  const expectedBuf = Buffer.from(expected)
  const headerBuf = Buffer.from(signatureHeader)
  if (expectedBuf.length !== headerBuf.length) return false
  try {
    return timingSafeEqual(new Uint8Array(expectedBuf), new Uint8Array(headerBuf))
  } catch {
    return false
  }
}

const normalizedParentDatabaseIds = (parent: NotionWebhookParent | undefined): string[] => {
  if (!parent?.type) return []
  const t = parent.type
  const ids: string[] = []
  if (t === 'database' && parent.id) {
    const n = normalizeNotionId(parent.id)
    if (n) ids.push(n)
  }
  if (t === 'database_id' && parent.database_id) {
    const n = normalizeNotionId(parent.database_id)
    if (n) ids.push(n)
  }
  if (t === 'data_source_id' && parent.database_id) {
    const n = normalizeNotionId(parent.database_id)
    if (n) ids.push(n)
  }
  return ids
}

const isNotionWebhookPayload = (body: unknown): body is NotionWebhookBody =>
  typeof body === 'object' &&
  body !== null &&
  'workspace_id' in body &&
  typeof (body as NotionWebhookBody).type === 'string' &&
  (body as NotionWebhookBody).type!.startsWith('page.')

function shouldRevalidateFromNotion(
  body: NotionWebhookBody
): { revalidate: true } | { revalidate: false; reason: string } {
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
  const configuredDataSourceId = normalizeNotionId(
    process.env.NOTION_BLOG_DATA_SOURCE_ID?.trim() ?? ''
  )
  if (
    parent?.type === 'data_source_id' &&
    parent.data_source_id &&
    configuredDataSourceId &&
    normalizeNotionId(parent.data_source_id) === configuredDataSourceId
  ) {
    return { revalidate: true }
  }

  const candidates = normalizedParentDatabaseIds(parent)

  if (candidates.length === 0) {
    return {
      revalidate: false,
      reason: `cannot resolve blog database from webhook parent (type=${parent?.type ?? 'missing'})`
    }
  }

  if (!candidates.some((id) => id === configuredDb)) {
    return {
      revalidate: false,
      reason: 'parent database id does not match NOTION_BLOG_DATABASE_ID'
    }
  }

  return { revalidate: true }
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text()

  let body: ManualBody | NotionWebhookBody | null = null
  try {
    body = rawBody ? (JSON.parse(rawBody) as ManualBody | NotionWebhookBody) : null
  } catch {
    body = null
  }

  if (isNotionSubscriptionVerification(body)) {
    return NextResponse.json({ ok: true })
  }

  const notionSignature = request.headers.get('x-notion-signature')
  const webhookVerificationToken = process.env.NOTION_WEBHOOK_VERIFICATION_TOKEN?.trim()
  const revalidateSecret = process.env.NOTION_REVALIDATE_SECRET

  if (notionSignature) {
    if (!webhookVerificationToken) {
      return NextResponse.json(
        {
          ok: false,
          message:
            'Notion sent X-Notion-Signature but NOTION_WEBHOOK_VERIFICATION_TOKEN is not set. Add the webhook verification token from your Notion connection (same value you pasted when verifying the subscription).'
        },
        { status: 500 }
      )
    }
    if (!verifyNotionWebhookSignature(rawBody, notionSignature, webhookVerificationToken)) {
      return NextResponse.json(
        { ok: false, message: 'Invalid Notion webhook signature.' },
        { status: 401 }
      )
    }
  } else {
    if (!revalidateSecret) {
      return NextResponse.json(
        { ok: false, message: 'NOTION_REVALIDATE_SECRET is not configured.' },
        { status: 500 }
      )
    }

    const incomingSecret = parseSecret(request, body)
    if (incomingSecret !== revalidateSecret) {
      return NextResponse.json({ ok: false, message: 'Invalid secret.' }, { status: 401 })
    }
  }

  if (body && isNotionWebhookPayload(body)) {
    const decision = shouldRevalidateFromNotion(body)

    if (!decision.revalidate) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: decision.reason
      })
    }

    revalidateTag(NOTION_BLOG_POSTS_TAG)
    revalidatePath('/blog')
    revalidatePath('/blog/[slug]', 'page')

    return NextResponse.json({
      ok: true,
      source: 'notion',
      event: body.type,
      revalidated: ['/blog', '/blog/*', `tag:${NOTION_BLOG_POSTS_TAG}`]
    })
  }

  revalidateTag(NOTION_BLOG_POSTS_TAG)
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

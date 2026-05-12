import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

type RevalidateBody = {
  secret?: string
  slug?: string
}

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

const parseSecret = (request: NextRequest, body: RevalidateBody | null) => {
  const searchSecret = request.nextUrl.searchParams.get('secret')
  const headerSecret = request.headers.get('x-revalidate-secret')
  return searchSecret ?? headerSecret ?? body?.secret ?? null
}

const parseSlug = (request: NextRequest, body: RevalidateBody | null) => {
  const rawSlug = request.nextUrl.searchParams.get('slug') ?? body?.slug
  if (!rawSlug) return null

  const cleaned = rawSlug.trim().replace(/^\/+|\/+$/g, '')
  if (!cleaned) return null

  const normalized = cleaned.startsWith('blog/') ? cleaned.slice(5) : cleaned
  const slug = slugify(normalized)
  return slug || null
}

export async function POST(request: NextRequest) {
  let body: RevalidateBody | null = null

  try {
    body = await request.json()
  } catch {
    body = null
  }

  // Notion webhook verification handshake.
  console.log('body', body)

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

  revalidatePath('/blog')
  const slug = parseSlug(request, body)

  if (slug) {
    revalidatePath(`/blog/${slug}`)
  }

  return NextResponse.json({
    ok: true,
    message: slug ? `Revalidated /blog and /blog/${slug}.` : 'Revalidated /blog.',
    revalidated: slug ? ['/blog', `/blog/${slug}`] : ['/blog']
  })
}

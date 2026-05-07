import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const parseSecret = (request: NextRequest, body: { secret?: string } | null) => {
  const searchSecret = request.nextUrl.searchParams.get('secret')
  const headerSecret = request.headers.get('x-revalidate-secret')
  return searchSecret ?? headerSecret ?? body?.secret ?? null
}

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.NOTION_REVALIDATE_SECRET

  if (!expectedSecret) {
    return NextResponse.json(
      { ok: false, message: 'NOTION_REVALIDATE_SECRET is not configured.' },
      { status: 500 }
    )
  }

  let body: { secret?: string } | null = null

  try {
    body = await request.json()
  } catch {
    body = null
  }

  const incomingSecret = parseSecret(request, body)

  if (incomingSecret !== expectedSecret) {
    return NextResponse.json({ ok: false, message: 'Invalid secret.' }, { status: 401 })
  }

  revalidatePath('/blog')
  revalidatePath('/blog/[slug]', 'page')

  return NextResponse.json({ ok: true, message: 'Blog paths revalidated.' })
}

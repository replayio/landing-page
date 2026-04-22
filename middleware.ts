import { NextResponse, type NextRequest } from 'next/server'

/** Map marketing pathname (no trailing slash, except '/') to static markdown under /agent/ */
const MARKDOWN_BY_PATH: Record<string, string> = {
  '/': '/agent/index.md',
  '/how-it-works': '/agent/how-it-works.md',
  '/engineers': '/agent/engineers.md',
  '/vibe-coders': '/agent/vibe-coders.md',
  '/precog': '/agent/precog.md',
  '/partner': '/agent/partner.md',
  '/pricing': '/agent/pricing.md',
  '/about': '/agent/about.md',
  '/privacy-policy': '/agent/privacy-policy.md',
  '/terms-of-service': '/agent/terms-of-service.md',
  '/security-and-privacy': '/agent/security-and-privacy.md'
}

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname || '/'
}

function wantsMarkdown(request: NextRequest): boolean {
  const accept = request.headers.get('accept') ?? ''
  return accept.includes('text/markdown')
}

function markdownRewriteTarget(pathname: string): string | null {
  const key = normalizePathname(pathname)
  return MARKDOWN_BY_PATH[key] ?? null
}

function shouldSkipAgentHeaders(pathname: string): boolean {
  if (pathname.startsWith('/_next')) return true
  if (pathname.startsWith('/api')) return true
  if (pathname.startsWith('/.well-known')) return true
  // Static files (path segment with a file extension)
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) return true
  return false
}

function appendDiscoveryLinkHeaders(response: NextResponse): void {
  response.headers.append(
    'Link',
    '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"'
  )
  response.headers.append('Link', '<https://docs.replay.io>; rel="service-doc"')
  response.headers.append(
    'Link',
    '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"'
  )
  response.headers.append(
    'Link',
    '</.well-known/agent-skills/index.json>; rel="related"; title="Agent Skills"'
  )
  response.headers.append('Link', '<https://www.replay.io/sitemap.xml>; rel="sitemap"')
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (wantsMarkdown(request)) {
    const target = markdownRewriteTarget(pathname)
    if (target) {
      const url = request.nextUrl.clone()
      url.pathname = target
      const res = NextResponse.rewrite(url)
      res.headers.set('Content-Type', 'text/markdown; charset=utf-8')
      appendDiscoveryLinkHeaders(res)
      return res
    }
  }

  if (shouldSkipAgentHeaders(pathname)) {
    return NextResponse.next()
  }

  const res = NextResponse.next()
  appendDiscoveryLinkHeaders(res)
  return res
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\..*).*)']
}

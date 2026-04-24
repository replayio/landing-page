import { NextResponse, type NextRequest } from 'next/server'
import markdownAgentTokens from './lib/markdown-agent-tokens.json'

const MARKDOWN_TOKEN_BY_PATH = markdownAgentTokens as Record<string, number>

// ad attribution — first-touch capture of paid-ad click IDs + utms as a
// .replay.io cookie, so the value survives the replay.io -> app.replay.io
// subdomain hop (localStorage is origin-scoped and wouldn't). the 90d
// max-age matches the CVR window the ad platforms report against.
// app.replay.io's dashboard reads this same cookie at /login time and
// threads it into auth0's authorizationParams -> backend ensureUserForAuth.
const AD_ATTR_KEYS = [
  'li_fat_id',
  'twclid',
  'rdt_cid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term'
] as const
const AD_COOKIE_NAME = 'replay-ad-attribution'
const AD_COOKIE_MAX_AGE = 60 * 60 * 24 * 90

function setAdAttributionCookieIfNeeded(request: NextRequest, response: NextResponse): void {
  if (request.cookies.has(AD_COOKIE_NAME)) return

  const captured: Record<string, string> = {}
  for (const k of AD_ATTR_KEYS) {
    const v = request.nextUrl.searchParams.get(k)
    if (v) captured[k] = v
  }
  if (Object.keys(captured).length === 0) return

  // Domain=.replay.io lets app.replay.io read it; skip on preview /
  // localhost so the cookie still writes as host-only for testing.
  const isReplayHost = request.nextUrl.hostname.endsWith('replay.io')
  response.cookies.set({
    name: AD_COOKIE_NAME,
    value: JSON.stringify(captured),
    path: '/',
    maxAge: AD_COOKIE_MAX_AGE,
    sameSite: 'lax',
    secure: request.nextUrl.protocol === 'https:',
    ...(isReplayHost ? { domain: '.replay.io' } : {})
  })
}

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
  // Registered relation types expected by agent-readiness checks (RFC 8288 / RFC 9727 §3):
  // api-catalog, service-desc, service-doc, describedby
  response.headers.append(
    'Link',
    '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"'
  )
  response.headers.append(
    'Link',
    '<https://docs.replay.io/basics/replay-mcp/tools>; rel="service-desc"; type="text/html"'
  )
  response.headers.append(
    'Link',
    '<https://docs.replay.io/basics/replay-mcp/quickstart>; rel="service-doc"; type="text/html"'
  )
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
      const pathKey = normalizePathname(pathname)
      const approxTokens =
        MARKDOWN_TOKEN_BY_PATH[pathKey] ??
        Math.max(1, Math.ceil((request.nextUrl.pathname.length + 200) / 4))
      res.headers.set('x-markdown-tokens', String(approxTokens))
      appendDiscoveryLinkHeaders(res)
      setAdAttributionCookieIfNeeded(request, res)
      return res
    }
  }

  if (shouldSkipAgentHeaders(pathname)) {
    const res = NextResponse.next()
    setAdAttributionCookieIfNeeded(request, res)
    return res
  }

  const res = NextResponse.next()
  appendDiscoveryLinkHeaders(res)
  setAdAttributionCookieIfNeeded(request, res)
  return res
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\..*).*)']
}

import { test, expect } from '@playwright/test'

/**
 * Regression tests for the issues found in the Ahrefs audit (crawl of 28 Jul 2026).
 *
 * These assert the *mechanical* invariants only: things that are objectively right
 * or wrong and that a future refactor could silently break. They deliberately do not
 * grade copy quality.
 *
 * Run against a local server:  pnpm playwright
 * Run against a deployment:    BASE_URL=https://<preview>.vercel.app pnpm playwright
 */

const BASE = (process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

/** Every public marketing route. */
const ROUTES = [
  '/',
  '/about',
  '/blog',
  '/blog/archive',
  '/branding',
  '/contact',
  '/debugging',
  '/how-it-works',
  '/precog',
  '/pricing',
  '/privacy-policy',
  '/replay-qa',
  '/roi-calculator',
  '/security-and-privacy',
  '/terms-of-service'
]

/**
 * Every route is length-checked. /how-it-works and /roi-calculator were rewritten
 * during the audit; the other four pages that were out of band (/builder,
 * /vibe-coders, /engineers and /partner) have since been retired and now redirect,
 * so they are covered by the redirect tests below instead.
 */
const LENGTH_CHECKED = ROUTES

const TITLE_MIN = 30
const TITLE_MAX = 60
const DESC_MIN = 110
const DESC_MAX = 160

/**
 * These assertions read the server-rendered HTML rather than driving a browser.
 *
 * That is deliberate, and it is what a crawler actually indexes. Asserting against
 * a live DOM made these tests flaky in two ways that only showed up in CI:
 *
 *  1. Third-party tracking scripts inject 1x1 pixels with no alt attribute (the
 *     X/Twitter uwt.js tag adds two, on t.co and analytics.twitter.com). Whether
 *     they had appeared yet depended entirely on network timing, and we cannot add
 *     alt attributes to a vendor's pixels anyway.
 *  2. With `waitUntil: 'domcontentloaded'`, streaming SSR had not always finished
 *     delivering the head, so Open Graph tags were intermittently absent. /replay-qa
 *     failed on a different og: tag on each retry, which is the giveaway.
 *
 * Reading the response body removes both races: it is exactly the markup the server
 * produced, with no vendor scripts having run.
 */

const decodeEntities = (value: string) =>
  value
    .replace(/&#x27;/gi, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')

/** Content of a <meta> tag, tolerating either attribute order. */
function metaContent(html: string, attr: 'name' | 'property', key: string): string | null {
  const tag = html.match(new RegExp(`<meta[^>]+${attr}="${key}"[^>]*>`, 'i'))?.[0]
  if (!tag) return null
  const content = tag.match(/content="([^"]*)"/i)?.[1]
  return content === undefined ? null : decodeEntities(content)
}

function titleOf(html: string): string {
  return decodeEntities(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? '')
}

function canonicalOf(html: string): string | null {
  const tag = html.match(/<link[^>]+rel="canonical"[^>]*>/i)?.[0]
  if (!tag) return null
  return tag.match(/href="([^"]*)"/i)?.[1] ?? null
}

/** <img> tags in the server-rendered markup that carry no alt attribute at all. */
function imgsWithoutAlt(html: string): string[] {
  return (html.match(/<img\b[^>]*>/gi) ?? []).filter((tag) => !/\salt\s*=/i.test(tag))
}

const samePath = (a: string, b: string) => a.replace(/\/$/, '') === b.replace(/\/$/, '')

test.describe('per-page SEO invariants', () => {
  for (const route of ROUTES) {
    test(`${route} is structurally sound`, async ({ request }) => {
      const res = await request.get(`${BASE}${route}`)
      expect(res.status(), `${route} should return 200`).toBe(200)
      const html = await res.text()

      // Exactly one h1. Blog posts used to emit extras from Notion markdown headings,
      // and /contact used to emit none at all.
      const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length
      expect(h1Count, `${route} should have exactly one h1`).toBe(1)

      expect(titleOf(html).trim(), `${route} needs a title`).not.toBe('')
      expect(
        metaContent(html, 'name', 'description')?.trim(),
        `${route} needs a meta description`
      ).toBeTruthy()

      // Open Graph: og:type is the tag that was missing site-wide.
      for (const prop of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) {
        expect(metaContent(html, 'property', prop), `${route} needs ${prop}`).toBeTruthy()
      }

      // og:url and canonical must be absolute and must point at this route, not
      // at the homepage (which the retired /builder page used to do).
      const ogUrl = metaContent(html, 'property', 'og:url')
      expect(ogUrl, `${route} og:url must be absolute`).toMatch(/^https?:\/\//)
      expect(samePath(new URL(ogUrl!).pathname, route), `${route} og:url is ${ogUrl}`).toBe(true)

      const canonical = canonicalOf(html)
      expect(canonical, `${route} needs a canonical`).toMatch(/^https?:\/\//)
      expect(
        samePath(new URL(canonical!).pathname, route),
        `${route} canonical is ${canonical}`
      ).toBe(true)

      // og:image must be absolute: there is no metadataBase configured, so a
      // root-relative path would not resolve for crawlers.
      expect(
        metaContent(html, 'property', 'og:image'),
        `${route} og:image must be absolute`
      ).toMatch(/^https?:\/\//)

      // Content images need alt text. Decorative images legitimately use alt="",
      // so assert the attribute is present rather than non-empty.
      const missing = imgsWithoutAlt(html)
      expect(missing, `${route} has images with no alt attribute: ${missing.join(' ')}`).toEqual([])
    })
  }

  for (const route of LENGTH_CHECKED) {
    test(`${route} title and description are within length bands`, async ({ request }) => {
      const html = await (await request.get(`${BASE}${route}`)).text()

      const title = titleOf(html)
      expect(
        title.length,
        `${route} title is ${title.length} chars: "${title}"`
      ).toBeGreaterThanOrEqual(TITLE_MIN)
      expect(title.length, `${route} title is ${title.length} chars`).toBeLessThanOrEqual(TITLE_MAX)

      const description = metaContent(html, 'name', 'description') ?? ''
      expect(
        description.length,
        `${route} description is ${description.length} chars`
      ).toBeGreaterThanOrEqual(DESC_MIN)
      expect(
        description.length,
        `${route} description is ${description.length} chars`
      ).toBeLessThanOrEqual(DESC_MAX)
    })
  }
})

test.describe('sitemap', () => {
  test('contains no redirecting or malformed URLs', async ({ request }) => {
    const res = await request.get(`${BASE}/sitemap.xml`)
    expect(res.status()).toBe(200)
    const xml = await res.text()

    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    expect(urls.length, 'sitemap should not be empty').toBeGreaterThan(0)

    // The original bug: siteURL.toString() kept a trailing slash, so every entry
    // was emitted as https://www.replay.io//about and 3XX-redirected.
    for (const url of urls) {
      expect(new URL(url).pathname, `${url} has a double slash`).not.toMatch(/\/\//)
    }

    // No duplicates.
    expect(new Set(urls).size, 'sitemap contains duplicate URLs').toBe(urls.length)

    // Every static route we advertise must be present.
    const paths = new Set(urls.map((u) => new URL(u).pathname))
    for (const route of ['/', '/pricing', '/how-it-works', '/debugging', '/blog']) {
      expect(paths.has(route), `sitemap is missing ${route}`).toBe(true)
    }
  })

  test('every listed URL resolves 200 without redirecting', async ({ request }) => {
    // Production advertises ~175 URLs and these are checked one at a time, which
    // overruns the 30s default when run against a deployment rather than localhost.
    test.setTimeout(5 * 60 * 1000)
    const res = await request.get(`${BASE}/sitemap.xml`)
    const xml = await res.text()
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

    // Check against the server under test, not the advertised origin, so this works
    // on previews and locally.
    for (const url of urls) {
      const path = new URL(url).pathname
      const r = await request.get(`${BASE}${path}`, { maxRedirects: 0 })
      expect(r.status(), `${path} should be 200, not a redirect`).toBe(200)
    }
  })
})

test.describe('redirects', () => {
  const CASES: Array<[string, string | RegExp]> = [
    ['/protocol', 'https://static.replay.io/protocol'],
    ['/protocol/tot/Pause', 'https://static.replay.io/protocol/tot/Pause'],
    ['/protocol/tot/Debugger', 'https://static.replay.io/protocol/tot/Debugger'],
    ['/shoutouts', /\/$/],
    ['/examples', 'https://docs.replay.io/'],
    // Retired pages (Aug 2026). These must keep redirecting.
    ['/engineers', /\/debugging$/],
    ['/vibe-coders', /\/$/],
    ['/partner', /\/contact$/],
    ['/builder', /\/$/]
  ]

  for (const [from, to] of CASES) {
    test(`${from} redirects correctly`, async ({ request }) => {
      const res = await request.get(`${BASE}${from}`, { maxRedirects: 0 })
      expect([301, 302, 307, 308]).toContain(res.status())
      const location = res.headers()['location']
      if (typeof to === 'string') expect(location).toBe(to)
      else expect(location).toMatch(to)
    })
  }

  test('an unknown path still 404s', async ({ request }) => {
    const res = await request.get(`${BASE}/definitely-not-a-real-page`, { maxRedirects: 0 })
    expect(res.status()).toBe(404)
  })
})

test.describe('blog', () => {
  test('no post links to a bare Notion page id', async ({ request }) => {
    test.setTimeout(5 * 60 * 1000)

    const xml = await (await request.get(`${BASE}/sitemap.xml`)).text()
    // The sitemap advertises absolute production URLs. Keep only the path, so this
    // scans the deployment under test rather than always hitting www.replay.io.
    const posts = [...xml.matchAll(/<loc>([^<]*\/blog\/[^<]+)<\/loc>/g)].map(
      (m) => new URL(m[1]).pathname
    )

    if (posts.length === 0) {
      // eslint-disable-next-line no-console
      console.log('note: no blog posts available (NOTION_TOKEN unset); skipping')
      return
    }

    // Links authored in Notion serialise as a bare page id and 404. The path must be
    // only the id: external links that merely contain a 32-hex segment (Loom shares,
    // GitHub gists, notion.so pages) are legitimate and must not be reported.
    //
    // The optional trailing group is the point of this test. The first version of the
    // fix anchored to the end of the string, so `/<id>#<block-id>` links survived and
    // stayed as 404s until Ahrefs found them.
    const BARE_ID_HREF = /href="\/[0-9a-f]{32}(?:[?#][^"]*)?"/gi

    const offenders: string[] = []
    for (const path of posts) {
      const html = await (await request.get(`${BASE}${path}`)).text()
      const hits = html.match(BARE_ID_HREF)
      if (hits) offenders.push(`${path} -> ${[...new Set(hits)].join(' ')}`)
    }

    expect(offenders, `posts still linking to a bare Notion id:\n${offenders.join('\n')}`).toEqual(
      []
    )
  })

  test('no post links to our own site over http, the apex domain or blog.replay.io', async ({
    request
  }) => {
    test.setTimeout(5 * 60 * 1000)

    const xml = await (await request.get(`${BASE}/sitemap.xml`)).text()
    // Paths only: see the note above about the sitemap carrying production URLs.
    const posts = [...xml.matchAll(/<loc>([^<]*\/blog\/[^<]+)<\/loc>/g)]
      .map((m) => new URL(m[1]).pathname)
      .filter((p) => p !== '/blog/archive')

    if (posts.length === 0) {
      // eslint-disable-next-line no-console
      console.log('note: no blog posts available (NOTION_TOKEN unset); skipping')
      return
    }

    // Each of these redirects, and the http ones count as an HTTPS page linking to
    // HTTP, which Ahrefs reports as an error rather than a warning. Sibling subdomains
    // (docs, app, static) are separate properties and must not be rewritten, so they
    // are deliberately absent from this pattern.
    const NON_CANONICAL = /href="(http:\/\/(?:www\.)?replay\.io[^"]*|https?:\/\/replay\.io[^"]*|https?:\/\/blog\.replay\.io[^"]*)"/gi

    const offenders: string[] = []
    for (const path of posts) {
      const html = await (await request.get(`${BASE}${path}`)).text()
      const hits = html.match(NON_CANONICAL)
      if (hits) offenders.push(`${path} -> ${[...new Set(hits)].join(' ')}`)
    }

    expect(
      offenders,
      `posts linking to a non-canonical Replay URL:\n${offenders.join('\n')}`
    ).toEqual([])
  })
})

test.describe('internal links', () => {
  test('no page links to a path that does not exist', async ({ request }) => {
    // Crawls every route and then every distinct internal link it finds; too slow
    // for the 30s default against a real deployment.
    test.setTimeout(5 * 60 * 1000)
    const seen = new Set<string>()

    for (const route of ROUTES) {
      const html = await (await request.get(`${BASE}${route}`)).text()
      for (const m of html.matchAll(/<a\b[^>]*\shref="(\/[^"]*)"/gi)) {
        const path = m[1].split('#')[0].split('?')[0]
        if (path && path.startsWith('/')) seen.add(path)
      }
    }

    // Blog posts only exist when NOTION_TOKEN is configured. Without it the blog is
    // empty, so links to individual posts would 404 for reasons unrelated to this
    // check. Detect that and exclude post links rather than reporting false failures.
    const sitemapXml = await (await request.get(`${BASE}/sitemap.xml`)).text()
    // Must exclude /blog/archive, which is a static route and present in the sitemap
    // whether or not any posts exist. Matching a bare '/blog/' made this read as
    // "posts available" with no Notion token, and the post links then 404'd.
    const blogAvailable = /\/blog\/(?!archive\b)[^<"\s]+/.test(sitemapXml)
    if (!blogAvailable) {
      // eslint-disable-next-line no-console
      console.log('note: no blog posts available (NOTION_TOKEN unset); skipping /blog/* links')
    }

    const broken: string[] = []
    for (const path of seen) {
      if (!blogAvailable && /^\/blog\/(?!archive$).+/.test(path)) continue
      const res = await request.get(`${BASE}${path}`, { maxRedirects: 0 })
      // 2xx is fine; 3xx is an intentional redirect. 4xx is not.
      if (res.status() >= 400) broken.push(`${path} -> ${res.status()}`)
    }

    // This is how the retired /vibe-coders page's link to /for-engineers survived:
    // that page had no incoming links, so the crawler never reached it.
    expect(broken, `broken internal links found: ${broken.join(', ')}`).toEqual([])
  })
})

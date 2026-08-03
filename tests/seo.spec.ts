import { test, expect, type Page } from '@playwright/test'

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
  '/branding',
  '/builder',
  '/contact',
  '/debugging',
  '/engineers',
  '/how-it-works',
  '/partner',
  '/precog',
  '/pricing',
  '/privacy-policy',
  '/replay-qa',
  '/roi-calculator',
  '/security-and-privacy',
  '/terms-of-service',
  '/vibe-coders'
]

/**
 * Routes whose title/description lengths were corrected in the audit.
 *
 * The rest are excluded on purpose: they were never flagged, because they had almost
 * no incoming links and so were never crawled. Now that they are in the sitemap they
 * will be crawled, and several will be flagged for length. Fixing those means
 * rewriting marketing copy, which is a content decision rather than a mechanical one.
 * Move a route into this list once its copy has been signed off.
 */
const LENGTH_CHECKED = [
  '/',
  '/about',
  '/blog',
  '/branding',
  '/contact',
  '/pricing',
  '/privacy-policy',
  '/security-and-privacy',
  '/terms-of-service'
]

const TITLE_MIN = 30
const TITLE_MAX = 60
const DESC_MIN = 110
const DESC_MAX = 160

async function meta(page: Page, selector: string) {
  const el = page.locator(selector)
  if ((await el.count()) === 0) return null
  return el.first().getAttribute('content')
}

test.describe('per-page SEO invariants', () => {
  for (const route of ROUTES) {
    test(`${route} is structurally sound`, async ({ page }) => {
      const response = await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' })
      expect(response?.status(), `${route} should return 200`).toBe(200)

      // Exactly one h1. Blog posts used to emit extras from Notion markdown headings,
      // and /contact used to emit none at all.
      const h1s = page.locator('h1')
      expect(await h1s.count(), `${route} should have exactly one h1`).toBe(1)

      // Title and description must exist and be non-empty everywhere.
      const title = await page.title()
      expect(title.trim(), `${route} needs a title`).not.toBe('')

      const description = await meta(page, 'meta[name="description"]')
      expect(description?.trim(), `${route} needs a meta description`).toBeTruthy()

      // Open Graph: og:type is the tag that was missing site-wide.
      for (const prop of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) {
        const value = await meta(page, `meta[property="${prop}"]`)
        expect(value, `${route} needs ${prop}`).toBeTruthy()
      }

      // og:url and canonical must be absolute and must point at this route, not
      // at the homepage (which is what /builder used to do).
      const ogUrl = await meta(page, 'meta[property="og:url"]')
      expect(ogUrl, `${route} og:url must be absolute`).toMatch(/^https?:\/\//)
      expect(new URL(ogUrl!).pathname.replace(/\/$/, '')).toBe(route.replace(/\/$/, ''))

      const canonical = await page.locator('link[rel="canonical"]').first().getAttribute('href')
      expect(canonical, `${route} needs a canonical`).toMatch(/^https?:\/\//)
      expect(new URL(canonical!).pathname.replace(/\/$/, '')).toBe(route.replace(/\/$/, ''))

      // og:image must be absolute: there is no metadataBase configured, so a
      // root-relative path would not resolve for crawlers.
      const ogImage = await meta(page, 'meta[property="og:image"]')
      expect(ogImage, `${route} og:image must be absolute`).toMatch(/^https?:\/\//)

      // Content images need alt text. Decorative images legitimately use alt="",
      // so assert the attribute is present rather than non-empty.
      const imgsMissingAlt = await page.locator('img:not([alt])').count()
      expect(imgsMissingAlt, `${route} has images with no alt attribute`).toBe(0)
    })
  }

  for (const route of LENGTH_CHECKED) {
    test(`${route} title and description are within length bands`, async ({ page }) => {
      await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' })

      const title = await page.title()
      expect(
        title.length,
        `${route} title is ${title.length} chars: "${title}"`
      ).toBeGreaterThanOrEqual(TITLE_MIN)
      expect(title.length, `${route} title is ${title.length} chars`).toBeLessThanOrEqual(TITLE_MAX)

      const description = (await meta(page, 'meta[name="description"]')) ?? ''
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
    for (const route of ['/', '/pricing', '/how-it-works', '/engineers', '/blog']) {
      expect(paths.has(route), `sitemap is missing ${route}`).toBe(true)
    }
  })

  test('every listed URL resolves 200 without redirecting', async ({ request }) => {
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
    ['/examples', 'https://docs.replay.io/']
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

test.describe('internal links', () => {
  test('no page links to a path that does not exist', async ({ page, request }) => {
    const seen = new Set<string>()

    for (const route of ROUTES) {
      await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' })
      const hrefs = await page.locator('a[href^="/"]').evaluateAll((els) =>
        els.map((e) => e.getAttribute('href') ?? '')
      )
      for (const href of hrefs) {
        const path = href.split('#')[0].split('?')[0]
        if (path && path.startsWith('/')) seen.add(path)
      }
    }

    // Blog posts only exist when NOTION_TOKEN is configured. Without it the blog is
    // empty, so links to individual posts would 404 for reasons unrelated to this
    // check. Detect that and exclude post links rather than reporting false failures.
    const sitemapXml = await (await request.get(`${BASE}/sitemap.xml`)).text()
    const blogAvailable = sitemapXml.includes('/blog/')
    if (!blogAvailable) {
      // eslint-disable-next-line no-console
      console.log('note: no blog posts available (NOTION_TOKEN unset); skipping /blog/* links')
    }

    const broken: string[] = []
    for (const path of seen) {
      if (!blogAvailable && /^\/blog\/.+/.test(path)) continue
      const res = await request.get(`${BASE}${path}`, { maxRedirects: 0 })
      // 2xx is fine; 3xx is an intentional redirect. 4xx is not.
      if (res.status() >= 400) broken.push(`${path} -> ${res.status()}`)
    }

    // This is how /vibe-coders -> /for-engineers survived: that page had no
    // incoming links, so the crawler never reached it.
    expect(broken, `broken internal links found: ${broken.join(', ')}`).toEqual([])
  })
})

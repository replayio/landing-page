import { MetadataRoute } from 'next'
import { siteOrigin } from '~/lib/constants'
import { getBlogPosts } from '~/lib/notion-blog'
import { COMPARE_PAGES_UPDATED, competitors } from '~/components/compare/content'

type ChangeFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly'

/**
 * Marketing routes to advertise, in rough order of importance.
 *
 * Deliberately excluded: /branding (brand asset downloads, no search intent) and
 * /replay-qa, which is near-identical to the homepage and would compete with it.
 *
 * Note this builds on the origin, not `siteURL.toString()`. The latter ends in a
 * trailing slash, so entries used to be emitted as `https://www.replay.io//about`.
 * That double slash redirects, which made all 169 sitemap URLs 3XX redirects
 * pointing at their own canonical form.
 *
 * `lastModified` is the date of the last change a reader would notice (copy, title, layout),
 * as YYYY-MM-DD. Leave out performance, tracking and refactor commits, and update it by hand in
 * the same PR as the content change. Search engines stop trusting lastmod that is wrong, so
 * routes without a confident date carry none rather than a build timestamp.
 */
type Route = {
  path: string
  priority: number
  changeFrequency: ChangeFrequency
  lastModified?: string
}

const ROUTES: Route[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly', lastModified: '2026-10-26' },
  { path: '/pricing', priority: 0.9, changeFrequency: 'weekly', lastModified: '2026-09-02' },
  { path: '/how-it-works', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-10-22' },
  { path: '/security', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-10-14' },
  {
    path: '/for-software-factories',
    priority: 0.9,
    changeFrequency: 'monthly',
    lastModified: '2026-10-22'
  },
  { path: '/debugging', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-08-03' },
  {
    path: '/web-application-testing',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-10-22'
  },
  {
    path: '/continuous-testing',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-10-22'
  },
  {
    path: '/automated-qa-testing',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-10-22'
  },
  { path: '/precog', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-08-03' },
  { path: '/roi-calculator', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/blog/archive', priority: 0.5, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/security-and-privacy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-of-service', priority: 0.3, changeFrequency: 'yearly' }
]

/**
 * Comparison pages come from the compare content file, so a new competitor is listed
 * automatically. Each page changes when it is re-verified or the shared template changes;
 * the hub changes whenever any of them does.
 */
function compareRoutes(): Route[] {
  const later = (a: string, b: string) => (a > b ? a : b)
  const pages = competitors.map((c) => ({
    path: c.path,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: later(c.lastVerified, COMPARE_PAGES_UPDATED)
  }))
  const hubModified = pages.map((p) => p.lastModified).reduce(later, COMPARE_PAGES_UPDATED)

  return [
    { path: '/compare', priority: 0.8, changeFrequency: 'monthly', lastModified: hubModified },
    ...pages
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts().catch(() => [])

  const pages: MetadataRoute.Sitemap = [...ROUTES, ...compareRoutes()].map(
    ({ path, priority, changeFrequency, lastModified }) => ({
      url: `${siteOrigin}${path}`,
      lastModified,
      changeFrequency,
      priority
    })
  )

  for (const post of blogPosts) {
    pages.push({
      url: `${siteOrigin}/blog/${post.slug}`,
      // Real edit time from Notion. Never use a build timestamp for lastModified:
      // it would claim every page changed on every deploy.
      lastModified: post.lastEditedTime,
      changeFrequency: 'monthly',
      priority: 0.5
    })
  }

  return pages
}

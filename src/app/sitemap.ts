import { MetadataRoute } from 'next'
import { siteOrigin } from '~/lib/constants'
import { getBlogPosts } from '~/lib/notion-blog'

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
 */
const ROUTES: Array<{ path: string; priority: number; changeFrequency: ChangeFrequency }> = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/how-it-works', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/debugging', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/precog', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/roi-calculator', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/security-and-privacy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-of-service', priority: 0.3, changeFrequency: 'yearly' }
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts().catch(() => [])

  const pages: MetadataRoute.Sitemap = ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${siteOrigin}${path}`,
    changeFrequency,
    priority
  }))

  for (const post of blogPosts) {
    pages.push({
      url: `${siteOrigin}/blog/${post.slug}`,
      // Real edit time from Notion. Static routes deliberately carry no
      // lastModified rather than a build timestamp, which would claim every
      // page changed on every deploy.
      lastModified: post.lastEditedTime,
      changeFrequency: 'monthly',
      priority: 0.5
    })
  }

  return pages
}

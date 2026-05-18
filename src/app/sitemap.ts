import { MetadataRoute } from 'next'
import { siteURL } from '~/lib/constants'
import { getBlogPosts } from '~/lib/notion-blog'

const siteURLString = siteURL.toString()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts().catch(() => [])

  const pages: MetadataRoute.Sitemap = [
    {
      url: siteURLString,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${siteURLString}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: `${siteURLString}/branding`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: `${siteURLString}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: `${siteURLString}/debugging`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${siteURLString}/roi-calculator`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: `${siteURLString}/privacy-policy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: `${siteURLString}/security-and-privacy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: `${siteURLString}/terms-of-service`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8
    }
  ]

  for (const post of blogPosts) {
    pages.push({
      url: `${siteURLString}/blog/${post.slug}`,
      lastModified: post.lastEditedTime || new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7
    })
  }

  return pages
}

import { MetadataRoute } from 'next'
import { siteURL } from '~/lib/constants'

const siteURLString = siteURL.toString()

export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
}

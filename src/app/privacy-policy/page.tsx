import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { Policy } from '~/components/sections/legal/policy'
import { defaultMeta, siteOrigin } from '~/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy: How Replay Handles Your Data',
  description:
    'Read the Replay privacy policy to learn how we collect, use and protect your personal data when you use our website, products and services.',
  alternates: {
    canonical: `${siteOrigin}/privacy-policy`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/privacy-policy`,
    title: 'Privacy Policy: How Replay Handles Your Data',
    description:
      'Read the Replay privacy policy to learn how we collect, use and protect your personal data when you use our website, products and services.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'Privacy Policy: How Replay Handles Your Data',
    description:
      'Read the Replay privacy policy to learn how we collect, use and protect your personal data when you use our website, products and services.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

const Privacy = () => {
  return (
    <>
      <Header />
      <main>
        <Policy />
      </main>
      <Footer />
    </>
  )
}

export default Privacy

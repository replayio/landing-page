import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { PricingHero } from './components/PricingHero'
import { PricingTiers } from './components/PricingTiers'
import { PricingTestimonials } from './components/PricingTestimonials'
import { PricingFAQs } from './components/PricingFAQs'

const title = 'Replay QA Pricing: Start Free with 25 Credits'
const description =
  'Simple, usage-based pricing for Replay QA. Start free with 25 credits a month, no credit card required, and upgrade only when you need more.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteOrigin}/pricing`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/pricing`,
    title,
    description,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title,
    description,
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <PageContentAnimate>
        <PricingHero />
        <PricingTiers />
        <PricingTestimonials />
        <PricingFAQs />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { PricingHero } from './components/PricingHero'
import { PricingTiers } from './components/PricingTiers'
import { PricingTestimonials } from './components/PricingTestimonials'
import { PricingFAQs } from './components/PricingFAQs'

const title = 'Pricing — Replay'
const description =
  'Simple, usage-based pricing. Start free with 20 AI analyses per month. Upgrade as you grow.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteOrigin}/pricing`
  },
  openGraph: {
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
      <Suspense fallback={null}>
        <Header className="!top-[0px] sm:!top-[0px]" />
      </Suspense>
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

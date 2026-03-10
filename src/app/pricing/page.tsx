import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { Pump } from '.basehub/react-pump'
import { draftMode } from 'next/headers'
import { landingPageFragment } from '~/lib/basehub-queries'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { PricingHero } from './components/PricingHero'
import { PricingTiers } from './components/PricingTiers'
import { PricingFAQs } from './components/PricingFAQs'

export const metadata: Metadata = {
  title: 'Pricing — Replay',
  description:
    'Simple, volume-based pricing. Replay records your web app, delivers an AI root cause analysis, and proposes a fix — right where you work.',
  alternates: {
    canonical: `${siteOrigin}/pricing`,
  },
  openGraph: {
    url: `${siteOrigin}/pricing`,
    title: 'Pricing — Replay',
    description:
      'Simple, volume-based pricing. Replay records your web app, delivers an AI root cause analysis, and proposes a fix — right where you work.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'Pricing — Replay',
    description:
      'Simple, volume-based pricing. Replay records your web app, delivers an AI root cause analysis, and proposes a fix — right where you work.',
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }],
  },
}

export const viewport: Viewport = {
  themeColor: '#FFF',
}

export default function PricingPage() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }}
      queries={[{ landingPage: landingPageFragment }]}
    >
      {async ([{ landingPage }]) => {
        'use server'
        return (
          <>
            <Suspense fallback={null}>
              <Header className="!top-[0px] sm:!top-[0px]" />
            </Suspense>
            <PageContentAnimate className="pt-[calc(var(--header-height))] sm:pt-[calc(var(--header-height))]">
              <PricingHero />
              <PricingTiers />
              <PricingFAQs />
            </PageContentAnimate>
            <Footer />
          </>
        )
      }}
    </Pump>
  )
}

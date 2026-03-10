import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { Testimonials } from '~/components/Testimonials'
import { Pump } from '.basehub/react-pump'
import { draftMode } from 'next/headers'
import { landingPageFragment } from '~/lib/basehub-queries'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { HowItWorksHero } from './components/HowItWorksHero'
import { CoreInsight } from './components/CoreInsight'
// import { BugToFix } from './components/BugToFix'
import { WorksWhereYouWork } from '~/app/components/WorksWhereYouWork'
import { HomepageCTA } from '~/app/components/HomepageCTA'

export const metadata: Metadata = {
  title: 'How It Works — Replay',
  description:
    'See how Replay gives your coding agent runtime context to find and fix bugs automatically. From recording to root cause to shipped fix.',
  alternates: {
    canonical: `${siteOrigin}/how-it-works`,
  },
  openGraph: {
    url: `${siteOrigin}/how-it-works`,
    title: 'How Replay Works — From Bug to Fix in Under a Minute',
    description:
      'Replay captures the full browser runtime and turns it into a root cause and fix for your coding agent. No manual debugging.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'How Replay Works — From Bug to Fix in Under a Minute',
    description:
      'Replay captures the full browser runtime and turns it into a root cause and fix for your coding agent.',
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }],
  },
}

export const viewport: Viewport = {
  themeColor: '#FFF',
}

export default function HowItWorksPage() {
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
              <HowItWorksHero />
              <CoreInsight />
              {/* <BugToFix /> */}
              <WorksWhereYouWork />
              <Testimonials {...landingPage} />
              <HomepageCTA backgroundColor="gray" />
            </PageContentAnimate>
            <Footer />
          </>
        )
      }}
    </Pump>
  )
}

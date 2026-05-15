import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { DevTools } from '~/components/sections/DevTools'
import { Pump } from '.basehub/react-pump'
import { draftMode } from 'next/headers'
import { landingPageFragment } from '~/lib/basehub-queries'
import { Hero } from './components/hero'
import { AgentProblem } from './components/AgentProblem'
import { AgentSolution } from './components/AgentSolution'
import { CiFullLoop } from './components/CiFullLoop'
import { RuntimeAnalysis } from './components/RuntimeAnalysis'
import { HomepageTestimonials } from './components/HomepageTestimonials'
import { FeaturedProofPoint } from './components/FeaturedProofPoint'
import { IndividualDebugging } from './components/IndividualDebugging'
import { TimeTravelogues } from './components/TimeTravelogues'
import { ReplayComparison } from './components/ReplayComparison'
import { CiPipelineIntegrations } from './components/CiPipelineIntegrations'
import { HomepageFAQs } from './components/HomepageFAQs'
import { HomepageCTA } from './components/HomepageCTA'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'

export const metadata: Metadata = {
  title: {
    template: '%s - Replay',
    default: 'Replay — E2E test failures analyzed automatically'
  },
  description:
    'Replay CI Agent records every test run, analyzes failures with time-travel debugging, and posts root cause and fix to your PR.',
  alternates: {
    canonical: `${siteOrigin}/`
  },
  openGraph: {
    url: `${siteOrigin}/`,
    title: 'Replay — E2E test failures analyzed automatically',
    description:
      'Replay CI Agent records every test run, analyzes failures with time-travel debugging, and posts root cause and fix to your PR.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    site: defaultMeta.twitter.site,
    title: 'Replay — E2E test failures analyzed automatically',
    description:
      'Replay CI Agent records every test run, analyzes failures with time-travel debugging, and posts root cause and fix to your PR.',
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  other: {
    name: 'ahrefs-site-verification',
    content: 'd6acf1324602b320f37276d0f77e3e8ced24a91e2298c91fdcb79f2143e73bc6'
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function HomePage() {
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
              <Hero {...landingPage} />
              <AgentProblem />
              <AgentSolution />
              <CiFullLoop />
              <RuntimeAnalysis />
              <DevTools {...landingPage} />
              <HomepageTestimonials />
              <FeaturedProofPoint />
              <IndividualDebugging />
              <TimeTravelogues />
              <ReplayComparison />
              <CiPipelineIntegrations />
              <HomepageFAQs />
              <HomepageCTA />
            </PageContentAnimate>
            <Footer />
          </>
        )
      }}
    </Pump>
  )
}

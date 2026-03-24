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
import { ForEngineersHero } from './components/ForEngineersHero'
import { EngineerProblem } from './components/EngineerProblem'
import { EngineerBenefits } from './components/EngineerBenefits'
import { EngineerUseCases } from './components/EngineerUseCases'
import { HomepageCTA } from '~/app/components/HomepageCTA'

export const metadata: Metadata = {
  title: 'Replay for Engineers — Runtime Context for Your Coding Agent',
  description:
    'Replay MCP gives your coding agent the runtime context it needs to fix bugs — not loop on them. Root cause analysis, implementation-ready fixes, works in your existing workflow.',
  alternates: {
    canonical: `${siteOrigin}/for-engineers`
  },
  openGraph: {
    url: `${siteOrigin}/for-engineers`,
    title: 'Replay for Engineers — Runtime Context for Your Coding Agent',
    description:
      'Replay MCP gives your coding agent the runtime context it needs to fix bugs — not loop on them.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'Replay for Engineers — Runtime Context for Your Coding Agent',
    description:
      'Replay MCP gives your coding agent the runtime context it needs to fix bugs — not loop on them.',
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function ForEngineersPage() {
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
              <ForEngineersHero />
              <EngineerProblem />
              <EngineerBenefits />
              <EngineerUseCases />
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

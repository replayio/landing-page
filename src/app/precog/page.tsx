import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { HomepageCTA } from '~/app/components/HomepageCTA'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { Metadata, Viewport } from 'next/types'
import { PrecogHero } from './components/PrecogHero'
import { PrecogProblem } from './components/PrecogProblem'
import { PrecogHowItWorks } from './components/PrecogHowItWorks'
import { PrecogTerminal } from './components/PrecogTerminal'
import { PrecogDashboard } from './components/PrecogDashboard'
import { PrecogAmbient } from './components/PrecogAmbient'
import { PrecogLimitations } from './components/PrecogLimitations'
import { PrecogFinalCTA } from './components/PrecogFinalCTA'

export const metadata: Metadata = {
  title: "Replay Precog — Debugging for Code You Haven't Written Yet",
  description:
    'Replay Precog delivers deterministic root-cause analysis for bugs before they happen. April Fools announcement and real Replay MCP quickstart.',
  alternates: {
    canonical: `${siteOrigin}/precog`
  },
  openGraph: {
    url: `${siteOrigin}/precog`,
    title: 'Replay Precog',
    description:
      'Deterministic debugging for bugs in code you have not written yet — and the real tools Replay builds today.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'Replay Precog',
    description: 'Replay Precog — April 1 announcement and Replay MCP.',
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function PrecogPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Header className="!top-[0px] sm:!top-[0px]" />
      </Suspense>
      <PageContentAnimate className="pt-[calc(var(--header-height))] sm:pt-[calc(var(--header-height))]">
        <PrecogHero />
        <PrecogProblem />
        <PrecogHowItWorks />
        <PrecogTerminal />
        <PrecogDashboard />
        <PrecogAmbient />
        <PrecogLimitations />
        <PrecogFinalCTA />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

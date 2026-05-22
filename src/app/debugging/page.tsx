import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { DevTools } from '~/components/sections/DevTools'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { DebuggingHero } from './components/DebuggingHero'
import { DebuggingProblem } from './components/DebuggingProblem'
import { DebuggingHowItWorks } from './components/DebuggingHowItWorks'
import { DebuggingRuntimeContext } from './components/DebuggingRuntimeContext'
import { DebuggingTimeTravelogues } from './components/DebuggingTimeTravelogues'
import { DebuggingCompatibility } from './components/DebuggingCompatibility'
import { DebuggingGettingStarted } from './components/DebuggingGettingStarted'
import { DebuggingFAQs } from './components/DebuggingFAQs'
import { DebuggingCiPromo } from './components/DebuggingCiPromo'
import { DebuggingCTA } from './components/DebuggingCTA'
import { AgentSolution } from './components/AgentSolution'

export const metadata: Metadata = {
  title: "Individual Debugging — Fix bugs your agent can't figure out",
  description:
    'Replay is a time-travel debugger. Record your app, capture every function call and state change, and let your coding agent analyze it with Replay MCP.',
  alternates: {
    canonical: `${siteOrigin}/debugging`
  },
  openGraph: {
    url: `${siteOrigin}/debugging`,
    title: "Individual Debugging — Fix bugs your agent can't figure out",
    description:
      'Replay is a time-travel debugger. Record your app and let your coding agent analyze the full runtime with Replay MCP.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: "Individual Debugging — Fix bugs your agent can't figure out",
    description:
      'Replay is a time-travel debugger. Record your app and let your coding agent analyze the full runtime with Replay MCP.',
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function DebuggingPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Header className="!top-[0px] sm:!top-[0px]" />
      </Suspense>
      <PageContentAnimate className="pt-[calc(var(--header-height))] sm:pt-[calc(var(--header-height))]">
        <DebuggingHero />
        <DebuggingProblem />
        <AgentSolution />
        <DebuggingHowItWorks />
        <DebuggingRuntimeContext />
        <DevTools />
        <DebuggingTimeTravelogues />
        <DebuggingCompatibility />
        <DebuggingGettingStarted />
        <DebuggingFAQs />
        <DebuggingCiPromo />
        <DebuggingCTA />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

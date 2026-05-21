import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { LoopQAHero } from './components/LoopQAHero'
import { LoopQAProblem } from './components/LoopQAProblem'
import { LoopQAHowItWorks } from './components/LoopQAHowItWorks'
import { LoopQAUseCases } from './components/LoopQAUseCases'
import { LoopQAFAQs } from './components/LoopQAFAQs'
import { LoopQACTA } from './components/LoopQACTA'

export const metadata: Metadata = {
  title: 'Loop QA — Autonomous QA for the Vibecoding Era',
  description:
    'Drop in a URL. Loop QA explores your app, writes Playwright tests, captures Replay recordings, and files detailed bug reports — automatically.',
  alternates: {
    canonical: `${siteOrigin}/loop-qa`
  },
  openGraph: {
    url: `${siteOrigin}/loop-qa`,
    title: 'Loop QA — Autonomous QA for the Vibecoding Era',
    description:
      'Drop in a URL. Loop QA explores your app, writes Playwright tests, captures Replay recordings, and files detailed bug reports — automatically.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'Loop QA — Autonomous QA for the Vibecoding Era',
    description:
      'Drop in a URL. Loop QA explores your app, writes Playwright tests, captures Replay recordings, and files detailed bug reports — automatically.',
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function LoopQAPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Header className="!top-[0px] sm:!top-[0px] border-b border-gray-100 !bg-white shadow-[0px_2px_18px_0px_rgba(5,73,30,0.08)]" />
      </Suspense>
      <PageContentAnimate className="pt-[calc(var(--header-height))] sm:pt-[calc(var(--header-height))]">
        <LoopQAHero />
        <LoopQAProblem />
        <LoopQAHowItWorks />
        <LoopQAUseCases />
        <LoopQAFAQs />
        <LoopQACTA />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

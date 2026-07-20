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
  title: 'Replay QA — Autonomous QA for the Vibecoding Era',
  description:
    'Drop in a URL. Replay QA explores your app, writes Playwright tests, captures Replay recordings, and files detailed bug reports — automatically.',
  alternates: {
    canonical: `${siteOrigin}/replay-qa`
  },
  openGraph: {
    url: `${siteOrigin}/replay-qa`,
    title: 'Replay QA — Autonomous QA for the Vibecoding Era',
    description:
      'Drop in a URL. Replay QA explores your app, writes Playwright tests, captures Replay recordings, and files detailed bug reports — automatically.',
    images: [{ url: `${siteOrigin}/replayQA_og-image.png`, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'Replay QA — Autonomous QA for the Vibecoding Era',
    description:
      'Drop in a URL. Replay QA explores your app, writes Playwright tests, captures Replay recordings, and files detailed bug reports — automatically.',
    creator: defaultMeta.twitter.handle,
    images: [{ url: `${siteOrigin}/replayQA_og-image.png`, width: 1200, height: 630 }]
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function LoopQAPage() {
  return (
    <>
      <Header className="border-b border-gray-100 !bg-white shadow-[0px_2px_18px_0px_rgba(5,73,30,0.08)]" />
      <PageContentAnimate className="pt-[var(--site-header-offset)] sm:pt-[var(--site-header-offset)]">
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

import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { QAHowItWorks } from '~/app/components/QAHowItWorks'
import { QAFinalCTA } from '~/app/components/QAFinalCTA'
import { HowItWorksHero } from './components/HowItWorksHero'
import { BugReportExample } from './components/BugReportExample'
import { AskYourAgent } from './components/AskYourAgent'
import { TechnologySection } from './components/TechnologySection'

const title = 'How Replay QA Works'
const description =
  'From URL to bug report — automatically. See how Replay QA explores your app, records every session, and delivers root cause and fix for every bug it finds.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteOrigin}/how-it-works`
  },
  openGraph: {
    url: `${siteOrigin}/how-it-works`,
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

export default function HowItWorksPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Header className="!top-[0px] sm:!top-[0px]" />
      </Suspense>
      <PageContentAnimate>
        <HowItWorksHero />
        <QAHowItWorks showLearnMoreLink={false} />
        <BugReportExample />
        <AskYourAgent />
        <TechnologySection />
        <QAFinalCTA />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

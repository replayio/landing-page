import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { ExtensionProblemSection } from './components/ExtensionProblemSection'
import { ExtensionSolutionSection } from './components/ExtensionSolutionSection'
import { ExtensionHowItWorks } from './components/ExtensionHowItWorks'
import { ExtensionWhyVibecodersLove } from './components/ExtensionWhyVibecodersLove'
import { Pump } from '.basehub/react-pump'
import { draftMode } from 'next/headers'
import { landingPageFragment } from '~/lib/basehub-queries'
import { FAQs } from '~/components/BuilderLanding/Faqs/FAQs'
import { extensionFaqsConfig } from '~/components/BuilderLanding/Faqs/extension-faqs-config'
import { Hero } from './components/hero'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'

const extensionDescription =
  'The Replay Chrome Extension records what happens in your browser and tells your AI agent exactly how to fix bugs. Works with Lovable, Base44, Bolt, and Replit.'

const twitterDescription =
  'Replay records your app, runs automated root-cause analysis, and sends a detailed fix to your coding agent no manual debugging required.'

export const metadata: Metadata = {
  title: {
    template: '%s - Replay',
    default: 'Replay Chrome Extension — Record Bugs, Get Fixes | Replay'
  },
  description: extensionDescription,
  alternates: {
    canonical: `${siteOrigin}/replay-extension`
  },
  openGraph: {
    url: `${siteOrigin}/replay-extension`,
    title: 'Replay Chrome Extension — Record Bugs, Get Fixes',
    description: extensionDescription,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'Replay Superpowers for Your Agent',
    description: twitterDescription,
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

export default function DevToolsPage() {
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
              <ExtensionProblemSection />
              <ExtensionSolutionSection />
              <ExtensionHowItWorks />
              <ExtensionWhyVibecodersLove />
              <FAQs {...extensionFaqsConfig} />
            </PageContentAnimate>
            <Footer />
          </>
        )
      }}
    </Pump>
  )
}


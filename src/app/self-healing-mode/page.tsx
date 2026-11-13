import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { ForTeamsTestimonials } from '~/app/components/ForTeamsTestimonials'
import { BugReportsSection } from '~/app/for-app-builders/components/BugReportsSection'
import { SelfHealingHero } from './components/SelfHealingHero'
import { ProblemSection } from './components/ProblemSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { WhyReplaySection } from './components/WhyReplaySection'
import { CloseTheLoopSection } from './components/CloseTheLoopSection'
import { SelfHealingFAQs } from './components/SelfHealingFAQs'
import { SelfHealingCTA } from './components/SelfHealingCTA'
// The how-it-works sequence reuses the app-builder page's animated diagram and its keyframes.
import '~/app/for-app-builders/app-builders.css'

const title = 'Self-healing Mode for Replay QA: Turn User Frustration Into Fixes'
const description =
  'Self-healing Mode turns frustrated user sessions into root-caused bug reports with evidence, sent to your issue tracker or straight to your coding agent.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteOrigin}/self-healing-mode`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/self-healing-mode`,
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

export default function SelfHealingModePage() {
  return (
    <>
      <Header />
      <PageContentAnimate>
        <SelfHealingHero />
        <ProblemSection />
        <HowItWorksSection />
        <WhyReplaySection />
        <CloseTheLoopSection />
        <BugReportsSection
          showGalleryLink
          description="Every Replay QA bug report is prepared with coding agents in mind: a detailed root cause analysis, a deterministic runtime recording, and all the evidence needed to fix the bug without the guesswork."
        />
        <ForTeamsTestimonials />
        <SelfHealingFAQs />
        <SelfHealingCTA />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

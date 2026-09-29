import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { ForTeamsHero } from './components/ForTeamsHero'
import { WhatYouGetSection, VerificationProblemSection } from './components/WhatYouGetSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { WorkflowSection } from './components/WorkflowSection'
import { ForTeamsTestimonials } from './components/ForTeamsTestimonials'
import { SetupSection } from './components/SetupSection'
import { ForTeamsFAQs } from './components/ForTeamsFAQs'
import { ForTeamsCTA } from './components/ForTeamsCTA'

const title = 'Replay QA — Autonomous QA for the Vibecoding Era'
const description =
  'Replay QA autonomously tests every build for bugs, security flaws, and accessibility failures — then files root-caused bug reports your team can act on.'

export const metadata: Metadata = {
  title: {
    template: '%s - Replay',
    default: title
  },
  description,
  alternates: {
    canonical: `${siteOrigin}/`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/`,
    title,
    description,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    site: defaultMeta.twitter.site,
    title,
    description,
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
    <>
      <Header />
      <PageContentAnimate>
        <ForTeamsHero />
        <WhatYouGetSection />
        <VerificationProblemSection />
        <HowItWorksSection />
        <WorkflowSection />
        <ForTeamsTestimonials />
        <SetupSection />
        <ForTeamsFAQs />
        <ForTeamsCTA />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

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

const title = 'Replay QA for Teams — Verification for Agent-Written Code'
const description =
  'Replay QA finds bugs, explains why, and gives your coding agent the fix. Connect a GitHub repo for continuous testing on every update — for startups.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteOrigin}/for-teams`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/for-teams`,
    title,
    description:
      'Autonomous QA for teams who ship faster than they can verify. A swarm of agents explores your app, root-causes what breaks, and hands your coding agent the fix.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title,
    description:
      'Autonomous QA for teams who ship faster than they can verify. A swarm of agents explores your app, root-causes what breaks, and hands your coding agent the fix.',
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function ForTeamsPage() {
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

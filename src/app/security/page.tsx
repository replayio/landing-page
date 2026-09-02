import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { HowItWorksSection } from '~/app/for-teams/components/HowItWorksSection'
import { WorkflowSection } from '~/app/for-teams/components/WorkflowSection'
import { ForTeamsTestimonials } from '~/app/for-teams/components/ForTeamsTestimonials'
import { SecurityHero } from './components/SecurityHero'
import { SecurityProofSection } from './components/SecurityProofSection'
import { SecurityWhatYouGetSection } from './components/SecurityWhatYouGetSection'
import { SecurityProblemSection } from './components/SecurityProblemSection'
import { SecuritySetupSection } from './components/SecuritySetupSection'
import { SecurityFAQs } from './components/SecurityFAQs'
import { SecurityCTA } from './components/SecurityCTA'

const title = 'Replay QA Security Scan — Automated Penetration Testing for AI-Built Apps'
const description =
  'Security Scan runs a full pentesting pass against your web app — injection flaws, broken access control, IDOR, and cross-tenant data exposure. The vulnerabilities AI coding agents introduce at scale, found automatically.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteOrigin}/security`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/security`,
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

export default function SecurityPage() {
  return (
    <>
      <Header />
      <PageContentAnimate>
        <SecurityHero />
        <SecurityProofSection />
        <SecurityWhatYouGetSection />
        <SecurityProblemSection />
        <HowItWorksSection />
        <WorkflowSection />
        <ForTeamsTestimonials />
        <SecuritySetupSection />
        <SecurityFAQs />
        <SecurityCTA />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

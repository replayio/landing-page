import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { SoftwareFactoriesHero } from './components/SoftwareFactoriesHero'
import { FactoryArchitectureSection } from './components/FactoryArchitectureSection'
import { VerifyLayerSection } from './components/VerifyLayerSection'
import { EvidenceSection } from './components/EvidenceSection'
import { PipelineSection } from './components/PipelineSection'
import { SecurityAndProofSection } from './components/SecurityAndProofSection'
import { SoftwareFactoriesFAQs } from './components/SoftwareFactoriesFAQs'
import { SoftwareFactoriesCTA } from './components/SoftwareFactoriesCTA'

const title = 'Replay QA for Software Factories — Runtime Verification for Autonomous Pipelines'
const description =
  'Replay QA plugs a runtime verification layer into the pipeline you already built. Trigger via REST API, get structured bug reports back, and give your agents the evidence they need to ship with confidence.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteOrigin}/for-software-factories`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/for-software-factories`,
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

export default function ForSoftwareFactoriesPage() {
  return (
    <>
      <Header />
      <PageContentAnimate>
        <SoftwareFactoriesHero />
        <EvidenceSection />
        <FactoryArchitectureSection />
        <VerifyLayerSection />
        <PipelineSection />
        <SecurityAndProofSection />
        <SoftwareFactoriesFAQs />
        <SoftwareFactoriesCTA />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

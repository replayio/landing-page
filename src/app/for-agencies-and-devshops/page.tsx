import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { AgenciesHero } from './components/AgenciesHero'
import { PressureSection } from './components/PressureSection'
import { WhatItDoesSection } from './components/WhatItDoesSection'
import { CustomerSpotlight } from './components/CustomerSpotlight'
import { PaceSection } from './components/PaceSection'
import { PortfolioSection } from './components/PortfolioSection'
import { ClientEvidenceSection } from './components/ClientEvidenceSection'
import { CostSection } from './components/CostSection'
import { AgenciesTestimonials } from './components/AgenciesTestimonials'
import { AgenciesFAQs } from './components/AgenciesFAQs'
import { AgenciesCTA } from './components/AgenciesCTA'

const title = 'Replay QA for Agencies and Dev Shops: More Clients, Same QA Budget'
const description =
  'Replay QA tests every client app on every build and hands your developers root-caused bug reports, so your team can ship faster and take on more clients without adding QA headcount.'

// Unlisted: an inbound page we send agencies to directly, so it stays out of search, the sitemap
// and the footer.
export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${siteOrigin}/for-agencies-and-devshops`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/for-agencies-and-devshops`,
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

export default function ForAgenciesAndDevShopsPage() {
  return (
    <>
      <Header />
      <PageContentAnimate>
        <AgenciesHero />
        <PressureSection />
        <WhatItDoesSection />
        <CustomerSpotlight />
        <PaceSection />
        <PortfolioSection />
        <ClientEvidenceSection />
        <CostSection />
        <AgenciesTestimonials />
        <AgenciesFAQs />
        <AgenciesCTA />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

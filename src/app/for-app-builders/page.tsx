import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { AppBuildersHero } from './components/AppBuildersHero'
import { WhatItIsSection } from './components/WhatItIsSection'
import { CompareSection } from './components/CompareSection'
import { BugKindsSection } from './components/BugKindsSection'
import { BugReportsSection } from './components/BugReportsSection'
import { PreLaunchSection } from './components/PreLaunchSection'
import { PostLaunchSection } from './components/PostLaunchSection'
import { AudosSpotlight } from './components/AudosSpotlight'
import { AppBuildersTestimonials } from './components/AppBuildersTestimonials'
import { ProofPromptSection } from './components/ProofPromptSection'
import { AppBuildersFAQs } from './components/AppBuildersFAQs'
import { AppBuildersCTA } from './components/AppBuildersCTA'
import './app-builders.css'

const title = 'Replay QA for App Builder Platforms: The Autonomous QA Layer'
const description =
  'Insert Replay QA into your builder harness for runtime visibility of the apps your platform builds. One API call tests each app in a real browser and returns root-caused bugs to your build loop.'

// Unlisted: shared 1:1 with platform teams, so it stays out of search, the sitemap and the footer.
export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${siteOrigin}/for-app-builders`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/for-app-builders`,
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

export default function ForAppBuildersPage() {
  return (
    <>
      <Header />
      <PageContentAnimate>
        <AppBuildersHero />
        <WhatItIsSection />
        <CompareSection />
        <BugKindsSection />
        <BugReportsSection />
        <PreLaunchSection />
        <PostLaunchSection />
        <AudosSpotlight />
        <AppBuildersTestimonials />
        <ProofPromptSection />
        <AppBuildersFAQs />
        <AppBuildersCTA />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import BuilderHomeMain from '~/components/BuilderLanding/Chat/Chat'
import { HowBuilderWorks } from '~/components/BuilderLanding/HowBuilderWorks/HowBuilderWorks'
import { ShowcaseGallery } from '~/components/BuilderLanding/ShowcaseGallery/ShowcaseGallery'
import { Connectors } from '~/components/BuilderLanding/Connectors/Connectors'
import { Pricing } from '~/components/BuilderLanding/Pricing/Pricing'
import { FAQs } from '~/components/BuilderLanding/Faqs/FAQs'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { siteOrigin } from '~/lib/constants'

export const metadata: Metadata = {
  title:
    'Replay Builder: Build Working Web Apps in Minutes',
  description:
    'Go from idea to a live web app in minutes. Replay Builder runs on our time-travel debugger, so it catches and fixes its own bugs as it builds.',
  alternates: {
    canonical: `${siteOrigin}/builder`
  },
  openGraph: {
    title:
      'Replay Builder: Build Working Web Apps in Minutes',
    description:
      'Go from idea to a live web app in minutes. Replay Builder runs on our time-travel debugger, so it catches and fixes its own bugs as it builds.',
    url: `${siteOrigin}/builder`,
    siteName: 'Replay',
    images: [
      {
        url: `${siteOrigin}/images/og-image-builder.png`,
        width: 1200,
        height: 630,
        alt: 'Replay Builder'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Replay Builder: Build Working Web Apps in Minutes',
    description:
      'Go from idea to a live web app in minutes. Replay Builder runs on our time-travel debugger, so it catches and fixes its own bugs as it builds.',
    images: [`${siteOrigin}/images/og-image-builder.png`]
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function Home() {
  return (
    <>
      <Header />
      <PageContentAnimate className="pt-[var(--site-header-offset)] sm:pt-[var(--site-header-offset)]">
        <BuilderHomeMain />
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <ShowcaseGallery />
        </Suspense>
        <HowBuilderWorks />
        <Connectors />
        <Pricing />
        <FAQs />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

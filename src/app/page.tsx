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

export const metadata: Metadata = {
  title: 'Replay Builder - AI vibecoding tool that builds fully working web apps, and fixes its own bugs.',
  description: 'With Replay Builder, you can build and deploy your own custom SaaS tools. Built around our deterministic browser debugging devtools, Replay Builder succeeds where other AI coding tools fail, because it sees what actually happens throughout your entire codebase, and can fix itself.',
  openGraph: {
    title: 'Replay Builder - AI vibecoding tool that builds fully working web apps, and fixes its own bugs.',
    description: 'With Replay Builder, you can build and deploy your own custom SaaS tools. Built around our deterministic browser debugging devtools, Replay Builder succeeds where other AI coding tools fail, because it sees what actually happens throughout your entire codebase, and can fix itself.',
    url: 'https://www.replay.io/',
    siteName: 'Replay',
    images: [
      {
        url: '/images/og-image-builder.png',
        width: 1200,
        height: 630,
        alt: 'Replay.Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Replay Builder - AI vibecoding tool that builds fully working web apps, and fixes its own bugs.',
    description: 'With Replay Builder, you can build and deploy your own custom SaaS tools. Built around our deterministic browser debugging devtools, Replay Builder succeeds where other AI coding tools fail, because it sees what actually happens throughout your entire codebase, and can fix itself.',
    images: ['/images/og-image-builder.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main>
        <BuilderHomeMain />
        <ShowcaseGallery />
        <HowBuilderWorks />
        <Connectors />
        <Pricing />
        <FAQs />
      </main>
      <Footer />
    </>
  )
}

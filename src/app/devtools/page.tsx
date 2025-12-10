import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { DevTools } from '~/components/sections/DevTools'
import { Testimonials } from '~/components/Testimonials'
import { Pump } from '.basehub/react-pump'
import { draftMode } from 'next/headers'
import { landingPageFragment } from '~/lib/basehub-queries'
import FAQ from '~/components/sections/FAQ'
import { Hero } from '../components/hero'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta } from '~/lib/constants'
import { BrokenDreamsBanner } from '~/components/BuilderLanding/BrokenDreamsBanner/BrokenDreamsBanner'

export const metadata: Metadata = {
  title: {
    template: '%s - Replay',
    default: 'Replay - Time Travel Browser DevTools'
  },
  description: defaultMeta.description,
  openGraph: {
    title: defaultMeta.title,
    description: defaultMeta.description,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    site: defaultMeta.twitter.site,
    title: defaultMeta.title,
    description: defaultMeta.description,
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
            <BrokenDreamsBanner />
            <Suspense fallback={null}>
              <Header className="!top-[52px] sm:!top-[54px]" />
            </Suspense>
            <main className="pt-[calc(var(--header-height)+52px)] sm:pt-[calc(var(--header-height)+54px)]">
              <Hero {...landingPage} />
              <DevTools {...landingPage} />
              <FAQ {...landingPage} />
              <Testimonials {...landingPage} />
            </main>
            <Footer />
          </>
        )
      }}
    </Pump>
  )
}


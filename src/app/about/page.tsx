import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { AboutHero } from '~/components/about/AboutHero'
import { AboutWhereWeStarted } from '~/components/about/AboutWhereWeStarted'
import { AboutWhereWeGoing } from '~/components/about/AboutWhereWeGoing'
import { AboutHowWeWork } from '~/components/about/AboutHowWeWork'
import { Team } from '~/components/about/Team'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta } from '~/lib/constants'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About Replay',
  openGraph: {
    title: 'About Replay',
    description: 'About Replay',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    title: 'About Replay',
    description: 'About Replay',
  },
  other: {
    name: 'ahrefs-site-verification',
    content: 'd6acf1324602b320f37276d0f77e3e8ced24a91e2298c91fdcb79f2143e73bc6'
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function AboutPage() {
  return (
    <>
      <main>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <AboutHero />
        <AboutWhereWeStarted />
        <AboutWhereWeGoing />
        <AboutHowWeWork />
        <Team />
      </main>
      <Footer />
    </>
  )
}

import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import {
  AboutCta,
  AboutHero,
  AboutHowWeWork,
  AboutTeamSection,
  AboutWhereWeStarted,
  AboutWhereWereGoing
} from '~/components/about'

export const metadata: Metadata = {
  title: 'About Replay — Making Software Visible',
  description:
    "Replay records your software and shows you exactly what happened. Founded by ex-Mozilla engineers, we're building the debugging tools that AI agents and developers need to fix bugs on the first try.",
  alternates: {
    canonical: `${siteOrigin}/about`
  },
  openGraph: {
    url: `${siteOrigin}/about`,
    title: 'About Replay — Making Software Visible',
    description:
      "Replay records your software and shows you exactly what happened. Founded by ex-Mozilla engineers, we're building the debugging tools that AI agents and developers need to fix bugs on the first try.",
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'About Replay — Making Software Visible',
    description:
      "Replay records your software and shows you exactly what happened. Founded by ex-Mozilla engineers, we're building the debugging tools that AI agents and developers need to fix bugs on the first try.",
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function AboutPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Header className="!top-[0px] sm:!top-[0px]" />
      </Suspense>
      <PageContentAnimate className="pt-[calc(var(--header-height))] sm:pt-[calc(var(--header-height))]">
        <AboutHero />
        <AboutWhereWeStarted />
        <AboutWhereWereGoing />
        <AboutHowWeWork />
        <AboutTeamSection />
        <AboutCta />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

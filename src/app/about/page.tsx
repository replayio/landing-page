import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import {
  AboutHero,
  AboutHowWeWork,
  AboutPrinciples,
  AboutTeamSection,
  AboutWhereWeStarted,
  AboutWhereWereGoing
} from '~/components/about'
import { QAFinalCTA } from '../components/QAFinalCTA'

export const metadata: Metadata = {
  title: 'About Replay — Making Software Visible',
  description:
    'Replay records your software and shows you exactly what happened. Founded by ex-Mozilla engineers, we build the debugging tools AI agents and developers need.',
  alternates: {
    canonical: `${siteOrigin}/about`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/about`,
    title: 'About Replay — Making Software Visible',
    description:
      'Replay records your software and shows you exactly what happened. Founded by ex-Mozilla engineers, we build the debugging tools AI agents and developers need.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'About Replay — Making Software Visible',
    description:
      'Replay records your software and shows you exactly what happened. Founded by ex-Mozilla engineers, we build the debugging tools AI agents and developers need.',
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
      <Header />
      <PageContentAnimate>
        <AboutHero />
        <AboutWhereWeStarted />
        <AboutWhereWereGoing />
        <AboutHowWeWork />
        <AboutTeamSection />
        <AboutPrinciples />
        <QAFinalCTA />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

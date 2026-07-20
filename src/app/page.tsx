import { Footer } from '~/components/Footer'
import { Hero } from './components/hero'
import { ProductVideo } from './components/ProductVideo'
import { AgentProblem } from './components/AgentProblem'
import { QATwoWaysToRun } from './components/QATwoWaysToRun'
import { QAHowItWorks } from './components/QAHowItWorks'
import { QAUseCases } from './components/QAUseCases'
import { HomepageTestimonials } from './components/HomepageTestimonials'
import { HomepageFAQs } from './components/HomepageFAQs'
import { QAFinalCTA } from './components/QAFinalCTA'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'

const title = 'Replay QA — AI wrote the app. Replay QA finds what broke.'
const description =
  'Add your GitHub repo for continuous testing, or drop in a URL for a one-time check. Replay QA explores your app, finds real bugs, and gives your coding agent the root cause and fix.'

export const metadata: Metadata = {
  title: {
    template: '%s - Replay',
    default: title
  },
  description,
  alternates: {
    canonical: `${siteOrigin}/`
  },
  openGraph: {
    url: `${siteOrigin}/`,
    title,
    description,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    site: defaultMeta.twitter.site,
    title,
    description,
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

export default function HomePage() {
  return (
    <>
      <Header />
      <PageContentAnimate>
        <Hero />
        <ProductVideo />
        <AgentProblem />
        <QATwoWaysToRun />
        <QAHowItWorks />
        <QAUseCases />
        <HomepageTestimonials />
        <HomepageFAQs />
        <QAFinalCTA />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

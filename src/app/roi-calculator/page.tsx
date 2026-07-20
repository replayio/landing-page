import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { RoiHero } from './components/RoiHero'
import { RoiCalculatorSection } from './components/RoiCalculatorSection'
import { RoiTestimonial } from './components/RoiTestimonial'

const title = 'ROI Calculator — Replay'
const description =
  'Estimate how much debugging time and engineering cost your team will save by plugging Replay into your CI/CD pipeline.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteOrigin}/roi-calculator`
  },
  openGraph: {
    url: `${siteOrigin}/roi-calculator`,
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

export default function RoiCalculatorPage() {
  return (
    <>
      <Header />
      <PageContentAnimate className="pt-[var(--site-header-offset)] sm:pt-[var(--site-header-offset)]">
        <RoiHero />
        <RoiCalculatorSection />
        <RoiTestimonial />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

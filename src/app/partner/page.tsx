import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { PartnerHero } from './components/PartnerHero'
import { PartnerProblem } from './components/PartnerProblem'
import { PartnerBenefits } from './components/PartnerBenefits'
import { PartnerWhoIsFor } from './components/PartnerWhoIsFor'
import { PartnerApplicationForm } from './components/PartnerApplicationForm'

export const metadata: Metadata = {
  title: 'Design Partner Program — Replay',
  description:
    'Join the Replay Design Partner Program. Get free access to Replay MCP, a direct line to the engineering team, and help shape the future of agent-powered debugging.',
  alternates: {
    canonical: `${siteOrigin}/partner`,
  },
  openGraph: {
    url: `${siteOrigin}/partner`,
    title: 'Design Partner Program — Replay',
    description:
      'Help us build the perfect debugger for your coding agent. Free access, direct engineering support, and your workflow shapes the product.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'Design Partner Program — Replay',
    description:
      'Help us build the perfect debugger for your coding agent. Free access, direct engineering support, and your workflow shapes the product.',
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }],
  },
}

export const viewport: Viewport = {
  themeColor: '#FFF',
}

export default function PartnerPage() {
  return (
    <>
      <Suspense fallback={null}>
        <Header className="!top-[0px] sm:!top-[0px]" />
      </Suspense>
      <PageContentAnimate className="pt-[calc(var(--header-height))] sm:pt-[calc(var(--header-height))]">
        <PartnerHero />
        <PartnerProblem />
        <PartnerBenefits />
        <PartnerWhoIsFor />
        <PartnerApplicationForm />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

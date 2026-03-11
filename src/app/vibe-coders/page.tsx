import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { Testimonials } from '~/components/Testimonials'
import { Pump } from '.basehub/react-pump'
import { draftMode } from 'next/headers'
import { landingPageFragment } from '~/lib/basehub-queries'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { VibeCodersHero } from './components/VibeCodersHero'
import { VibeCodersProblem } from './components/VibeCodersProblem'
import { VibeCodersExample } from './components/VibeCodersExample'
import { VibeCodersSteps } from './components/VibeCodersSteps'
import { VibeCodersMCPCallout } from './components/VibeCodersMCPCallout'
import { VibeCodersCTA } from './components/VibeCodersCTA'
import { HomepageCTA } from '~/app/components/HomepageCTA'

export const metadata: Metadata = {
  title: 'Replay for Vibe Coders — Vibe Fearlessly with the Replay Chrome Extension',
  description:
    'The Replay Chrome extension is like having a senior engineer watching over your shoulder, catching bugs, finding root causes, and telling the AI exactly how to fix them.',
  alternates: {
    canonical: `${siteOrigin}/vibe-coders`,
  },
  openGraph: {
    url: `${siteOrigin}/vibe-coders`,
    title: 'Replay for Vibe Coders — Vibe Fearlessly',
    description:
      'The Replay Chrome extension catches bugs, finds root causes, and tells the AI exactly how to fix them. Built for Lovable, Replit, Base44, and Bolt users.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'Replay for Vibe Coders — Vibe Fearlessly',
    description:
      'The Replay Chrome extension catches bugs, finds root causes, and tells the AI exactly how to fix them.',
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }],
  },
}

export const viewport: Viewport = {
  themeColor: '#FFF',
}

export default function VibeCodersPage() {
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
            <Suspense fallback={null}>
              <Header className="!top-[0px] sm:!top-[0px]" />
            </Suspense>
            <PageContentAnimate className="pt-[calc(var(--header-height))] sm:pt-[calc(var(--header-height))]">
              <VibeCodersHero />
              <VibeCodersProblem />
              <VibeCodersExample />
              <VibeCodersSteps />
              <VibeCodersMCPCallout />
              <VibeCodersCTA />
            </PageContentAnimate>
            <Footer />
          </>
        )
      }}
    </Pump>
  )
}

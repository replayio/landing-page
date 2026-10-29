import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { BugGallery } from './components/BugGallery'
import { bugs, summarize } from './data/bugs'

const title = 'Bug gallery: real bugs found by Replay QA'
const description =
  'Races, sub-second glitches, hidden state corruption, and swallowed failures that Replay QA found in real apps, each with its session replay and root cause.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteOrigin}/bugs`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/bugs`,
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

export default function BugsPage() {
  return (
    <>
      <Header />
      <PageContentAnimate>
        <section className="bg-gray-50 pb-16 pt-[120px] md:pb-24 lg:pt-[160px]">
          <Container>
            <div className="mx-auto max-w-5xl">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-bold uppercase tracking-wider text-accent">
                  Bug gallery
                </p>
                <h1 className="mt-3 text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl">
                  The bugs only a time-travel debugger catches.
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
                  Every one of these was found by Replay QA in a real app. Each report has the
                  session replay, a chronology of what happened, and the root cause, ready for a
                  coding agent to fix.
                </p>
              </div>
              <div className="mt-12">
                <BugGallery bugs={bugs.map(summarize)} />
              </div>
              <div className="mt-16 text-center">
                <Button
                  href="https://qa.replay.io/new?utm_source=bug-gallery"
                  target="_blank"
                  size="base"
                >
                  Find bugs like these in my app
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </PageContentAnimate>
      <Footer />
    </>
  )
}

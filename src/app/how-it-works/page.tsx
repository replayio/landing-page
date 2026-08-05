import { Footer } from '~/components/Footer'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { QAFinalCTA } from '~/app/components/QAFinalCTA'
import { StepSideNav } from './components/StepSideNav'
import { StepVideo } from './components/StepVideo'

const title = 'How Replay QA Works: From URL to Bug Report'
const description =
  'One URL in, a full QA team\'s worth of work out. See how Replay QA explores your app, runs every journey, time-travels through the recordings, and delivers root-caused bug reports automatically.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteOrigin}/how-it-works`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/how-it-works`,
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

type Tone = 'plain' | 'tinted'

function Step({
  index,
  eyebrow,
  headline,
  tone = 'plain',
  media,
  children
}: {
  index: number
  eyebrow: string
  headline: string
  tone?: Tone
  media: React.ReactNode
  children: React.ReactNode
}) {
  const shell =
    tone === 'tinted'
      ? 'bg-gray-50 rounded-2xl px-6 sm:px-10 py-12 my-6'
      : 'py-14'

  return (
    <section id={`step-${index}`} className={`scroll-mt-24 ${shell}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-4">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 mb-5">
        {headline}
      </h2>
      <div className="text-base leading-relaxed text-gray-600 space-y-4 max-w-[680px]">
        {children}
      </div>
      <div className="mt-10">{media}</div>
    </section>
  )
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="list-none mt-4 space-y-1.5 text-[15px] text-gray-600">
      {items.map((t) => (
        <li key={t} className="flex gap-2 leading-relaxed">
          <span aria-hidden="true" className="text-accent font-bold flex-shrink-0">
            &#10003;
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <PageContentAnimate>
        {/* Hero */}
        <section className="text-center px-6 pt-[120px] pb-8 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white text-sm text-gray-600 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            How Replay QA works
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 mb-4">
            Replay QA acts like a swarm of seasoned app testers.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            It explores your app on its own, detects the user journeys, and comes back with bug
            reports so your agent can fix them.
          </p>
        </section>

        {/* Steps + side nav */}
        <div className="flex gap-12 max-w-6xl mx-auto px-6 pb-16">
          <StepSideNav />

          <div className="flex-1 min-w-0">
            <Step
              index={0}
              tone="tinted"
              eyebrow="01 Start"
              headline="Drop in a URL. Replay QA takes it from there."
              media={
                <StepVideo
                  mp4Src="/03-UrlInput-Light.mp4"
                  label="A URL being typed into Replay QA to kick off a test run"
                />
              }
            >
              <p>
                Paste any live web app URL and Replay QA gets to work immediately. No test suite to
                write or maintain. It handles all of it.
              </p>
            </Step>

            <Step
              index={1}
              eyebrow="02 Exploration"
              headline="It discovers the user journeys"
              media={
                <StepVideo
                  webmSrc="/02-Exploration-v2-Light.webm"
                  mp4Src="/02-Exploration-v2-Light.mp4"
                  label="Replay QA agents exploring an app, mapping pages and user journeys as a growing web of connections"
                />
              }
            >
              <p>
                Replay QA clicks through your app the way a new QA hire would, with no spec and no
                one to show them around. It finds the pages, the paths between them, and the
                journeys your users take most — including the ones nobody wrote down.
              </p>
            </Step>

            <Step
              index={2}
              tone="tinted"
              eyebrow="03 Testing"
              headline="It tests your app thoroughly"
              media={
                <StepVideo
                  webmSrc="/03-Testing-Light.webm"
                  mp4Src="/03-Testing-Light.mp4"
                  label="Parallel agent sessions running user journeys while every DOM mutation, network call, and JavaScript frame is recorded"
                />
              }
            >
              <p>
                Replay QA spins up a swarm of agents that runs all of the mapped journeys in
                parallel, in a browser. You can watch them work in real time.
              </p>
              <p>
                Each journey test gets recorded, capturing every DOM mutation, every network call,
                every JavaScript frame — all the data needed later to figure out why something
                doesn&apos;t work.
              </p>
            </Step>

            <Step
              index={3}
              eyebrow="04 Analysis"
              headline="It analyzes the failed tests"
              media={
                <StepVideo
                  webmSrc="/04-Analysis-Light.webm"
                  mp4Src="/04-Analysis-Light.mp4"
                  label="An agent scrubbing a Replay Recording timeline, flagging a broken button, a slow network call, and a contrast warning"
                />
              }
            >
              <p>
                For all tests that fail, our agents time-travel through the recordings to find out
                why. Because our recordings are deterministic, the session behaves identically every
                time it&apos;s replayed — so the agents work from the full runtime picture instead
                of a guess. They can see the state of the page, the network calls, and the code
                that ran.
              </p>
              <p>They&apos;re reading what your app did, not what the code says it should do.</p>
              <Checklist
                items={[
                  'Deep runtime bugs: React component failures, elusive state mutations, race conditions, async timing',
                  'UI glitches: layout shifts, broken buttons, elements hidden behind overlays',
                  'Accessibility failures: WCAG contrast violations, missing ARIA labels, keyboard traps',
                  'Performance problems: slow network calls, render-blocking resources, long tasks'
                ]}
              />
            </Step>

            <Step
              index={4}
              tone="tinted"
              eyebrow="05 Reports"
              headline="It writes detailed bug reports"
              media={
                <StepVideo
                  webmSrc="/05-Reports-Light.webm"
                  mp4Src="/05-Reports-Light.mp4"
                  label="A bug report card assembling itself: video thumbnail, annotated screenshot, severity badge, and root-cause text"
                />
              }
            >
              <p>
                The agents don&apos;t just find bugs — they write the report. Each one comes with
                everything needed to understand and fix the issue immediately.
              </p>
              <Checklist
                items={[
                  'A video recording of the exact moment the bug occurs',
                  'Annotated screenshots with problem areas highlighted',
                  'A root cause analysis: specifically what, where, and why',
                  'A suggested fix, ready to paste directly into your coding agent'
                ]}
              />
              <p className="mt-4">
                Bugs are grouped by type and severity so you always know where to start. If you
                connected a GitHub repo, reports go to your agent automatically — no copy-pasting
                required.
              </p>
            </Step>

            <Step
              index={5}
              eyebrow="06 The Loop"
              headline="Fix. Ship. Verify."
              media={
                <StepVideo
                  webmSrc="/06-TheLoop-Light.webm"
                  mp4Src="/06-TheLoop-Light.mp4"
                  label="Flywheel diagram cycling through Ship, Test, Bugs Found, and Fix"
                />
              }
            >
              <p>
                Apply the fixes from the Replay QA bug reports, ship it, and run it again. The same
                journeys re-run, confirming the fix and catching anything it broke. If you&apos;ve
                made other changes to your app, they&apos;ll be detected and tested automatically.
              </p>
              <p>
                If you&apos;re running this on a GitHub repo, a new test run triggers on every push
                to main and with every PR (configurable).
              </p>
            </Step>
          </div>
        </div>

        <QAFinalCTA />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

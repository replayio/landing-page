import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata, Viewport } from 'next/types'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { BugMeta } from '../components/BugMeta'
import { ReplayFile } from '~/components/replay/ReplayFile'
import { BugStepper, EvidenceList, Prose } from '../components/BugStepper'
import { bugs, getBug } from '../data/bugs'
import '~/components/replay/replay.scoped.css'
import '~/components/replay/tokens.css'
import '../bugs.css'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return bugs.map((bug) => ({ slug: bug.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bug = getBug((await params).slug)
  if (!bug) notFound()
  const url = `${siteOrigin}/bugs/${bug.slug}`
  const image = bug.thumbnail ?? defaultMeta.ogImage
  return {
    title: bug.title,
    description: bug.why,
    alternates: { canonical: url },
    openGraph: { type: 'article', url, title: bug.title, description: bug.why, images: [image] },
    twitter: {
      card: 'summary_large_image',
      site: defaultMeta.twitter.site,
      title: bug.title,
      description: bug.why,
      creator: defaultMeta.twitter.handle,
      images: [image]
    }
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export default async function BugPage({ params }: Props) {
  const bug = getBug((await params).slug)
  if (!bug) notFound()
  const index = bugs.indexOf(bug)
  const next = bugs[(index + 1) % bugs.length]

  return (
    <>
      <Header />
      <main className="bg-white pb-20 pt-[110px] lg:pt-[140px]">
        <Container>
          <article className="mx-auto max-w-3xl">
            <Link
              href="/bugs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" /> All bugs
            </Link>

            <header className="mt-6 border-b border-gray-200 pb-8">
              <BugMeta bug={bug} />
              <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                {bug.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{bug.why}</p>
              <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                <span>{bug.project}</span>
                <span aria-hidden>·</span>
                <span>Found {bug.discovered}</span>
                {bug.report && (
                  <>
                    <span aria-hidden>·</span>
                    <a
                      href={bug.report}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-accent hover:opacity-80"
                    >
                      Full report in Replay QA <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </>
                )}
              </p>
            </header>

            {bug.finding && (
              <div className="mt-8 rounded-r-xl border-l-4 border-accent bg-accent/5 px-5 py-4">
                <p className="text-sm font-bold text-gray-900">What the recording showed</p>
                <Prose html={bug.finding} className="mt-1" />
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-red-700">Actual</p>
                <Prose html={bug.actual} className="mt-2" />
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50/50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                  Expected
                </p>
                <Prose html={bug.expected} className="mt-2" />
              </div>
            </div>

            {bug.replay && (
              <Section title="Session replay">
                <div className="bug-replay replay-host">
                  <ReplayFile {...bug.replay} />
                </div>
              </Section>
            )}

            {bug.chronology.length > 0 && (
              <Section title="Chronology of events">
                <BugStepper steps={bug.chronology} />
              </Section>
            )}

            {bug.reproduce.length > 0 && (
              <Section title="Steps to reproduce">
                <BugStepper steps={bug.reproduce} />
              </Section>
            )}

            <Section title="Root cause">
              <Prose html={bug.rootCause.html} />
              <EvidenceList evidence={bug.rootCause.evidence} />
            </Section>

            {bug.rootCauseSteps.length > 0 && (
              <Section title="Root cause → actual behavior">
                <BugStepper steps={bug.rootCauseSteps} />
              </Section>
            )}

            <div className="mt-16 rounded-2xl bg-gray-50 p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900">
                Is your app hiding bugs like this?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-gray-600">
                Replay QA explores every build, records what it finds, and writes the root cause.
              </p>
              <div className="mt-6">
                <Button
                  href="https://qa.replay.io/new?utm_source=bug-gallery"
                  target="_blank"
                  size="sm"
                >
                  Test Replay QA on my app
                </Button>
              </div>
            </div>

            <nav className="mt-10 flex items-center justify-between gap-4 border-t border-gray-200 pt-6 text-sm">
              <Link href="/bugs" className="font-medium text-gray-600 hover:text-accent">
                All {bugs.length} bugs
              </Link>
              <Link
                href={`/bugs/${next.slug}`}
                className="inline-flex min-w-0 items-center gap-1.5 text-right font-medium text-gray-900 hover:text-accent"
              >
                <span className="truncate">Next: {next.title}</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </nav>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  )
}

import Link from 'next/link'
import { Metadata } from 'next/types'
import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import Hyperspace from '~/app/components/hero/hyperspace'
import { AutoplayVideo } from '~/app/components/AutoplayVideo'
import { FaqAccordionList } from '~/app/components/FaqAccordionList'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { CopyAgentPrompt } from '~/app/components/CopyAgentPrompt'
import { seoVariants, type SeoVariant, type SeoVariantKey } from './content'

function getVariant(key: SeoVariantKey): SeoVariant {
  const variant = seoVariants.find((v) => v.key === key)
  if (!variant) throw new Error(`Unknown SEO landing page: ${key}`)
  return variant
}

// "automated qa testing tool" -> "Automated QA testing tool"
function keywordLabel(keyword: string) {
  const text = keyword.replace(/\bqa\b/g, 'QA')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function buildMetadata({
  titleTag: title,
  metaDescription: description,
  path
}: {
  titleTag: string
  metaDescription: string
  path: string
}): Metadata {
  const url = `${siteOrigin}${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
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
}

export function seoLandingMetadata(key: SeoVariantKey): Metadata {
  return buildMetadata(getVariant(key))
}

type HeroProps = { eyebrow: string; h1: string; subhead: string; utmSource: string }

export function Hero({ eyebrow, h1, subhead, utmSource }: HeroProps) {
  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute inset-0 animate-fadeIn">
        <Hyperspace className="opacity-10" />
      </div>
      <Container className="relative z-10 flex w-full max-w-7xl flex-col pb-16 pt-[120px] lg:pb-20 lg:pt-[160px]">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-sm text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </span>
          <h1 className="text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl">
            {h1}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-gray-700">
            {subhead}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={`https://qa.replay.io/new?utm_source=${utmSource}`}
              target="_blank"
              size="base"
            >
              Start free
            </Button>
            <Button href="/how-it-works" variant="outline" size="base">
              How it works
            </Button>
          </div>
          <p className="mt-3 text-sm text-gray-500">No credit card required</p>
          <CopyAgentPrompt />
        </div>
      </Container>
    </section>
  )
}

const reportParts = [
  { title: 'Video recording', body: 'Watch the failure exactly as it happened.' },
  { title: 'Annotated screenshots', body: 'See where on the page things went wrong.' },
  { title: 'Root cause analysis', body: 'With a confidence score, so you know what to fix first.' },
  { title: 'Suggested fix', body: 'Ready for a coding agent to apply.' }
]

// Shown on every page: seeing a real bug report is the "aha" moment in customer interviews.
export function BugReportSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">What you get</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Bug reports your coding agent deserves
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Each report is prepared with coding agents in mind. A detailed root cause analysis, a
              suggested fix, a deterministic runtime recording, and all the context needed to do the
              job.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 shadow-2xl">
            <AutoplayVideo
              src="/ReplayQA_exampleBug.mp4"
              label="Replay QA bug report walkthrough showing root cause, suggested fix, and recording"
            />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reportParts.map((part) => (
              <div key={part.title} className="rounded-xl bg-white p-5">
                <h3 className="font-semibold text-gray-900">{part.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{part.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function FeatureGrid({ variant }: { variant: SeoVariant }) {
  const { label, heading, items } = variant.features

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">{label}</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            {heading}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function StepList({ variant }: { variant: SeoVariant }) {
  const { label, heading, items } = variant.steps

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">{label}</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            {heading}
          </h2>
          <div className="mt-10 flex flex-col gap-8">
            {items.map((item, i) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <span className="text-xs font-bold text-accent">{i + 1}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">{item.title}.</span>{' '}
                  <span className="leading-relaxed text-gray-600">{item.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Highlight({ variant }: { variant: SeoVariant }) {
  const { label, heading, body, href, linkLabel } = variant.highlight

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl rounded-2xl border border-accent/20 bg-accent/5 p-8 md:p-12">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">{label}</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700">{body}</p>
          {href && (
            <Link
              href={href}
              className="mt-6 inline-block font-medium text-accent transition hover:opacity-80"
            >
              {linkLabel} →
            </Link>
          )}
        </div>
      </Container>
    </section>
  )
}

type Faq = { question: string; answer: string }

export function Faqs({
  faqs,
  related
}: {
  faqs: Faq[]
  related: Array<{ label: string; href: string }>
}) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  }

  return (
    <section className="bg-white pb-16 md:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Frequently asked questions
          </h2>
          <FaqAccordionList faqs={faqs} defaultOpenIndex={0} />
          <p className="mt-8 text-center text-sm text-gray-600">
            Related:{' '}
            {related.map((link, i) => (
              <span key={link.href}>
                {i > 0 && ' · '}
                <Link
                  href={link.href}
                  className="font-medium text-accent transition hover:opacity-80"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </Container>
    </section>
  )
}

export function FinalCTA({ utmSource }: { utmSource: string }) {
  return (
    <section className="bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Test your web app today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Paste a URL or connect a GitHub repo. Free includes 25 credits a month, and an average
            app uses about 20 credits per full QA run.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={`https://qa.replay.io/new?utm_source=${utmSource}`}
              target="_blank"
              size="base"
            >
              Start free
            </Button>
            <Button href="/pricing" variant="outline" size="base">
              See pricing
            </Button>
          </div>
          <CopyAgentPrompt />
        </div>
      </Container>
    </section>
  )
}

export function SeoLandingPage({ variantKey }: { variantKey: SeoVariantKey }) {
  const variant = getVariant(variantKey)

  return (
    <>
      <Header />
      <PageContentAnimate>
        <Hero
          eyebrow={variant.eyebrow}
          h1={variant.h1}
          subhead={variant.subhead}
          utmSource={variant.key}
        />
        <BugReportSection />
        <FeatureGrid variant={variant} />
        <StepList variant={variant} />
        <Highlight variant={variant} />
        <Faqs
          faqs={variant.faqs}
          related={seoVariants
            .filter((v) => v.key !== variant.key)
            .map((v) => ({ label: keywordLabel(v.keyword), href: v.path }))}
        />
        <FinalCTA utmSource={variant.key} />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

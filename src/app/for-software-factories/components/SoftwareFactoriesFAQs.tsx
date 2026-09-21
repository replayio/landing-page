'use client'

import Link from 'next/link'
import { useMemo, type ReactNode } from 'react'
import { Container } from '~/components/Container'
import { extractTextFromNode } from '~/lib/utils/extractTextFromNode'
import { FaqAccordionList } from '~/app/for-teams/components/FaqAccordionList'

const faqs: Array<{ question: string; answer: ReactNode }> = [
  {
    question: 'How is this different from AI code review?',
    answer:
      'CodeRabbit, Qodo, and a cold-read model pass all read the diff. Replay QA runs the app. Same position in your pipeline, different layer. Most teams run both, because "the code looks right" and "the app works" are different questions.'
  },
  {
    question: 'Do we have to write tests?',
    answer:
      'No. Replay QA discovers user journeys and writes and runs its own tests. If you already have a Playwright suite, it integrates with it. Nothing needs authoring for Replay QA to start finding bugs.'
  },
  {
    question: 'Does it work behind auth, and on ephemeral preview environments?',
    answer:
      'Yes to both. It signs in and exercises authenticated flows, and a single project can target dev, staging, production, localhost via reverse proxy, and per-PR preview URLs.'
  },
  {
    question: 'What counts as a recording?',
    answer:
      'A recording is the deterministic capture of one browser session while Replay QA exercises a flow in your running app. The number of recordings depends on the journeys and environments you ask Replay QA to verify.'
  },
  {
    question: 'Can our orchestration trigger it, and our agents read the results?',
    answer:
      'Yes. REST API to trigger runs and switch environments, structured output with structured error codes, and Replay MCP so your build agents can time-travel debug their own failures.'
  },
  {
    question: 'How does this price at pipeline volume?',
    answer: (
      <>
        Runs consume credits; the Pro plan is $200/month for 500 credits with team collaboration.
        Continuous PR runs across several environments plus nightly runs and a security pass will
        exceed that. At that point it is a volume conversation, not a plan upgrade. We price
        committed volume for teams running at pipeline scale.{' '}
        <Link href="/pricing" className="font-medium text-accent transition hover:opacity-80">
          See plans →
        </Link>
      </>
    )
  },
  {
    question: 'What happens to the harness we already built?',
    answer:
      'Most teams keep it for a while and run both, then narrow theirs to the handful of app-specific assertions that are genuinely theirs. The goal is not to delete your work. It is to stop you maintaining the generic 90% of it.'
  }
]

export function SoftwareFactoriesFAQs() {
  const faqSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: extractTextFromNode(faq.answer).trim()
        }
      }))
    }),
    []
  )

  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
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
            Architecture questions?{' '}
            <a href="/contact" className="font-medium text-accent transition hover:opacity-80">
              Talk to us
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  )
}

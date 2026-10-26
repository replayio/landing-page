'use client'

import { useMemo, type ReactNode } from 'react'
import { Container } from '~/components/Container'
import { extractTextFromNode } from '~/lib/utils/extractTextFromNode'
import { FaqAccordionList } from '~/app/components/FaqAccordionList'

const code = 'rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.86em] text-gray-900'

const faqs: Array<{ question: string; answer: ReactNode }> = [
  {
    question: 'Our agent already tests its own work. Why add Replay QA?',
    answer:
      'Keep it. The question is whether the agent that wrote the code should be the only one checking it. Replay QA is an independent second opinion, and where a visual pass stops at the symptom, it hands your agent a root cause from a deterministic runtime recording. Run both on the same builds and compare.'
  },
  {
    question: 'How does it plug into our platform?',
    answer: (
      <>
        One API call when a build finishes. Everything runs through the REST API at{' '}
        <code className={code}>https://qa.replay.io/api/v1</code>, documented by an OpenAPI spec:
        create a project for the app, let Replay QA explore and test it, then pull structured bugs,
        root causes and fix prompts back into your agent&apos;s loop and mark them resolved.
      </>
    )
  },
  {
    question: 'Will testing slow down delivery for our users?',
    answer:
      "It doesn't have to. You choose where the gate sits: before publish, before share, or asynchronously after the first preview, so testing and fixing happen in the background before delivery."
  },
  {
    question: 'Do we need to write or maintain tests?',
    answer:
      'No. Generated apps have nobody to write tests for them. Replay QA explores each app, discovers the user journeys, and writes and runs its own Playwright tests.'
  },
  {
    question: "Our users' apps have no traffic yet. Does that matter?",
    answer:
      "No. Replay QA generates its own sessions from a URL, so it works on apps nobody has used yet. That's also why tools that depend on real user sessions don't fit generated apps."
  },
  {
    question: "Can it test apps that aren't publicly reachable?",
    answer:
      'Yes. A reverse proxy lets Replay QA test localhost or private-network apps without exposing them, and one project can target several environments, such as dev, staging and production.'
  },
  {
    question: 'What about security?',
    answer:
      'Security Scan can run as an extra pass for broken access control, IDOR and cross-tenant data exposure, the vulnerability classes AI-written apps tend to ship with. It needs ownership verification, which a platform can automate for the apps it hosts.'
  },
  {
    question: 'How is it priced at platform volume?',
    answer:
      "Replay QA is designed for high volume, and platforms get usage-based or committed-volume pricing. Schedule a call and we'll size it to your build volume."
  },
  {
    question: 'Can we use the results to improve our agent?',
    answer:
      'Yes. Every report is structured: kind, severity, root cause and fix. Across thousands of builds that becomes a dataset of exactly where your agent fails, which shows you what to change in its prompts, tools and evals.'
  }
]

export function AppBuildersFAQs() {
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
    <section className="relative isolate overflow-hidden bg-gray-50 py-16 md:py-24">
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
        </div>
      </Container>
    </section>
  )
}

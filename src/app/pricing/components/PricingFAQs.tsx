'use client'

import { Container } from '~/components/Container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '~/components/ui/accordion'
import { useMemo, type ReactNode } from 'react'
import { extractTextFromNode } from '~/lib/utils/extractTextFromNode'

const faqs: Array<{ question: string; answer: ReactNode }> = [
  {
    question: "What's the difference between the plans?",
    answer:
      'The plans differ by credit volume. Free gives you 25 credits per month — enough to evaluate Replay with no time limit. Individual ($20/mo or $204/yr) and Team ($200/mo or $2,040/yr) unlock more volume and all integrations. Enterprise is custom-scoped for high-volume usage.'
  },
  {
    question: 'Can I upgrade or downgrade at any time?',
    answer:
      "Yes. Start on Free and upgrade whenever you're ready — no commitment required. You can downgrade to a lower plan at the end of your billing period."
  },
  {
    question: 'What counts as a credit?',
    answer:
      'A credit is used any time Replay examines a recording to produce an insight — a root cause, a bug report, a suggested fix. Each recording analyzed uses one credit, regardless of which Replay product triggered it.'
  },
  {
    question: 'What happens if I hit my credit limit?',
    answer:
      "You'll be notified when you're approaching your limit. You can upgrade to a higher plan at any time — your existing recordings stay intact."
  },
  {
    question: 'How is this different from Datadog, Sentry, or LogRocket?',
    answer:
      'Those tools surface what went wrong. Replay captures the full runtime — every DOM mutation, network call, and JS execution frame — and analyzes it to tell you exactly why, with a specific fix. No human needs to read a trace.'
  },
  {
    question: 'Does Replay work with my existing tools?',
    answer: (
      <>
        <p className="mb-3">
          Yes. You can ask your coding agent to run Replay QA on a web app you&apos;re building by
          giving it the following prompt:
        </p>
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-gray-900 p-4 text-xs leading-relaxed text-gray-100">
          <code>{`Set up a continuous QA loop for the app we're building using Replay QA (https://qa.replay.io).

Drive everything through the REST API at https://qa.replay.io/api/v1 — read the OpenAPI spec at /api/v1/openapi.json first; it documents the full workflow. Authenticate with my API token ("Authorization: Bearer lqa_..."), asking me for it if needed.

Your job:
1. Create a QA project for the running app — give it the target_url and a short note on the key flows. If the app is only reachable from this machine (e.g. http://localhost:3000), enable the reverse proxy and follow the spec's setup steps.
2. Let QA run — poll the project status and don't kick off explorations or test runs yourself; QA drives those.
3. For each open bug, read its full root-caused report and apply the fix directly in the codebase, then mark it fixed via the API.
4. Keep looping until no open bugs remain.`}</code>
        </pre>
      </>
    )
  }
]

export function PricingFAQs() {
  const faqSchema = useMemo(() => {
    return {
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
    }
  }, [])

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-gray-200 pb-16 pt-12 md:pb-24 md:pt-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container className="relative">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Common questions
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="flex flex-col gap-3"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="overflow-hidden rounded-xl border border-b border-gray-200 bg-white px-5 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-gray-900 hover:no-underline sm:text-lg [&>svg]:text-gray-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  )
}

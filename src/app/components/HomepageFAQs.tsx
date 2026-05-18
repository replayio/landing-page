'use client'

import Link from 'next/link'
import { Container } from '~/components/Container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '~/components/ui/accordion'
import { useMemo } from 'react'
import { extractTextFromNode } from '~/lib/utils/extractTextFromNode'

const faqs = [
  {
    question: 'How does Replay record my tests?',
    answer:
      'Replay works by swapping in a Replay-instrumented browser in your CI config. When a test runs, Replay captures every DOM mutation, network request, and JS execution deterministically — so the recording is a perfect, replayable trace of exactly what happened.'
  },
  {
    question: 'What kind of analysis does the agent provide?',
    answer:
      'For each failing test, Replay posts a PR comment with a root cause statement, a confidence score, the exact line of code that caused the failure, and an evidence trail showing the sequence of events leading up to it. If the failure has a clear fix, it includes a suggested code change.'
  },
  {
    question: 'Does Replay only work with React?',
    answer:
      'No — Replay works with any JavaScript or TypeScript application. React apps get deeper analysis because Replay can inspect component state and re-renders, but Replay captures full execution data for any JS stack.'
  },
  {
    question: 'How long does analysis take?',
    answer:
      'Usually a few minutes after the test run completes. Replay posts its analysis as a PR comment, so your developer sees the root cause and suggested fix before they even open the CI logs.'
  },
  {
    question: "What if the agent's analysis is wrong?",
    answer:
      'Replay includes a confidence score with every analysis, so you can tell at a glance how certain it is. Every analysis also links to the full recording so you can open it in Replay DevTools and inspect every frame yourself.'
  },
  {
    question: 'Does recording slow down my CI?',
    answer:
      'Minimal overhead — comparable to screen recording. Most teams run Replay in CI without noticing a difference in build times.'
  },
  {
    question: 'How much does this cost?',
    answer: (
      <>
        Replay Growth is $299/month (billed annually) or $349/month (billed monthly), and includes
        500 AI analyses per month. Start on the Free plan (25 analyses/month) with no time limit.{' '}
        <Link
          href="/pricing"
          className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
        >
          See full pricing →
        </Link>
      </>
    )
  }
]

export function HomepageFAQs() {
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

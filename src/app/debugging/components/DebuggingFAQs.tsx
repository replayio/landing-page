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
    question: 'Is this different from Replay CI Agent?',
    answer:
      'Yes. CI Agent automatically records and analyzes your E2E test failures in your CI pipeline—no manual work needed. This page is about using Replay to debug specific bugs on your own, outside of CI. Same time-travel technology, different workflow.'
  },
  {
    question: 'Does Replay MCP work with my coding agent?',
    answer:
      'Replay MCP works with Claude Code, Codeium, Cursor, Windsurf, or any MCP-compatible tool. If your agent supports MCP, it can use Replay.'
  },
  {
    question: 'Do I need to use MCP, or can I just use DevTools?',
    answer:
      'Both work. Replay DevTools gives you a visual debugging interface with time-travel controls. Replay MCP lets your coding agent access the same data programmatically. Use whichever fits your workflow—or both.'
  },
  {
    question: 'What does Replay actually record?',
    answer:
      "Everything. Every function call, every DOM mutation, every network request, every state change, every event handler. It's a deterministic capture of the program execution, not a video or a log file. You can inspect any moment in the recording as if you paused the debugger right there."
  },
  {
    question: 'Does it only work with React?',
    answer:
      'No. Replay records the entire browser runtime—any JavaScript framework works. React teams get additional insights from built-in React DevTools, component render analysis, and Redux / Zustand / TanStack Query state tracking integrations.'
  },
  {
    question: 'Is Replay free for individual use?',
    answer: (
      <>
        The free plan lets you record and investigate with no time limit—start without a credit
        card. For higher volume, individual debugging is available on the Growth plan at $20/mo—or
        reach out if you&apos;re an individual developer and we&apos;ll figure something out.{' '}
        <Link
          href="/pricing"
          className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
        >
          See pricing
        </Link>
      </>
    )
  }
]

export function DebuggingFAQs() {
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

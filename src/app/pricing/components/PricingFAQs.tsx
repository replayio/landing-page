'use client'

import { Container } from '~/components/Container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'
import { useMemo } from 'react'
import { extractTextFromNode } from '~/lib/utils/extractTextFromNode'

const faqs = [
  {
    question: 'What counts as a session?',
    answer:
      'A session is one recorded debugging interaction — a bug captured, analyzed, and returned with a root cause and proposed fix. Whether you use the Chrome extension or IDE via MCP, it draws from the same monthly pool.',
  },
  {
    question: 'Do I need both the Chrome extension and MCP?',
    answer:
      "No. Use whichever fits your workflow. The Chrome extension is great for capturing bugs as you browse; MCP brings Replay's analysis directly into Cursor, VS Code, or any MCP-compatible IDE. Many teams use both depending on context.",
  },
  {
    question: 'When will pricing be finalized?',
    answer:
      "We're still in active design partner phase and setting final numbers based on what we learn with early teams. Reach out now and you'll lock in design-partner rates before general availability.",
  },
  {
    question: 'What kinds of bugs does Replay work best for?',
    answer:
      'Hard-to-reproduce bugs: intermittent failures, React state issues, race conditions, anything that disappears when you try to recreate it manually. If you can record it happening, Replay can analyze it and tell you exactly what went wrong.',
  },
  {
    question: 'We use AI coding tools. Does Replay help with those bugs?',
    answer:
      'Yes — and this is increasingly the core use case. AI-generated code produces more hard-to-trace logic errors and concurrency bugs than human-written code. Replay gives your AI agent ground truth about what actually happened at runtime, rather than asking it to guess.',
  },
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
          text: extractTextFromNode(faq.answer).trim(),
        },
      })),
    }
  }, [])

  return (
    <section id="faq" className="relative isolate overflow-hidden bg-white pb-16 pt-12 md:pb-24 md:pt-20">
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
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-300"
              >
                <AccordionTrigger className="py-5 text-left hover:no-underline text-base font-semibold text-gray-900 sm:text-lg [&>svg]:text-gray-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-gray-700 sm:text-base">
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

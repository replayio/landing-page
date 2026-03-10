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
    question: 'What is Replay MCP?',
    answer:
      "Replay MCP is a Model Context Protocol server that connects Replay's recording and analysis engine to your coding agent. When your agent encounters a bug, Replay MCP provides the root cause and a detailed fix — drawn from a deterministic browser recording — so the agent can implement the fix directly.",
  },
  {
    question: 'Which coding agents does it work with?',
    answer:
      'Any agent that supports MCP — including Claude Code, Cursor, Copilot, and Windsurf. Add Replay MCP once and it works across your tools.',
  },
  {
    question: 'How is this different from session replay tools like LogRocket?',
    answer:
      "Session replay tools capture video and logs for humans to watch. Replay captures a deterministic recording of the browser runtime — every DOM mutation, network call, and state change — and Replay MCP analyzes it automatically to generate fixes for your agent. No human needs to watch anything.",
  },
  {
    question: 'Does recording slow down my app or tests?',
    answer:
      "Minimal overhead. Replay's recording performance is comparable to screen recording. Most teams run it in CI without noticing a difference.",
  },
  {
    question: 'Do I need to change my test setup?',
    answer:
      'No. Replay integrates with Cypress, Playwright, Selenium, and WebDriver. Point it at your existing test suite and start recording.',
  },
  {
    question: 'Is it free?',
    answer:
      'Yes, Replay is free to get started. Record sessions, connect Replay MCP to your agent, and start getting automated fixes at no cost.',
  },
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
          text: extractTextFromNode(faq.answer).trim(),
        },
      })),
    }
  }, [])

  return (
    <section id="faq" className="relative isolate overflow-hidden bg-gray-200 pb-16 pt-12 md:pb-24 md:pt-20">
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

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
    question: 'Can I use Replay CLI-only?',
    answer:
      'Yes. You can install the Replay CLI skills and Replay MCP to debug locally. The real power of Replay is when it is plugged into your CI/CD pipeline.'
  },
  {
    question: 'Do I need to use Replay with my Playwright test suite?',
    answer:
      'No. Replay can be used on its own. When you configure your Playwright tests to use Replay, recordings are captured for all tests, so you get time-travel debugging analysis on failures.'
  },
  {
    question: 'Do I need to integrate Replay into my CI/CD pipeline?',
    answer:
      'No, but we highly recommend it. Teams that run test suites on PRs can get root-cause analysis and suggested fixes for failed tests as comments on the pull request in GitHub.'
  },
  {
    question: 'Does Replay commit code automatically?',
    answer:
      'No. Replay suggests root-cause analyses and fixes that a human engineer can choose to implement.'
  },
  {
    question: 'Will there be a free trial?',
    answer:
      "Yes. We're aiming to start with a 14-day free trial, no credit card required, so you can get Replay set up and see the value it delivers. During the trial you can capture Replay recordings and get time-travel analysis on them. You can configure your Playwright suite to capture recordings and set up the Replay GitHub bot to monitor runs, capture recordings, and analyze failed tests."
  },
  {
    question: 'Will pricing be flat or usage-based?',
    answer:
      'For our base tier we plan a flat price (monthly or annually) with an allotment of 500 analyzed recordings per month — enough for most startup teams. For larger engineering teams we will work with you on a structure that fits.'
  },
  {
    question: 'What does it mean to be a Replay design partner?',
    answer: (
      <>
        Visit our{' '}
        <Link
          href="/partner"
          className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
        >
          design partner page
        </Link>{' '}
        to learn more about how you can help shape the future of Replay.
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
      className="relative isolate overflow-hidden bg-white pb-16 pt-12 md:pb-24 md:pt-20"
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
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-300"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-gray-900 hover:no-underline sm:text-lg [&>svg]:text-gray-400">
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

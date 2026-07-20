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
    question: 'What kinds of apps can Replay QA test?',
    answer:
      'Any web app accessible via a URL — marketing sites, SaaS products, internal tools, or all of the above. Replay QA explores whatever is at the URL you provide.'
  },
  {
    question: 'How does the GitHub repo integration work?',
    answer:
      "Add your GitHub repo URL, authenticate with GitHub, and the Replay QA GitHub app installs — no test suite, no config. Then choose when it runs: on every update to your main branch, on every pull request, or both. Replay QA tests against your preview or staging environment and, for PR runs, posts the root cause and a suggested fix right on the pull request. It's a continuously-running quality gate, not a one-off."
  },
  {
    question: 'GitHub repo or URL — which should I use?',
    answer:
      'Drop in a URL when you want a one-time bug report on whatever you just shipped — zero setup, ideal for solo builders, internal tools, and agency deliverables. Connect a GitHub repo when you want continuous coverage as your team keeps shipping — ideal for engineers and engineering teams who want a quality gate on every branch update or PR.'
  },
  {
    question: 'Can Replay QA test apps that require login?',
    answer:
      'Yes. Replay QA supports authenticated flows. You can provide login credentials and it will test behind your auth wall.'
  },
  {
    question: 'Can I test localhost or private apps?',
    answer:
      'Yes. Replay QA includes a reverse proxy option so it can reach apps running on your local machine or a private network.'
  },
  {
    question: 'Do I need to write any tests or config?',
    answer:
      'No. Replay QA discovers user journeys and writes Playwright tests automatically. You provide a URL — it takes care of everything else.'
  },
  {
    question: 'What does a bug report include?',
    answer:
      'Every bug comes with a Replay recording of the session, a full runtime breakdown (function calls, DOM mutations, network requests, state changes), a root-cause analysis with confidence score, and a suggested fix.'
  },
  {
    question: 'How is this different from Playwright or Cypress test generation tools?',
    answer:
      'Test generation tools help you write tests faster — you still have to write them, run them, and debug when they fail. Replay QA explores your app autonomously, writes and runs the tests itself, and diagnoses failures. You just provide a URL.'
  },
  {
    question: 'How is this different from QA Wolf or BrowserStack?',
    answer:
      "QA Wolf requires human QA engineers to build and maintain test suites. BrowserStack is a platform for running tests you've already written. Replay QA is fully autonomous — no tests to write, no humans to triage. It finds the flows, finds the bugs, and explains root cause."
  },
  {
    question: 'Does Replay QA replace human QA teams?',
    answer:
      "For most of our users, there's no human QA team to replace — Replay QA is the only QA layer they have. For teams that do have QA, Replay QA handles the autonomous discovery work so human QA can focus on what actually needs human judgment."
  },
  {
    question: 'Can I connect Replay QA to my issue tracker?',
    answer:
      "Yes. Replay QA supports a Bug Report Webhook — point it at your issue tracker's API (or a lightweight middleware) and every bug Replay QA finds can be filed automatically. The webhook sends a JSON POST with the bug description, a referrer identifying Replay QA as the source, and a callback URL. Once your team fixes the bug, POST to that URL to mark it resolved in Replay QA — which re-enables the associated journey for future test runs. You can control when bugs are submitted: manually, only when Replay QA has confirmed them as open, or for all reports including unconfirmed. Works with Linear, GitHub Issues, Jira, and any tracker that accepts an HTTP endpoint."
  },
  {
    question: 'How much does this cost?',
    answer: (
      <>
        Free plan includes 25 credits per month — no time limit, no credit card required. Paid plans
        start at $20/month for individuals and $200/month for teams.{' '}
        <Link
          href="/pricing"
          className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
        >
          See full pricing
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

'use client'

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
    question: "What's the difference between the plans?",
    answer:
      'The plans differ by analysis volume. Free gives you 20 AI analyses per month — enough to evaluate Replay with no time limit. Individual ($50/mo) and Team ($300/mo) unlock more volume and all integrations. Enterprise is custom-scoped for high-volume usage.'
  },
  {
    question: 'Can I upgrade or downgrade at any time?',
    answer:
      "Yes. Start on Free and upgrade whenever you're ready — no commitment required. You can downgrade to a lower plan at the end of your billing period."
  },
  {
    question: 'What counts as a credit?',
    answer:
      'A credit maps to any meaningful work done by Replay QA. A user journey discovered, a bug found and analyzed. To run QA on a web app of average complexity, expect to spend around 20 credits. The more complex an app is, the more credits it will require.'
  },
  {
    question: 'What happens if I hit my credit limit?',
    answer:
      "You can always upgrade to a higher plan, and the credits for the new plan will become available immediately. Additionally, you can earn credits by sharing your Replay QA projects on social platforms. Open the project's settings and paste in the link to your public social post. Once it's set, the project is free — all credits already spent on it are refunded, and future QA on it is free. That's it: QA runs exactly the same, at no cost. Shared projects are public and searchable, so others can see the results — it also works great for QA'ing an app someone else posted to help them out."
  },
  {
    question: 'How is this different from Datadog, Sentry, or LogRocket?',
    answer:
      'Those tools surface what went wrong. Replay captures the full runtime — every DOM mutation, network call, and JS execution frame — and analyzes it to tell you exactly why, with a specific fix. No human needs to read a trace.'
  },
  {
    question: 'Does Replay work with my existing tools?',
    answer:
      'Yes. Replay integrates with Playwright and Cypress for test recording, GitHub Actions, CircleCI, Jenkins, and BuildKite for CI, and Claude Code, Codex, Cursor, Copilot, and Windsurf for coding agents. Use whichever combination fits your workflow.'
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

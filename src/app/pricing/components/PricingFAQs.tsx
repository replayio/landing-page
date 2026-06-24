'use client'

import { Container } from '~/components/Container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '~/components/ui/accordion'
import { useMemo, useState, type ReactNode } from 'react'
import { extractTextFromNode } from '~/lib/utils/extractTextFromNode'

const agentPrompt = `Set up a continuous QA loop for the app we're building using Replay QA (https://qa.replay.io).

Drive everything through the REST API at https://qa.replay.io/api/v1 — read the OpenAPI spec at /api/v1/openapi.json first; it documents the full workflow. Authenticate with my API token ("Authorization: Bearer lqa_..."), asking me for it if needed.

Your job:
1. Create a QA project for the running app — give it the target_url and a short note on the key flows. If the app is only reachable from this machine (e.g. http://localhost:3000), enable the reverse proxy and follow the spec's setup steps.
2. Let QA run — poll the project status and don't kick off explorations or test runs yourself; QA drives those.
3. For each open bug, read its full root-caused report and apply the fix directly in the codebase, then mark it fixed via the API.
4. Keep looping until no open bugs remain.`

function CopyableCode({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative mt-3">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-md bg-gray-700 px-2 py-1 text-[11px] font-medium text-gray-300 transition hover:bg-gray-600 hover:text-white"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-gray-900 p-4 pr-16 text-xs leading-relaxed text-gray-100">
        <code>{text}</code>
      </pre>
    </div>
  )
}

const faqs: Array<{ question: string; answer: ReactNode }> = [
  {
    question: "What's the difference between the plans?",
    answer:
      'The plans differ by analysis volume. Free gives you 25 credits per month — enough to evaluate Replay with no time limit. Individual ($20/mo) and Team ($200/mo) unlock more volume and all integrations. Enterprise is custom-scoped for high-volume usage.'
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
    question: 'Does Replay QA work with my existing tooling?',
    answer: (
      <>
        <p className="mb-4">
          Yes. We&apos;ve built Replay QA to work well with your existing tooling.
        </p>
        <div className="space-y-5">
          <div>
            <p className="mb-3">
              <span className="font-semibold text-gray-700">1)</span> You can ask your coding agent
              to kick off a Replay QA project with a prompt. Then your agent will be able to get
              updates on the progress, and when we find bugs, they&apos;ll be ingested automatically
              for your agent to fix.
            </p>
            <CopyableCode text={agentPrompt} />
          </div>
          <p>
            <span className="font-semibold text-gray-700">2)</span> If you&apos;ve got Playwright
            tests set up in your CI/CD pipeline, you can configure your tests to also trigger Replay
            recordings, and our Github bot will kick off analyses on failed tests automatically
            (sending them to the Replay QA), and the root cause and suggested fixes will be posted
            as a comment on your PRs. It&apos;s magical.
          </p>
        </div>
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

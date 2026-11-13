'use client'

import { useMemo, type ReactNode } from 'react'
import { Container } from '~/components/Container'
import { extractTextFromNode } from '~/lib/utils/extractTextFromNode'
import { FaqAccordionList } from '~/app/components/FaqAccordionList'

const faqs: Array<{ question: string; answer: ReactNode }> = [
  {
    question: 'What is Self-healing Mode?',
    answer:
      'A mode of Replay QA for live apps with real users. Fullstory’s JavaScript snippet captures user sessions, and when frustration signals show up in the session data, Replay QA automatically runs a root cause analysis and writes a bug report with the evidence behind it.'
  },
  {
    question: 'How do I set up Self-healing Mode?',
    answer: (
      <div className="space-y-3">
        <p>
          We&apos;ve made setup as easy as possible. After you create a Replay QA project for your
          site or app, you&apos;ll see a Self-healing Mode option in the onboarding guide. It gives
          you a prompt to feed your coding agent to set it all up.
        </p>
        <p>
          The prompt tells your coding agent to install the Fullstory snippet in the head of your
          web app, which is what captures user sessions. You&apos;ll need to deploy that change
          before user sessions start flowing into Replay QA. You don&apos;t need a Fullstory
          account, because Replay uses its own Fullstory API key. In a future version of
          Self-healing Mode, you&apos;ll be able to bring your own Fullstory API key.
        </p>
        <p>
          Once the snippet is deployed, user sessions are analyzed for frustration signals and bug
          reports are generated automatically in your Replay QA project. You can integrate your
          issue tracker to push the bugs there, connect your coding agent through Replay QA&apos;s
          REST API so it can pull in the bug reports and fix them, or both.
        </p>
      </div>
    )
  },
  {
    question: 'Does Replay record my users’ browsers?',
    answer:
      'No. Fullstory’s snippet captures the user sessions. Replay QA takes the signal from that session and reproduces the problem in its own instrumented Chromium browser, where it records everything it needs to find the root cause.'
  },
  {
    question: 'What if I already use a session capture/replay tool?',
    // TODO: placeholder answer. Replace before this ships, since it also goes into the FAQ schema.
    answer: 'Answer coming soon.'
  },
  {
    question: 'What counts as a frustration signal?',
    answer:
      'Moments where a user hit a wall, such as rage clicks, clicks that do nothing, and clicks that trigger an error. Each one marks a spot in the session worth investigating.'
  },
  {
    question: 'Does it fix the bug for me?',
    answer:
      'No. It gives you the root cause analysis and the runtime evidence behind it, which is what a coding agent needs to fix the bug without guessing. You decide what happens next: file the report in your issue tracker for your team, or send it to your coding agent to make the change. Replay QA can then test the fix before it ships.'
  },
  {
    question: 'My app doesn’t have users yet. Is this for me?',
    answer:
      'Not yet. Self-healing Mode works from real user sessions. Before launch, Replay QA explores and tests your app from a URL on its own, no traffic needed.'
  },
  {
    question: 'Do I still need regular Replay QA testing?',
    answer:
      'They work best together. Regular runs catch bugs before they ship. Self-healing Mode catches the ones that slip through, on real data and in the paths only real users take.'
  }
]

export function SelfHealingFAQs() {
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

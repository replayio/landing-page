import Link from 'next/link'
import { type ReactNode } from 'react'
import { Container } from '~/components/Container'
import { FaqAccordionList } from '~/app/components/FaqAccordionList'

const link = 'font-medium text-accent transition hover:opacity-80'

const faqs: Array<{ question: string; answer: ReactNode }> = [
  {
    question: 'Can we run Replay QA across many client projects?',
    answer:
      'Yes. Each client app is its own project with its own repository, target environment, test credentials, and schedule, so one team can cover a whole book of clients from a single account.'
  },
  {
    question: 'Do we need to write tests for each client?',
    answer:
      "No. Replay QA explores the running app, discovers its user journeys, and writes and runs its own tests against them, including journeys nobody specified. You don't need an existing test suite to start."
  },
  {
    question: 'Does Replay QA fix the bugs it finds?',
    answer:
      'No, and that’s deliberate. It finds the bug, works out the root cause, and writes a suggested fix, but applying it stays with your developers. The report is built so your coding agent can act on it directly, and your team keeps the review step on anything that touches a client’s codebase.'
  },
  {
    question: 'Can I drive Replay QA from my coding agent?',
    answer: (
      <>
        Yes. Replay QA has a REST API and an MCP server, so your coding agent can trigger runs,
        switch environments, and read bug reports without anyone opening the dashboard.{' '}
        <a href="https://docs.replay.io/reference/replay-qa/api" className={link}>
          Learn more in our docs
        </a>
        .
      </>
    )
  },
  {
    question: 'Can it test client apps behind a login?',
    answer:
      "Yes. Replay QA can create its own accounts as long as they're email and password (Google Auth and other OAuth providers won't work). You can also give it test credentials for each role, which is useful for admin areas and role-specific features."
  },
  {
    question: 'Can it test staging, preview, or localhost?',
    answer:
      'Yes. Each project can target dev, staging, production, or localhost. For localhost we run a reverse proxy so Replay QA can reach an app running on a developer’s machine.'
  },
  {
    question: 'Does Replay QA test native mobile apps?',
    answer:
      'No. Replay QA focuses on web apps that run in a browser, though it does catch issues in web apps running in mobile browsers. That’s because every app Replay QA tests runs in our instrumented version of the Chromium browser, which is how we capture the deterministic runtime recordings behind its deep root-cause analysis of bugs.'
  },
  {
    question: 'Some of our clients have strict security requirements. What are the options?',
    answer: (
      <>
        Start with our{' '}
        <Link href="/security" className={link}>
          security page
        </Link>
        . For clients that need to own their data, Private Cloud runs on a storage bucket your
        company owns with dedicated processing, and On-Prem runs the whole pipeline on
        infrastructure you control.
      </>
    )
  },
  {
    question: 'What happens after we fix a bug?',
    answer:
      'Every report comes with a callback URL. POST to it when the fix ships and Replay QA marks the bug resolved, then re-enables that user journey for future runs so you find out immediately if it regresses.'
  },
  {
    question: 'How is it priced for an agency?',
    answer: (
      <>
        Pricing is based on how many analyses you run each month, not per seat, so adding a client
        doesn&apos;t mean adding a license or a hire. There&apos;s a free tier to try it on a real
        client project first. See the{' '}
        <Link href="/pricing" className={link}>
          pricing page
        </Link>
        , or{' '}
        <Link href="/contact" className={link}>
          talk to us
        </Link>{' '}
        about volume across a portfolio of clients.
      </>
    )
  }
]

export function AgenciesFAQs() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
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

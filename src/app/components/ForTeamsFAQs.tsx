'use client'

import Link from 'next/link'
import { useMemo, type ReactNode } from 'react'
import { Container } from '~/components/Container'
import { extractTextFromNode } from '~/lib/utils/extractTextFromNode'
import { FaqAccordionList } from './FaqAccordionList'

const faqs: Array<{ question: string; answer: ReactNode }> = [
  {
    question: 'How does Replay QA connect to my GitHub repository?',
    answer:
      "During project setup you'll be taken through the GitHub authentication flow, where you'll be prompted to install the Replay QA GitHub app and specify which repositories it can monitor. Once the app is added to a repository, it listens for changes like pushes to main or new pull requests. You configure which events trigger a new test run."
  },
  {
    question: 'Can it test our staging or preview environments?',
    answer:
      'Yes. Each project can target dev, staging, production, or localhost — switch environments in settings or configure them via the REST API.'
  },
  {
    question: 'Can Replay QA test my app if it has authentication enabled?',
    answer:
      "Yes. Replay QA can create its own accounts as needed, as long as they're email and password (Google Auth and other OAuth providers won't work). You can also give the agent one or more sets of test account credentials and it will use them, which is great for testing role-specific areas of an app."
  },
  {
    question: 'How does Replay QA handle bot detection, like Cloudflare?',
    answer:
      "This is a tricky one. If you're able to disable bot detection while Replay QA tests your app, that's the recommendation. Otherwise we won't be able to pass that Turing test."
  },
  {
    question: 'Can it test apps running on localhost?',
    answer:
      "Yes. We run a reverse proxy so Replay QA can reach a web app on your machine. Paste your localhost URL during project setup and we'll walk you through the rest."
  },
  {
    question: 'What happens after we fix a bug?',
    answer:
      'The webhook sends a callback URL with every report. POST to it when the fix ships and Replay QA marks the bug resolved, then re-enables that user journey for future runs so you find out immediately if it regresses.'
  },
  {
    question: 'Does Replay QA do security testing?',
    answer:
      "Yes. The Security Scan pass covers the full scope you'd expect from a penetration test: injection vulnerabilities, broken access control, weak authentication, and insecure API behavior. It also reasons about how the app is supposed to work, which lets it surface business logic gaps like IDOR and cross-tenant data exposure — things a generic scanner misses."
  },
  {
    question: 'Can I schedule automated test runs?',
    answer:
      'Yes. In your project settings you can configure daily or weekly runs on a fixed schedule. Teams often set an overnight run so they wake up to a fresh batch of issues, ready for coding agents or a software factory to work through.'
  },
  {
    question: "What's the REST API for?",
    answer:
      'The REST API lets you trigger test runs, switch environments, and retrieve results programmatically. Useful for software factories, CI pipelines, or any workflow where you want Replay QA to run without touching the dashboard.'
  },
  {
    question: 'How much does it cost for a team?',
    answer: (
      <>
        Pricing is based on how many analyses you run each month, not per seat. There&apos;s a free
        tier to try it on a real repo before you decide. See the{' '}
        <Link href="/pricing" className="font-medium text-accent transition hover:opacity-80">
          pricing page
        </Link>{' '}
        for current plans.
      </>
    )
  }
]

export function ForTeamsFAQs() {
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
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
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
          <p className="mt-8 text-center text-sm text-gray-600">
            Want to see how Replay QA fits your stack?{' '}
            <Link href="/how-it-works" className="font-medium text-accent transition hover:opacity-80">
              See how it works
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  )
}

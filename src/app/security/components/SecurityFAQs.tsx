'use client'

import Link from 'next/link'
import { useMemo, type ReactNode } from 'react'
import { Container } from '~/components/Container'
import { extractTextFromNode } from '~/lib/utils/extractTextFromNode'
import { FaqAccordionList } from '~/app/for-teams/components/FaqAccordionList'

const faqs: Array<{ question: string; answer: ReactNode }> = [
  {
    question: 'Why do I need to verify ownership of my app?',
    answer:
      "Security Scan sends real attack traffic — actual injection payloads, crafted requests designed to test access control, probes that look exactly like what an attacker would send. That's what makes it accurate. But it also means we need to be certain you're authorized to test the target. Ownership verification is how we confirm that."
  },
  {
    question: 'How does the ownership verification work?',
    answer:
      "You serve a short plain-text file from your app at a specific path. Only someone with access to the app's codebase can do that, which is all the confirmation we need. We provide a prompt you can paste directly into your coding agent to set it up — it takes about a minute."
  },
  {
    question: 'What vulnerability classes does Security Scan cover?',
    answer:
      "Injection flaws (SQL injection, XSS, command injection), broken access control, weak or bypassable authentication, insecure API behavior, Insecure Direct Object Reference (IDOR), and cross-tenant data exposure. These are the classes most commonly introduced by AI coding agents — not because the models are reckless, but because they optimize for functionality and don't apply the security intuition that comes from experience."
  },
  {
    question: 'Does Security Scan send real attack traffic to my app?',
    answer:
      "Yes. That's what makes it accurate. Security Scan doesn't guess from source code — it drives your running app the way an attacker would. It sends actual payloads, crafts requests that test your access control logic, and confirms that vulnerabilities are real and exploitable before it reports them. This is why ownership verification is required."
  },
  {
    question: 'Can I run Security Scan against a staging environment?',
    answer:
      "Yes, and we recommend it. Staging is the ideal target — it's a realistic environment without production data at risk. Ownership verification applies to whichever environment you're testing, so you'll verify that domain specifically."
  },
  {
    question: 'How is this different from a tool like Burp Suite or OWASP ZAP?',
    answer:
      "Burp Suite and ZAP are tools for security engineers — they require expertise to configure, interpret, and act on. Security Scan is autonomous: it explores your app on its own, interprets what it finds in the context of how your app is supposed to work, and writes findings your coding agent can fix directly. No security background required."
  },
  {
    question: 'Does Security Scan replace a manual pen test?',
    answer:
      "For most AI-built apps, it gives you more coverage than you'd otherwise have — at a fraction of the cost and on a continuous basis. A manual pen test from a qualified firm goes deeper in some areas (particularly business logic and social engineering), but it runs once a year if you're lucky, costs tens of thousands of dollars, and takes weeks to schedule. Security Scan runs on every build."
  },
  {
    question: 'How much does Security Scan cost?',
    answer: (
      <>
        Security Scan runs are billed the same way as standard QA passes — credits consumed depend
        on the complexity of your app, not the scan type. There&apos;s a free tier to try it before
        you decide.{' '}
        <Link href="/pricing" className="font-medium text-accent transition hover:opacity-80">
          See pricing
        </Link>
        .
      </>
    )
  }
]

export function SecurityFAQs() {
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
            Questions about how it works?{' '}
            <Link href="/how-it-works" className="font-medium text-accent transition hover:opacity-80">
              See the full breakdown
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  )
}

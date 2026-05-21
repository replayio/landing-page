'use client'

import { Container } from '~/components/Container'

type FAQ = {
  q: string
  a: string
  linkText?: string
  linkBefore?: string
}

const faqs: FAQ[] = [
  {
    q: 'What kinds of apps can Loop QA test?',
    a: 'Any web app accessible via a URL — marketing sites, SaaS products, internal tools, or all of the above. Loop QA explores whatever is at the URL you provide.'
  },
  {
    q: 'Do I need to write any tests or config?',
    a: "No. Loop QA discovers user journeys and writes Playwright tests automatically. You provide a URL — it takes care of everything else."
  },
  {
    q: 'What does a bug report include?',
    a: 'Every bug comes with a Replay recording of the session, a full runtime breakdown (function calls, DOM mutations, network requests, state changes), a root-cause analysis with confidence score, and a suggested fix.'
  },
  {
    q: 'Can I integrate Loop QA into my existing agentic system?',
    linkBefore:
      "Absolutely. If you've built a software factory, a vibecoding platform, or want to include Loop QA in your software development life cycle, ",
    linkText: "let's talk",
    a: '.'
  },
  {
    q: 'How is this different from a traditional test suite?',
    a: "A traditional test suite only checks what engineers explicitly wrote tests for. Loop QA explores your app autonomously, discovers flows you didn't anticipate, and catches bugs that never would have had a test written against them."
  },
  {
    q: 'How much does Loop QA cost?',
    linkBefore: "For casual use, it is completely free. If you'd like to use Loop QA at scale, ",
    linkText: "let's talk",
    a: '.'
  },
  {
    q: 'Does Loop QA replace human QA teams?',
    a: "For most of our users, there's no human QA team to replace — Loop QA is the only QA layer they have. For teams that do have QA, Loop QA handles the autonomous discovery work: exploring the app, finding the broken flows, and filing the bug reports. That frees human QA to focus on what actually needs human judgment: subjective UX calls, accessibility audits with real assistive tech, and sign-off on high-stakes releases."
  },
  {
    q: 'How do I get started?',
    a: 'Head to loop-qa.replay.io, drop in a URL, and Loop QA gets to work. No setup, no credit card required to try it.'
  }
]

export function LoopQAFAQs() {
  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-3xl">
        <h2 className="mb-10 text-center font-display text-3xl font-bold tracking-tight text-gray-900">
          Common questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-gray-900 transition hover:text-gray-700 [&::-webkit-details-marker]:hidden">
                {faq.q}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="flex-shrink-0 stroke-gray-400 transition-transform group-open:rotate-45"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M8 3v10M3 8h10" />
                </svg>
              </summary>
              <div className="border-t border-gray-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-gray-500">
                {faq.linkText ? (
                  <>
                    {faq.linkBefore}
                    <a href="mailto:sales@replay.io" className="text-accent transition hover:opacity-80">
                      {faq.linkText}
                    </a>
                    {faq.a}
                  </>
                ) : (
                  faq.a
                )}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}

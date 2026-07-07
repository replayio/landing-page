import Link from 'next/link'
import { Container } from '~/components/Container'

const cases = [
  {
    title: 'Replay for CI',
    description:
      'Already running Playwright or Cypress? Replay QA records every test run, analyzes every failure, and posts root cause and fix to your PR automatically.',
    cta: { label: 'Learn more', href: '/how-it-works' }
  },
  {
    title: 'Replay QA API',
    description:
      'Building a software factory or AI coding platform? Embed Replay QA as a quality gate via API. Every app your system generates gets tested before it ships.',
    cta: { label: 'Talk to us', href: 'mailto:sales@replay.io' }
  }
]

export function QAUseCases() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-gray-500">Also available</p>
          <h2 className="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl">
            Use Replay QA wherever AI is shipping code
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          {cases.map((c) => (
            <div
              key={c.title}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-6"
            >
              <h3 className="text-base font-semibold text-gray-900">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{c.description}</p>
              <Link
                href={c.cta.href}
                className="mt-4 text-sm font-medium text-accent transition-opacity hover:opacity-80"
              >
                {c.cta.label} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

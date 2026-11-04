import Link from 'next/link'
import { Container } from '~/components/Container'

const usual = [
  'Hire or contract more testers as the client list grows',
  'Write and maintain a separate test suite for every client',
  'Bugs surface in UAT, or after launch',
  'QA time quietly absorbed into fixed-bid margins'
]

const withReplay = [
  'Priced on the analyses you run, not on seats',
  'No test suite to write or keep up to date',
  'Bugs caught on the pull request, before the client sees the build',
  'A free tier to prove it out on a real client project first'
]

export function CostSection() {
  return (
    <section className="relative isolate overflow-hidden border-y border-accent/15 bg-accent/[0.04] py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              Save Time &amp; Money
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              More clients shouldn&apos;t mean a bigger QA bill.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Manual testing costs rise with every client you sign. Whether you have limited QA
              resources, or haven&apos;t hired them yet, Replay QA enables you to do much more with
              way less.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Scaling QA the usual way
              </h3>
              <ul className="mt-5 space-y-3">
                {usual.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-600">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-accent bg-white p-6 shadow-[0_6px_18px_rgba(240,45,94,0.12)] sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
                With Replay QA
              </h3>
              <ul className="mt-5 space-y-3">
                {withReplay.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-900">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            <Link href="/pricing" className="font-medium text-accent transition hover:opacity-80">
              See plans
            </Link>{' '}
            or{' '}
            <Link
              href="/roi-calculator"
              className="font-medium text-accent transition hover:opacity-80"
            >
              estimate what it saves your team
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  )
}

import { Container } from '~/components/Container'

export function AboutWhereWereGoing() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">
            Where we&apos;re going
          </p>
          <div className="mt-6 space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            <p>
              Today, the way software gets built has fundamentally changed. AI agents write code,
              spin up apps, and iterate faster than any human team could. But speed without
              visibility creates a new problem: apps ship with bugs nobody caught, because nobody
              was watching.
            </p>
            <p>
              That&apos;s the gap Replay QA was built to close.{' '}
              <strong className="font-semibold text-gray-900">
                Replay QA autonomously explores your app, records every session, and surfaces real
                bugs with root causes and suggested fixes
              </strong>{' '}
              — before your users find them.
            </p>
            <p>
              We&apos;ve built Replay QA to work alongside your coding agent. Drop in a URL for
              on-demand testing, or connect a GitHub repo for a continuous quality gate that runs
              every time you ship. Either way, bugs are caught, analyzed, and handed back to your
              agent to fix — automatically.
            </p>
            <p>
              We&apos;re building toward a world where shipping broken software is the exception,
              not the rule — where every app gets tested, every bug gets caught, and{' '}
              <strong className="font-semibold text-gray-900">
                no user ever hits a problem that could have been found first.
              </strong>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

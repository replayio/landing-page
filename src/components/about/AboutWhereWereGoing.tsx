import { Container } from '~/components/Container'

export function AboutWhereWereGoing() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">Where we&apos;re going</p>
          <div className="mt-6 space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            <p>
              Today, AI agents write code faster than any human. But when a test fails in CI,
              they&apos;re stuck — guessing at fixes with no way to see what went wrong at runtime.
              They loop, retry, and burn through tokens on the same mistake.
            </p>
            <p>
              So we gave the time machine to the agent.{' '}
              <strong className="font-semibold text-gray-900">
                Replay now enables your coding agent to time-travel through recordings and fix failing
                tests without human intervention.
              </strong>{' '}
              It turns out they&apos;re way better at it anyway — no fatigue, no missed details, no
              wrong turns.
            </p>
            <p>
              The Replay CI Agent watches every PR. When a test fails, it records the full runtime,
              analyzes the execution, and posts the root cause plus a specific fix as a PR comment.
              Replay MCP brings the same time-travel capability directly into your IDE, where your
              coding agent already works.
            </p>
            <p>
              We&apos;re building toward a world where every test failure comes with a root cause,
              every broken PR gets a fix, and no one — human or AI —{' '}
              <strong className="font-semibold text-gray-900">has to debug blind.</strong>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

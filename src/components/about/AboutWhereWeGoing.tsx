import { Container } from '~/components/Container'

export function AboutWhereWeGoing() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent">
            Where we&apos;re going
          </h2>
          <div className="mt-6 space-y-6 text-base leading-relaxed text-gray-600 sm:text-lg">
            <p>
              Today, AI agents write code faster than any human. But when they hit a bug, they&apos;re
              stuck — guessing at fixes with no way to see what went wrong. They loop, retry, and
              burn through tokens on the same mistake.
            </p>
            <p>
              Replay gives agents eyes on the runtime. Our MCP server analyzes recordings
              automatically, finds the root cause, and delivers a specific fix — so your agent
              implements the right solution on the first try.
            </p>
            <p>
              For developers, that means fewer debugging hours and faster CI. For builders using
              tools like Lovable, Bolt, and Replit, it means bugs that actually get fixed instead
              of going in circles.
            </p>
            <p>
              We&apos;re building toward a world where every bug report includes a recording, every
              test failure comes with a root cause, and no one — human or AI — has to debug blind.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

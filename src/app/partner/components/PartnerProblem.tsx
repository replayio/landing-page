import { Container } from '~/components/Container'

export function PartnerProblem() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl md:text-5xl">
            Your agent is only as good as{' '}
            <span className="text-accent">what it can see.</span>
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            <p>
              Coding agents are getting genuinely good at writing code. But when something breaks at
              runtime — a flaky test, a race condition, a bug that only happens in production —
              they&apos;re flying blind. No DOM state. No network timing. No component tree. Just
              your codebase and a guess.
            </p>
            <p>
              Replay MCP closes that gap. It gives your agent the browser runtime context it needs
              to diagnose bugs precisely — and fix them the first time.{' '}
              <strong className="font-semibold text-gray-900">
                We&apos;re looking for engineering teams who want to help us make that experience as
                useful as possible.
              </strong>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

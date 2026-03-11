import { Container } from '~/components/Container'

export function AgentProblem() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Your agent reads code.
            <br />
            <span className="text-accent">It can&apos;t read the runtime.</span>
          </h2>

          <div className="mt-12 space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            <p>
              A test fails. A user hits a bug. Your agent takes a guess at the fix, pushes it, and
              the same test fails again. Without runtime context, agents are stuck in a loop —
              guessing, patching, retrying.
            </p>
            <p>
              The problem isn&apos;t the agent. It&apos;s that the agent has no way to see what
              actually happened in the browser. No DOM state, no network timing, no component
              re-renders.{' '}
              <strong className="font-semibold text-gray-900">
                It&apos;s debugging blind.
              </strong>
            </p>
            <p>
              You end up pulling the agent aside, opening DevTools yourself, and spending an hour
              doing the work manually. The whole point of the agent was to save you that time.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

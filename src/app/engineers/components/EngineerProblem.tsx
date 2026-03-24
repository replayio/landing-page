import { Container } from '~/components/Container'

export function EngineerProblem() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            The problem isn&apos;t your agent.{' '}
            <span className="text-accent">It&apos;s what your agent can&apos;t see.</span>
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            <p>
              Coding agents are genuinely good at writing code. But they have no runtime visibility.
              They can read your codebase — they can&apos;t see what happened in the browser when
              something broke.
            </p>
            <p>
              No DOM state. No network timing. No component re-renders. Without that context, an
              agent can only guess.{' '}
              <strong className="font-semibold text-gray-900">
                Replay solves the context problem.
              </strong>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

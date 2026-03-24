import { Container } from '~/components/Container'

const useCases = [
  {
    title: 'Failing tests in CI',
    description:
      'Your test suite has a flake that fails one in ten runs and nobody can reproduce it locally. Replay records every CI run. When it flakes, Replay MCP analyzes the recording and delivers the root cause to your agent — no manual investigation.'
  },
  {
    title: "User-reported bugs you can't reproduce",
    description:
      "A user reports something broken. You can't reproduce it locally. Replay captures the user's session, analyzes it, and surfaces the exact conditions that caused the failure."
  },
  {
    title: 'Agents stuck in a loop',
    description:
      'Your agent keeps retrying the same patch against the same failing test. Replay gives it the runtime context to break the loop — and ship the actual fix.'
  }
]

export function EngineerUseCases() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Built for the bugs that cost you the most time.
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Three scenarios where Replay pays for itself immediately.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="rounded-xl border border-gray-200 bg-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">{useCase.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

import { Container } from '~/components/Container'

const useCases = [
  {
    title: 'Agent-assisted development',
    description:
      'Your coding agent hits a failing test or runtime error. Instead of looping, it sends the recording to Replay and gets a precise fix back — then implements it.',
  },
  {
    title: 'Flaky tests in CI',
    description:
      'Record every test run. When a test flakes, Replay analyzes the recording and delivers the root cause and fix to your agent — no manual investigation needed.',
  },
  {
    title: 'Bug triage on autopilot',
    description:
      'A user reports a bug. Replay captures the session, generates the diagnosis and fix. Your agent applies it. You review the PR.',
  },
  {
    title: 'Unblocking stuck agents',
    description:
      'When your agent loops on a problem — retrying the same patch, failing the same test — Replay gives it the runtime context it needs to break out.',
  },
]

export function BuiltForTeams() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Built for teams shipping with agents
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Wherever your agent gets stuck on a bug it can&apos;t see, Replay closes the gap.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
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

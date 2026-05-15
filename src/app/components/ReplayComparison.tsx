import { Container } from '~/components/Container'

const withoutReplay = [
  'Test fails → read error message, guess at cause',
  'Root cause requires manual reproduction, console logs, trial and error',
  '30 min to 2+ hours per failure',
  'Flaky tests get marked as flaky, ignored, accumulate',
  'PRs blocked, CI re-runs burn time and money',
  'Requires deep codebase knowledge to investigate'
]

const withReplay = [
  'Test fails → agent traces exact failure sequence',
  'Root cause identified automatically with confidence score',
  'Fix suggestion posted in minutes',
  'Each failure investigated individually with runtime evidence',
  'Developer reads comment, applies fix, merges',
  'Zero investigation effort — agent does the work'
]

export function ReplayComparison() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            With Replay CI Agent vs. without
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">Without Replay</p>
            <ul className="mt-6 space-y-4">
              {withoutReplay.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-gray-700 sm:text-base">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-purple-200 bg-violet-50/80 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
              With Replay CI Agent
            </p>
            <ul className="mt-6 space-y-4">
              {withReplay.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

import { Container } from '~/components/Container'

const withoutReplay = [
  'Agent guesses at the fix, fails, retries in a loop',
  'You step in to debug manually with DevTools',
  'Flaky tests get retried and ignored',
  'Bug reports sit in the backlog waiting for someone to reproduce them',
  "Agents write code fast but can't debug what they break",
]

const withReplay = [
  'Agent gets a detailed fix from the recording on the first try',
  'You review the PR instead of opening DevTools',
  'Flaky tests get diagnosed and fixed automatically',
  'Bug reports get a recording, analysis, and fix in minutes',
  'Agents ship fixes as fast as they ship features',
]

export function ReplayComparison() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Replay vs. the old way
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Without Replay */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">
              Without Replay
            </p>
            <ul className="mt-6 space-y-4">
              {withoutReplay.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-gray-700 sm:text-base">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* With Replay */}
          <div className="rounded-xl border border-purple-200 bg-gray-100 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
              With Replay
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

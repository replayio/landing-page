import { Container } from '~/components/Container'

const columns = [
  'Playwright + a browser agent',
  'Your coding agent checking its own work',
  'Replay QA'
]

const rows: Array<{ label: string; cells: [string, string, string] }> = [
  {
    label: 'What gets tested',
    cells: [
      'The flows someone wrote tests for, or prompted the agent to try',
      'Whatever the agent thinks to check',
      'User journeys it discovers on its own, including flows nobody specified'
    ]
  },
  {
    label: 'What it sees',
    cells: [
      'The DOM and screenshots',
      'Its own code, and sometimes a screenshot',
      'A deterministic recording of the runtime: network requests, state, console and renders'
    ]
  },
  {
    label: 'When something fails',
    cells: [
      'A failed assertion or a screenshot of the symptom',
      'Another guess at a fix',
      'The root cause, traced through the recording, with a suggested fix'
    ]
  },
  {
    label: 'Independence',
    cells: [
      'Only as good as the tests it was given',
      'Shares the blind spots of the code it wrote',
      "An independent check: the writer doesn't grade its own work"
    ]
  },
  {
    label: 'Proving the fix',
    cells: [
      'Re-run the test, if one exists',
      "The agent reports that it's fixed",
      'Replays the journey that found the bug against the fix'
    ]
  }
]

export function CompareSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-50 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-bold uppercase tracking-wider text-accent">
            Why it&apos;s different
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Isn&apos;t this just Playwright with a browser agent? Why can&apos;t my coding agent do
            it?
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-gray-600">
            Browser agents and coding agents can tell you that something looks wrong. Replay QA
            records the runtime, so it can tell you why, and prove when it&apos;s fixed.
          </p>

          <div className="mt-10 hidden overflow-hidden rounded-xl border border-gray-200 bg-white md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="w-[20%] px-5 py-3.5" />
                  {columns.map((c, i) => (
                    <th
                      key={c}
                      className={`px-5 py-3.5 align-bottom text-xs font-semibold uppercase tracking-wider ${i === 2 ? 'bg-accent/5 text-accent' : 'text-gray-500'}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className="px-5 py-4 text-left align-top font-semibold text-gray-900"
                    >
                      {row.label}
                    </th>
                    {row.cells.map((cell, i) => (
                      <td
                        key={i}
                        className={`px-5 py-4 align-top leading-relaxed ${i === 2 ? 'bg-accent/5 font-medium text-gray-900' : 'text-gray-600'}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col gap-4 md:hidden">
            {rows.map((row) => (
              <div key={row.label} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-gray-900">{row.label}</h3>
                <dl className="mt-3 space-y-3 text-sm">
                  {row.cells.map((cell, i) => (
                    <div key={i} className={i === 2 ? 'rounded-lg bg-accent/5 p-3' : ''}>
                      <dt
                        className={`text-xs font-semibold uppercase tracking-wider ${i === 2 ? 'text-accent' : 'text-gray-500'}`}
                      >
                        {columns[i]}
                      </dt>
                      <dd
                        className={`mt-1 leading-relaxed ${i === 2 ? 'text-gray-900' : 'text-gray-600'}`}
                      >
                        {cell}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

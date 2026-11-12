import { Container } from '~/components/Container'

const rows: Array<[string, string, string]> = [
  [
    'What you get',
    'A video of what the user saw',
    'The root cause, with the runtime evidence behind it'
  ],
  [
    'Where it comes from',
    'A reconstruction of the page in the user’s browser',
    'A deterministic recording of the whole runtime: DOM, network, and JavaScript'
  ],
  ['Who does the work', 'Someone watches, reproduces, and debugs', 'Replay QA, automatically'],
  [
    'What happens next',
    'A ticket that says “button broken?”',
    'A report your coding agent can act on'
  ]
]

export function WhyReplaySection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              How It&apos;s Different
            </p>
            <h2 className="mt-3 text-balance text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Session replay shows you the symptom. Replay QA finds the cause.
            </h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              Replay QA reproduces the problem in its instrumented Chromium browser and records
              every DOM change, network call and JavaScript frame, so the diagnosis comes from what
              actually executed, not a guess from a video.
            </p>
          </div>
          {/* Below md the table would push the Self-healing column off-screen, so each row stacks. */}
          <dl className="mt-10 flex flex-col gap-3 md:hidden">
            {rows.map(([label, before, after]) => (
              <div
                key={label}
                className="overflow-hidden rounded-xl border border-gray-200 text-sm"
              >
                <dt className="bg-gray-50 px-4 py-2.5 font-semibold text-gray-900">{label}</dt>
                <dd className="px-4 py-3 text-gray-600">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Session replay alone
                  </span>
                  {before}
                </dd>
                <dd className="bg-accent/[0.04] px-4 py-3 text-gray-900">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-accent">
                    With Self-healing Mode
                  </span>
                  {after}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 hidden overflow-hidden rounded-xl border border-gray-200 md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th scope="col" className="w-1/4 px-5 py-3 font-semibold text-gray-500" />
                  <th scope="col" className="px-5 py-3 font-semibold text-gray-900">
                    Session replay alone
                  </th>
                  <th scope="col" className="bg-gray-900 px-5 py-3 font-semibold text-white">
                    With Self-healing Mode
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map(([label, before, after]) => (
                  <tr key={label}>
                    <th scope="row" className="px-5 py-4 font-semibold text-gray-900">
                      {label}
                    </th>
                    <td className="px-5 py-4 leading-relaxed text-gray-600">{before}</td>
                    <td className="bg-accent/[0.04] px-5 py-4 leading-relaxed text-gray-900">
                      {after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  )
}

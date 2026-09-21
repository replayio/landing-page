import { Container } from '~/components/Container'

const reviewLayers = [
  {
    layer: 'AI code review',
    inspects: 'The diff',
    cannotTell: 'Whether the changed flow works in the running app',
    isRuntime: false
  },
  {
    layer: 'Unit and integration tests',
    inspects: 'The journeys someone thought to assert',
    cannotTell: 'The flows nobody wrote a test for',
    isRuntime: false
  },
  {
    layer: 'Replay QA',
    inspects: 'The running app and its user journeys',
    cannotTell: 'It adds runtime evidence. It does not replace the other layers.',
    isRuntime: true
  }
]

export function VerifyLayerSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">
            Runtime verification
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            The missing layer is runtime verification.
          </h2>
          <p className="mt-6 leading-relaxed text-gray-600">
            Code review and tests should stay in the pipeline. Replay QA adds the question they
            cannot answer on their own: did the changed user flow work in the running application?
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 pr-6 text-left font-semibold text-gray-900">Layer</th>
                  <th className="pb-3 pr-6 text-left font-semibold text-gray-900">
                    What it inspects
                  </th>
                  <th className="pb-3 text-left font-semibold text-gray-900">
                    What it cannot tell you
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reviewLayers.map((row) => (
                  <tr key={row.layer} className={row.isRuntime ? 'bg-accent/5' : ''}>
                    <td
                      className={[
                        'py-3.5 pr-6 align-top font-medium',
                        row.isRuntime ? 'text-accent' : 'text-gray-800'
                      ].join(' ')}
                    >
                      {row.layer}
                    </td>
                    <td
                      className={[
                        'py-3.5 pr-6 align-top',
                        row.isRuntime ? 'text-gray-800' : 'text-gray-600'
                      ].join(' ')}
                    >
                      {row.inspects}
                    </td>
                    <td className="py-3.5 align-top text-gray-600">{row.cannotTell}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Keep the product knowledge. Stop maintaining the generic harness.
            </h3>
            <p className="mt-3 leading-relaxed text-gray-600">
              Keep the app-specific assertions that encode how your product should work. Let Replay
              QA handle the reusable runtime work around discovery, recording, triage, and evidence.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

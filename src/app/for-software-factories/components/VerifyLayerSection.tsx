import Link from 'next/link'
import { Container } from '~/components/Container'

const reviewLayers = [
  {
    layer: 'AI code review',
    inspects: 'The diff',
    cannotTell: 'Whether the app works',
    isRuntime: false
  },
  {
    layer: 'Adversarial model review',
    inspects: 'Intent versus implementation in code',
    cannotTell: 'What happens at runtime',
    isRuntime: false
  },
  {
    layer: 'Static security analysis',
    inspects: 'Code paths and data flow',
    cannotTell: 'Whether a finding is exploitable',
    isRuntime: false
  },
  {
    layer: 'Unit and integration tests',
    inspects: 'What someone thought to assert',
    cannotTell: 'The flows nobody wrote a test for',
    isRuntime: false
  },
  {
    layer: 'Runtime verification',
    inspects: 'The running app',
    cannotTell: ' ',
    isRuntime: true
  }
]

const harnessRows = [
  {
    yours: 'Starts the app, signs in, and exercises the changed workflow',
    replayQA: 'Discovers and verifies journeys without test authorship'
  },
  {
    yours: 'Checks browser errors and data writes',
    replayQA: 'Finds runtime failures and captures the evidence'
  },
  {
    yours: 'Captures evidence for review',
    replayQA: 'Attaches a deterministic recording to the report'
  },
  {
    yours: 'Crawls product flows on a schedule',
    replayQA: 'Runs from your existing trigger model or schedule'
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
            Your reviewers can read the code. Replay QA runs the app.
          </h2>
          <p className="mt-6 leading-relaxed text-gray-600">
            Code review, static analysis, and tests are useful layers. They still leave one question
            unanswered: did the changed flow work in the running application?
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

          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 text-sm leading-relaxed text-gray-600">
            In Web Debug Bench, the same agent resolved{' '}
            <span className="font-semibold text-gray-900">76%</span> of 177 agent-built-app bugs
            with runtime access to the failing session, versus{' '}
            <span className="font-semibold text-gray-900">61%</span> with code alone.{' '}
            <Link
              href="https://blog.replay.io/web-debug-bench"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent transition hover:opacity-80"
            >
              Read Web Debug Bench →
            </Link>
          </div>

          <div className="mt-16 border-t border-gray-200 pt-16">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              Owned versus bought
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Keep the product knowledge. Stop maintaining the generic harness.
            </h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              An in-house harness is the right design when it captures product-specific assertions.
              The maintenance burden comes from the reusable runtime-verification work around it.
            </p>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 pr-6 text-left font-semibold text-gray-900">
                      What your harness does
                    </th>
                    <th className="pb-3 text-left font-semibold text-accent">Replay QA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {harnessRows.map((row) => (
                    <tr key={row.yours}>
                      <td className="py-3.5 pr-6 align-top text-gray-600">{row.yours}</td>
                      <td className="py-3.5 align-top text-gray-800">{row.replayQA}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-8 leading-relaxed text-gray-600">
              Keep the assertions that encode your product knowledge. Let Replay QA carry the
              generic work around discovery, recording, triage, and evidence.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

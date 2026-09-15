import Link from 'next/link'
import { Container } from '~/components/Container'
import { AutoplayVideo } from '~/app/for-teams/components/AutoplayVideo'

const reviewLayers = [
  {
    layer: 'AI code review (CodeRabbit, Qodo, cold-read model passes)',
    inspects: 'The diff',
    cannotTell: 'Whether the app works',
    isRuntime: false
  },
  {
    layer: 'Adversarial model review',
    inspects: 'Intent vs. implementation, in code',
    cannotTell: 'What happens at runtime',
    isRuntime: false
  },
  {
    layer: 'Static security analysis (SAST)',
    inspects: 'Code paths and data flow',
    cannotTell: 'Whether the vulnerability is actually exploitable',
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
    cannotTell: '—',
    isRuntime: true
  }
]

const harnessRows = [
  {
    yours: 'Starts the real app, signs in, exercises the changed workflow',
    replayQA: 'Autonomous journey discovery on every main-branch update or PR — no test authorship'
  },
  {
    yours: 'Checks browser errors and data writes',
    replayQA:
      'Runtime bug detection: component failures, state mutations, race conditions, async timing'
  },
  {
    yours: 'Captures before/after evidence for the reviewer',
    replayQA: 'Full deterministic Chromium recording of the failing session, attached to the PR'
  },
  {
    yours: 'Crawls product flows on a schedule',
    replayQA: 'Scheduled daily or weekly runs, producing a prioritized queue'
  },
  {
    yours: 'No evidence → the change stays unready',
    replayQA: 'The GitHub app is the gate — the report posts to the PR and syncs to your tracker'
  }
]

export function VerifyLayerSection() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">The gap</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Every reviewer you added reads the code
            </h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              Look at what&apos;s actually in your verify stage. A model reviewing the diff cold. An
              adversarial pass from a different model on high-risk changes. Static security analysis
              tracing data flow through sensitive modules. Unit and integration tests. Every one of
              them is excellent. Every one of them is reading source code.
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
                      What it can&apos;t tell you
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
                      <td
                        className={[
                          'py-3.5 align-top',
                          row.isRuntime ? 'text-gray-400' : 'text-gray-600'
                        ].join(' ')}
                      >
                        {row.cannotTell}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-8 font-medium text-gray-900">
              The only layer that answers &ldquo;does it work&rdquo; is the only layer you had to
              build yourself.
            </p>

            <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 shadow-lg">
              <AutoplayVideo
                src="/verify-layers.mp4"
                label="Runtime verification layer stack animation"
              />
            </div>

            <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-600">
              We benchmarked the gap. On 177 real bugs in agent-built web apps, an agent with
              runtime access to the failing session solved{' '}
              <span className="font-semibold text-gray-900">76%</span> — against{' '}
              <span className="font-semibold text-gray-900">61%</span> for the same agent reading
              code alone.{' '}
              <Link
                href="https://blog.replay.io/web-debug-bench"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent transition hover:opacity-80"
              >
                Web Debug Bench →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-gray-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              Owned vs. bought
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              You wrote a browser verification harness. Now you own it.
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
              <p>
                The shape is always roughly the same. It starts the real application. It signs in.
                It exercises the workflow that changed. It checks browser errors and whether the
                data actually got written. It captures before-and-after evidence, because a reviewer
                approving a change they can&apos;t see is guessing. And the rule that makes it work:
                if the evidence can&apos;t be produced, the change isn&apos;t ready.
              </p>
              <p className="font-medium text-gray-900">
                It&apos;s the right design. It&apos;s also a product.
              </p>
            </div>

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
                  {harnessRows.map((row, i) => (
                    <tr key={i}>
                      <td className="py-3.5 pr-6 align-top text-gray-600">{row.yours}</td>
                      <td className="py-3.5 align-top text-gray-800">{row.replayQA}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 space-y-4 leading-relaxed text-gray-600">
              <p>
                Browser drivers. Auth flows that change. Flake triage. Environment drift. Screenshot
                diffing that has to be good enough to trust. Every improvement to the harness is
                engineering time that isn&apos;t going into your product — and the harness is never
                finished, because your app keeps changing underneath it.
              </p>
              <p>
                Is runtime verification infrastructure you want to own, or infrastructure you want
                to buy? You&apos;d almost certainly buy your error monitoring. You didn&apos;t write
                your own model APIs. This is the same class of decision, and it&apos;s the last one
                still sitting on your side of the line.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

import { Container } from '~/components/Container'
import { AutoplayVideo } from '~/app/for-teams/components/AutoplayVideo'

const stages = [
  { label: 'Intake', accent: false },
  { label: 'Triage', accent: false },
  { label: 'Build', accent: false },
  { label: 'Verify', accent: true },
  { label: 'Close loop', accent: false }
]

const bottlenecks = [
  {
    label: 'Writing code.',
    body: 'Solved first, and it turned out not to be the constraint.'
  },
  {
    label: 'Doing the right work.',
    body: 'Agents will build precisely the wrong thing at speed. Triage rubrics fix this.'
  },
  {
    label: 'Running enough work in parallel.',
    body: 'Sandboxes and concurrent workers fix this.'
  },
  {
    label: 'Trusting the output.',
    body: 'Nothing you can buy fixes this, so you built something.'
  }
]

export function FactoryArchitectureSection() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              The architecture
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Everyone who builds one arrives at the same five stages
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
              <p>
                Signals come in — support threads, customer feedback, production errors. Something
                triages them: clarifies intent, gathers context, holds the work that isn&apos;t
                ready. Agents build inside the patterns your codebase already has. Something
                verifies the result. Then the loop closes: the outcome gets reported back, and what
                you learned shapes the next decision.
              </p>
              <p>
                Teams reach this architecture independently, without comparing notes, because
                it&apos;s what the work demands. Intake, triage, build, and close-the-loop can be
                assembled from things that already exist — issue trackers, error monitoring, model
                APIs, your own orchestration code.
              </p>
              <p className="font-medium text-gray-900">
                Verify is the one stage where you had to build the machine yourself.
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 shadow-lg">
              <AutoplayVideo
                src="/factory-pipeline.mp4"
                label="Five-stage software factory pipeline animation"
              />
            </div>

            <div className="mt-8 flex items-stretch gap-0 overflow-hidden rounded-xl border border-gray-200">
              {stages.map((stage, i) => (
                <div
                  key={stage.label}
                  className={[
                    'flex flex-1 flex-col items-center justify-center px-2 py-5 text-center text-sm font-semibold',
                    stage.accent ? 'bg-accent text-white' : 'bg-gray-50 text-gray-700',
                    i > 0 ? 'border-l border-gray-200' : ''
                  ].join(' ')}
                >
                  <span
                    className={[
                      'text-[11px] font-bold uppercase tracking-wider',
                      stage.accent ? 'text-white/70' : 'text-gray-400'
                    ].join(' ')}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-1">{stage.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-gray-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">The bottleneck</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              The bottleneck moved four times. It&apos;s not where you started.
            </h2>

            <div className="mt-10 flex flex-col gap-6">
              {bottlenecks.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className={[
                      'mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold',
                      i < 3
                        ? 'bg-gray-200 text-gray-500 line-through'
                        : 'border border-accent/30 bg-accent/10 text-accent'
                    ].join(' ')}
                  >
                    {i < 3 ? '✓' : String(i + 1)}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">{item.label}</span>{' '}
                    <span className="text-gray-600">{item.body}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 border-l-4 border-accent pl-5">
              <p className="text-lg font-semibold italic text-gray-900">
                Code can be clean, fully tested, and wrong.
              </p>
            </div>

            <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
              <p>
                Parallel agents don&apos;t just produce more code. They produce more code than any
                fixed number of humans can hold in their heads. Hundreds of pull requests a month
                arrive at a review capacity that hasn&apos;t changed. Every reviewer you add — a
                second model, a cold-read pass, an adversarial reviewer on the risky changes — buys
                throughput against the same fundamental limit.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

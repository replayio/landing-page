import { Container } from '~/components/Container'

const steps = [
  {
    step: 1,
    title: 'A test fails. The agent loops.',
    description:
      "Your coding agent hits a runtime error and has no way to see what's actually happening in the browser. It patches. It retries. Same failure.",
    imagePlaceholder: 'Step 1 image coming soon',
  },
  {
    step: 2,
    title: 'Replay records and finds the root cause.',
    description:
      'Replay records a deterministic capture of the browser session — every DOM change, network request, component state. Then it analyzes the recording automatically.',
    imagePlaceholder: 'Step 2 image coming soon',
  },
  {
    step: 3,
    title: 'Your agent receives a specific, implementation-ready fix.',
    description:
      'Not "check your async logic." The exact file, function, and change — with full context. Your agent implements it. You review the PR.',
    imagePlaceholder: 'Step 3 image coming soon',
  },
]

export function BugToFix() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            From bug to fix — in under a minute.
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            See how Replay turns a failing test into a shipped fix, end to end.
          </p>
        </div>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {steps.map((step, index) => {
            const isEven = index % 2 === 1
            return (
              <div
                key={step.step}
                className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Text */}
                <div className="flex-1">
                  <p className="text-sm font-bold uppercase tracking-wider text-accent">
                    Step {step.step}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                    {step.description}
                  </p>
                </div>

                {/* Image placeholder */}
                <div className="flex-1">
                  <div className="flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-lg">
                    <p className="text-sm font-medium text-gray-400">
                      {step.imagePlaceholder}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

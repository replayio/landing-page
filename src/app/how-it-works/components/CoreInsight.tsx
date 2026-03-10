import { Container } from '~/components/Container'

const steps = [
  { number: 1, title: 'Browser session', subtitle: 'A bug occurs in the browser' },
  { number: 2, title: 'Replay Recording', subtitle: 'Every detail is captured' },
  { number: 3, title: 'Agent gets context', subtitle: 'Root cause is identified' },
  { number: 4, title: 'Fix shipped', subtitle: 'Your agent applies the fix' },
]

export function CoreInsight() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="w-full max-w-5xl mx-auto text-center">
          <p className="text-sm font-bold upp ercase tracking-wider text-accent">
            The core insight
          </p>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Replay captures what actually happened.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            Not logs. Not stack traces. A deterministic recording of every DOM change, network
            request, and state update — the full runtime picture your agent has never had access to
            before.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
              <div className="flex flex-col items-center lg:items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent/30 bg-white text-sm font-bold text-accent">
                  {step.number}
                </div>
              </div>
              <div className="flex-1 rounded-xl border border-gray-200 bg-white p-4 lg:mt-4 lg:w-full">
                <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{step.subtitle}</p>
              </div>
              {index < steps.length - 1 && (
                <span className="absolute right-0 top-5 hidden translate-x-[calc(50%+8px)] text-gray-300 lg:block">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

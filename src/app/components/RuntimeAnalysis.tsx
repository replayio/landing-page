import { Container } from '~/components/Container'

const capabilities = [
  {
    title: 'Render-to-cause chains',
    description:
      'Why did this component re-render 14 times? Trace it backward through the dependency graph to the exact state mutation. Not a guess — the actual render line at the moment it happened.',
    insight:
      'Component re-rendered 14 times on a single click. Root cause: useState returned a new object reference on every call. useSelector was never memoized.'
  },
  {
    title: 'Selector reference tracking',
    description:
      'Which selector read stale data? When did it change? Replay tracks every reference so your agent answers these questions without adding a single log line to your codebase.',
    insight:
      "Selector: UserPermissions returned the wrong value at t+340ms. The auth slice updated at t+320ms but the selector cache wasn't invalidated."
  },
  {
    title: 'JS execution, frame by frame',
    description:
      "Step through any JavaScript frame in order. Add console logs retroactively. Set breakpoints that didn't exist when the bug happened. This is impossible with logs — it requires the recording.",
    insight:
      "The race condition is in PaymentFlow.tsx line 32. The onSubmit handler fires before the async validation resolves. Here's the fix:"
  }
]

export function RuntimeAnalysis() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Analysis that used to require a staff engineer
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Three classes of runtime bugs that require seeing the actual execution — not a trace.
            Now deliverable by your coding agent.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {capabilities.map((item) => (
            <article
              key={item.title}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">
                {item.description}
              </p>
              <p className="mt-5 rounded-lg bg-slate-50 px-4 py-3 font-mono text-xs leading-relaxed text-slate-900">
                {item.insight}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

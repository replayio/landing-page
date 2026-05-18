import { Container } from '~/components/Container'

const steps = [
  {
    number: 1,
    title: 'Record the bug',
    description:
      'Reproduce the issue while Replay captures everything. Use the CLI (`npx replayio record-suite`), the Chrome extension, or let your coding agent trigger the recording. You get a deterministic replay—not a video, the actual program execution.'
  },
  {
    number: 2,
    title: 'Investigate',
    description:
      'Add Replay MCP to your coding agent (Claude Code, Codeium, Cursor, etc.) and point it at the recording. Your agent can now inspect the actual runtime—set logpoints, trace function calls, examine state changes, follow call chains. Or dig in yourself with Replay DevTools.'
  },
  {
    number: 3,
    title: 'Fix with confidence',
    description:
      'Whether your agent found it or you did, you now know exactly what happened. The root cause is clear because you saw it in the actual execution—not inferred from logs or guessed from the stack trace.'
  }
]

export function DebuggingHowItWorks() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">How it works</p>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Record → Investigate → Fix
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="flex flex-col rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white"
                  aria-hidden
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

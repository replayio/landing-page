import { Container } from '~/components/Container'

const benefits = [
  {
    title: 'Root-cause analysis, automated',
    description:
      "Replay doesn't just report the error. It traces through the recording to find the exact cause — the state change, the failed request, the bad render — and explains why it happened."
  },
  {
    title: 'Detailed fixes, not vague suggestions',
    description:
      'Your agent receives a specific, implementation-ready fix with full context — which file, which function, what to change, and why. No more trial-and-error loops.'
  },
  {
    title: 'Works with any coding agent',
    description:
      'Replay MCP connects to Claude Code, Cursor, Copilot, Windsurf, and any agent that supports MCP. Add it once and every agent in your workflow gets full runtime visibility.'
  }
]

export function AgentBenefits() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            What your agent gets from Replay
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Three things Replay delivers on every bug.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

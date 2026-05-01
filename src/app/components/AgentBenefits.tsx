import { Container } from '~/components/Container'
import Image from 'next/image'

const toolIcons: Record<string, string> = {
  'Claude Code': '/images/hero-logos/claude.svg',
  Codex: '/images/hero-logos/Openai.svg',
  Cursor: '/images/hero-logos/cursor.svg',
  Copilot: '/images/hero-logos/copilot.svg',
  Windsurf: '/images/hero-logos/windsurf.svg'
}

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
      'Replay MCP connects to Claude Code, Codex, Cursor, Copilot, Windsurf, and any agent that supports MCP. Add it once and every agent in your workflow gets full runtime visibility.',
    tools: ['Claude Code', 'Codex', 'Cursor', 'Copilot', 'Windsurf']
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

              {benefit.tools && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {benefit.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
                    >
                      {toolIcons[tool] && (
                        <Image src={toolIcons[tool]} alt={tool} width={16} height={16} />
                      )}
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

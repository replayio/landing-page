import Image from 'next/image'
import { Container } from '~/components/Container'

const toolIcons: Record<string, string> = {
  'Claude Code': '/images/hero-logos/claude.svg',
  Codex: '/images/hero-logos/openai.svg',
  Cursor: '/images/hero-logos/cursor.svg',
  Copilot: '/images/hero-logos/copilot.svg',
  Windsurf: '/images/hero-logos/windsurf.svg'
}

const benefits = [
  {
    title: 'Root cause, not a guess',
    description:
      'Your agent gets a precise diagnosis — the exact state change, failed request, or bad render that caused the bug, and why.',
    quote:
      '"The form submission fails because the onSubmit handler fires before the async validation resolves. The race condition is in FormContainer.tsx line 47."'
  },
  {
    title: 'An implementation-ready fix',
    description:
      'Not vague suggestions. The specific file, function, and change — ready for your agent to apply.',
    quote:
      '"Wrap the handleSubmit call in FormContainer.tsx with await validateForm() before proceeding to submission logic."'
  },
  {
    title: 'Works in your existing workflow',
    description:
      'Connects to Claude Code, Codex, Cursor, Copilot, and Windsurf. Integrates with Playwright, Cypress, and Selenium. Runs in CI. Nothing to rip out.',
    tools: ['Claude Code', 'Codex', 'Cursor', 'Copilot', 'Windsurf']
  }
]

export function EngineerBenefits() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Your agent gets context, not guesses.
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Three things Replay MCP delivers to your agent on every bug.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col rounded-xl border border-gray-200 bg-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                {benefit.description}
              </p>

              {benefit.quote && (
                <div className="mt-5 rounded-lg bg-gray-300/25 p-4">
                  <p className="text-sm italic leading-relaxed text-gray-600">{benefit.quote}</p>
                </div>
              )}

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

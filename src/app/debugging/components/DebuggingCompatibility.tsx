import { Container } from '~/components/Container'

const columns = [
  {
    label: 'Apps',
    description:
      'React, Vue, Angular, Svelte, Next.js, Remix, jQuery, vanilla JS — if it runs in the browser, Replay records it.'
  },
  {
    label: 'Coding agents',
    description:
      'Replay MCP works with Claude Code, Goose, Cursor, Windsurf, or any MCP-compatible tool.'
  },
  {
    label: 'React gets more',
    description:
      'Built-in React DevTools, component render chain analysis, Redux / Zustand / TanStack Query state tracking, and framework-aware diagnostics.',
    accent: true
  }
]

export function DebuggingCompatibility() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Any JavaScript app. Any coding agent.
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">Deeper insights for React.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {columns.map((column) => (
            <article
              key={column.label}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3
                className={
                  column.accent
                    ? 'text-xs font-bold uppercase tracking-wider text-violet-600'
                    : 'text-xs font-bold uppercase tracking-wider text-gray-500'
                }
              >
                {column.label}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                {column.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

import { Container } from '~/components/Container'

export function AgentSolution() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">
            That&apos;s why we built Replay
          </p>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Give your agent eyes
            <br />
            on the runtime
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            Replay records a deterministic capture of your browser session — every DOM change,
            network request, and state update. It analyzes the recording, identifies the root cause,
            and delivers a detailed fix directly to your coding agent via MCP, or in plain English
            via the Chrome extension.
          </p>
        </div>
      </Container>
    </section>
  )
}

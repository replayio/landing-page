import Link from 'next/link'
import { Container } from '~/components/Container'

export function IndividualDebugging() {
  return (
    <section className="bg-gray-200 py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            Debugging a specific bug?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            Replay also works for individual developers hunting down hard-to-reproduce bugs. Connect
            Replay MCP to your coding agent and it can step through any recorded execution — same
            time-travel data, directly in your IDE.
          </p>
          <Link
            href="https://docs.replay.io/basics/replay-mcp/quickstart"
            className="mt-5 inline-block text-sm font-medium text-blue-600 transition hover:text-blue-700"
          >
            Learn how it works for individual debugging →
          </Link>
        </div>
      </Container>
    </section>
  )
}

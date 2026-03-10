import Link from 'next/link'
import { Container } from '~/components/Container'

export function VibeCodersMCPCallout() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-gray-200 bg-gray-100 p-8 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-500">
              Also using Cursor or Claude Code?
            </p>
            <h3 className="mt-3 text-xl font-bold text-gray-900 sm:text-2xl">
              Replay MCP works there too.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-gray-700">
              If you also use an IDE-based coding agent, Replay MCP connects directly to it —
              delivering automated root-cause analysis and a specific fix for every bug. Same
              recording engine, deeper integration.
            </p>
            <Link
              href="/for-engineers"
              className="mt-5 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
            >
              Learn about Replay MCP →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

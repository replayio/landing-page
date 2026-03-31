import Link from 'next/link'
import { Container } from '~/components/Container'
import { PRECOG_DOCS_MCP_QUICKSTART } from '../constants'

export function PrecogFinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-violet-50/80 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Stop debugging bugs after they happen.
          </h2>
          <p className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">We&apos;ve moved on.</p>
          <p className="mt-8 text-base text-gray-600 sm:text-lg">
            Run the command below to enable Precog.
          </p>
          <div className="mx-auto mt-4 max-w-lg rounded-xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm">
            <code className="block font-mono text-sm text-gray-800 sm:text-base">
              npx replay-mcp precog --enable
            </code>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            Note: this command does nothing. Happy April 1st.
          </p>
          <p className="mt-8 text-base leading-relaxed text-gray-600 sm:text-lg">
            We do, however, actually build the best debugging tools in the world for bugs that have
            already happened.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={PRECOG_DOCS_MCP_QUICKSTART}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-10 py-3.5 text-base font-semibold text-white shadow-md transition-opacity hover:opacity-95"
            >
              Try Replay MCP →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

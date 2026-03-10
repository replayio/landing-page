import Image from 'next/image'
import Link from 'next/link'
import { Container } from '~/components/Container'

export function WorksWhereYouWork() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Works where you already work.
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Same recording engine. Two ways to connect.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Replay MCP */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Replay MCP
            </p>
            <div className="mt-4 overflow-hidden rounded-lg">
              <Image
                src="/images/CLIAnimation.gif"
                alt="Replay MCP recording a bug in the browser"
                width={800}
                height={450}
                className="h-auto w-full"
                unoptimized
              />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-gray-700 sm:text-base">
              Install Replay MCP in one command and connect it to Cursor, Claude Code, Copilot, or
              Windsurf. Your agent gets root cause and a specific fix automatically.
            </p>
            <Link
              href="https://docs.replay.io/basics/replay-mcp/quickstart"
              target="_blank"
              className="mt-4 inline-block text-md font-medium text-accent hover:text-accent-light transition-colors"
            >
              Read the docs →
            </Link>
          </div>

          {/* Replay Chrome Extension */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              Replay Chrome Extension
            </p>
            <div className="mt-4 overflow-hidden rounded-lg">
              <Image
                src="/images/BrowserSidebarReveal.gif"
                alt="Replay Chrome Extension recording a bug in the browser"
                width={800}
                height={450}
                className="h-auto w-full"
                unoptimized
              />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-gray-700 sm:text-base">
              Record a bug in your browser, get a plain-English fix to paste into your AI tool. No
              setup required.
            </p>
            <span className="mt-4 inline-block rounded-full border border-accent/30 px-4 py-1.5 text-md font-semibold text-accent">
              Coming Soon
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}

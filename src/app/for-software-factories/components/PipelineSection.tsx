import Link from 'next/link'
import { Container } from '~/components/Container'

const integrationBlocks = [
  {
    title: 'Send a run from your orchestration.',
    body: 'Use the REST API to set the target and trigger timing. Add it to pull-request checks, main-branch updates, or a scheduled verification pass.'
  },
  {
    title: 'Get reviewable runtime evidence back.',
    body: 'Each failure returns a structured report with the recording and diagnostic context a reviewer or agent needs to decide the next step.'
  },
  {
    title: 'Use the same project across environments.',
    body: 'Target dev, staging, production, localhost via reverse proxy, or a per-PR preview environment. Switch in settings or manage it programmatically.'
  }
]

export function PipelineSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-50 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">Integration</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Your orchestration calls it. Your agents read the output.
          </h2>

          <div className="mt-10 flex flex-col gap-8">
            {integrationBlocks.map((block, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <span className="text-xs font-bold text-accent">{i + 1}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">{block.title}</span>{' '}
                  <span className="leading-relaxed text-gray-600">{block.body}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-gray-600">
            Running it on every change?{' '}
            <Link
              href="/continuous-testing"
              className="font-medium text-accent transition hover:opacity-80"
            >
              See Replay QA as a continuous testing platform
            </Link>
            .
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Why not just ask your coding agent to test it?{' '}
            <Link
              href="/compare/coding-agents"
              className="font-medium text-accent transition hover:opacity-80"
            >
              See what Replay QA adds
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  )
}

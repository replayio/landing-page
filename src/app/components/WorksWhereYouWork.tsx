import Image from 'next/image'
import Link from 'next/link'
import { Container } from '~/components/Container'

type ReplayWay = {
  eyebrow: string
  image: { src: string; alt: string }
  heading: string
  description: string
  cta: { label: string; href: string }
}

const WAYS: ReplayWay[] = [
  {
    eyebrow: 'In your CI pipeline',
    image: {
      src: '/images/Replay-CI-pipeline.gif',
      alt: 'Replay CI Agent posting a root-cause analysis on a GitHub PR'
    },
    heading: 'Test fails. Fix lands on your PR.',
    description:
      'The Replay CI Agent installs as a GitHub bot. It records every Playwright run on every PR. When a test fails, Replay analyzes the recording and posts root cause plus a suggested fix as a PR comment — automatically.',
    cta: {
      label: 'Set up the CI Agent',
      href: 'https://docs.replay.io/basics/getting-started/record-your-playwright-tests'
    }
  },
  {
    eyebrow: 'In your IDE',
    image: {
      src: '/images/Replay-IDE.gif',
      alt: 'Replay MCP letting a coding agent time-travel through a recording inside an IDE'
    },
    heading: 'Your agent time-travels through the recording.',
    description:
      'Replay MCP connects to Cursor, Claude Code, Codex, Copilot, or Windsurf in one command. Your coding agent can step through any recorded execution, inspect state at any point in time, and identify root causes — right inside your IDE.',
    cta: {
      label: 'Set up Replay MCP',
      href: 'https://docs.replay.io/basics/replay-mcp/quickstart'
    }
  },
  {
    eyebrow: 'In your browser',
    image: {
      src: '/images/Replay-extension.gif',
      alt: 'Replay Chrome extension capturing a deterministic recording of a browser bug'
    },
    heading: 'Record any bug, anywhere.',
    description:
      'The Replay Chrome extension lets engineers and QA capture a deterministic recording of any bug — on localhost, a staging environment, or production. Record it once, hand it to your agent or step through it yourself. No reproduction required.',
    cta: {
      label: 'Install the extension',
      href: 'https://chromewebstore.google.com/detail/replay-debugger/lkbmpddckbjbfaekcjacjgpehgaaijhh'
    }
  }
]

export function WorksWhereYouWork() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Three ways to Replay
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Replay&apos;s time-travel debugging works wherever your tests run and wherever your
            agent works. Most teams use all three.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WAYS.map((way) => (
            <article
              key={way.eyebrow}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-6"
            >
              <p className="text-sm font-bold uppercase tracking-wider text-accent">
                {way.eyebrow}
              </p>
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src={way.image.src}
                  alt={way.image.alt}
                  width={800}
                  height={450}
                  className="h-auto w-full"
                  unoptimized
                />
              </div>
              <h3 className="mt-6 text-lg font-bold leading-snug text-gray-900 sm:text-xl">
                {way.heading}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                {way.description}
              </p>
              <Link
                href={way.cta.href}
                target="_blank"
                className="text-md mt-6 inline-block font-medium text-accent transition-colors hover:text-accent-light"
              >
                {way.cta.label} &rarr;
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

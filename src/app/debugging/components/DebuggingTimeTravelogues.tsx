import Link from 'next/link'
import { Container } from '~/components/Container'

const stories = [
  {
    duration: '7 min',
    title: 'How Replay MCP helped find a React bug faster than Dan Abramov did',
    description:
      'Dan Abramov fixed a race condition in React 18. With Replay recordings, four parallel agents identified the root cause in under 30 minutes — the best run took 7 minutes.',
    href: '/blog/replay-time-travelogue-how-replay-mcp-helped-find-a-react-bug-faster-than-dan-abramov-did',
    author: '@dan_abramov'
  },
  {
    duration: '4–9 min',
    title: 'Improving Nadia\u2019s "debugging with AI" results using Replay MCP',
    description:
      'Nadia Makarevich tested AI debugging against three Next.js app bugs. Without Replay, the agent fixed 1 of 3. With Replay MCP, it found all three.',
    href: '/blog/replay-time-travelogue-improving-nadias-debugging-with-ai-results-using-replay-mcp',
    author: '@nadia'
  }
]

export function DebuggingTimeTravelogues() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">Time travelogue</p>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Agents solving real bugs with Replay MCP
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            These aren&apos;t toy demos. Real bugs, real codebases, full evidence trails.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {stories.map((story) => (
            <article
              key={story.title}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <p className="text-2xl font-bold text-accent">{story.duration}</p>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-gray-900">{story.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{story.description}</p>
              <Link
                href={story.href}
                className="mt-5 text-sm font-medium text-accent transition hover:text-accent-light"
              >
                Read the story →
              </Link>
              <p className="mt-4 text-sm text-gray-500">— via {story.author}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

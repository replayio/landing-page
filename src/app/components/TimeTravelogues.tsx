import Link from 'next/link'
import { Container } from '~/components/Container'

const stories = [
  {
    duration: '7 min',
    title: 'Replay MCP solved a React bug faster than Dan Abramov did',
    description:
      'Replay MCP agent looked at a React 18 issue, and found root cause in a little over 7 minutes. Dan had been manually debugging the same bug.',
    href: 'https://blog.replay.io/web-debug-bench',
    author: 'Mark Erikson'
  },
  {
    duration: '4–9 min',
    title: 'The architectural fix Nadia spent days finding — solved automatically',
    description:
      'Given a Replay recording and codebase, an AI agent recommended the exact server-side prefetching fix Nadia had eventually discovered through days of intense investigation.',
    href: 'https://blog.replay.io/how-we-rebuilt-react-devtools-with-replay-routines',
    author: 'Mark Erikson'
  }
]

export function TimeTravelogues() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">Time travelogues</p>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Deep-dive time-travel sessions
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            A running series of real debugging investigations — each one pitting Replay MCP against
            a bug that stumped a human expert.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {stories.map((story) => (
            <article
              key={story.title}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <p className="text-2xl font-bold text-accent">{story.duration}</p>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-gray-900">
                {story.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                {story.description}
              </p>
              <Link
                href={story.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 text-sm font-medium text-accent transition hover:text-accent-light"
              >
                Read the story →
              </Link>
              <p className="mt-4 text-sm text-gray-500">— {story.author}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

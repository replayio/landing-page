import Link from 'next/link'
import { Container } from '~/components/Container'
import { StepVideo } from '~/app/how-it-works/components/StepVideo'
import { FaqAccordionList } from './FaqAccordionList'

const stages = [
  {
    n: 1,
    title: 'Explore',
    body: 'Agents map the app, quickly discover user journeys, and work through them the way a new QA hire would in their first week.'
  },
  {
    n: 2,
    title: 'Test & Record',
    body: 'Agents then write tests that they run while puppeting your app in our Chromium browser, capturing deterministic runtime recordings of every session.'
  },
  {
    n: 3,
    title: 'Investigate & Report',
    body: 'Our QA agents look for bugs across a range of types: deep runtime bugs, UI glitches, accessibility issues, and performance problems (more coming soon). They deliver robust bug reports with a root cause and a suggested fix.'
  }
]

const mechanismFaqs = [
  {
    question: 'Do I need to have a test suite in place?',
    answer:
      "No. Replay QA explores your app and writes its own Playwright tests based on what it finds. If you already have a suite, keep it. Replay QA runs alongside it and covers the surface area your tests don't."
  },
  {
    question: 'How does Replay QA find the root cause of an issue?',
    answer:
      'Every session is recorded deterministically, so it replays identically every time instead of behaving differently on each attempt. When a test fails, an agent time-travels back through that recording to the moment things went wrong and inspects the actual runtime: the state of the page, the network calls, and the code that ran. It reports what your app did, not what the code says it should do.'
  },
  {
    question:
      'How are these recordings different from production monitoring like FullStory, LogRocket, or Datadog?',
    answer:
      "Those tools watch real users in production and tell you something went wrong after it already affected someone. They capture session replay, logs, and traces, which is genuinely useful, but you're still reconstructing the cause from the outside. Replay records the actual JavaScript execution during testing, before the code ships, and an agent steps through it to find the line responsible. Different job: monitoring tells you production is unhealthy, Replay QA tells you why a specific change broke and how to fix it."
  }
]

export function HowItWorksSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              How Replay QA works
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              An agentic testing harness that works like a swarm of QA testers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Most QA tooling starts with flows your team defines. Replay QA begins by exploring the
              application and identifying flows worth verifying.
            </p>
          </div>

          <div className="mt-10 mix-blend-multiply">
            <StepVideo
              webmSrc="/02-Exploration-v2-Light.webm"
              mp4Src="/02-Exploration-v2-Light.mp4"
              label="Replay QA agents exploring an app, mapping pages and user journeys as a growing web of connections"
            />
          </div>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {stages.map((s) => (
              <li key={s.title} className="rounded-xl border border-gray-200 bg-white p-7">
                <span className="mb-3 inline-flex items-center gap-2.5">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                    <span className="text-xs font-bold text-accent">{s.n}</span>
                  </span>
                  <h3 className="text-base font-semibold leading-snug tracking-tight text-gray-900">
                    {s.title}
                  </h3>
                </span>
                <p className="text-sm leading-relaxed text-gray-600">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-12 max-w-3xl">
            <FaqAccordionList faqs={mechanismFaqs} />
          </div>

          <p className="mt-10 text-center text-sm text-gray-600">
            <Link href="/how-it-works" className="font-medium text-accent transition hover:opacity-80">
              Learn more
            </Link>{' '}
            about how it works.
          </p>
        </div>
      </Container>
    </section>
  )
}

import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import { BugCard } from '~/app/bugs/components/BugCard'
import { bugs, homepageBugs } from '~/app/bugs/data/bugs'
import { FaqAccordionList } from './FaqAccordionList'

const outputFaqs = [
  {
    question: 'What types of issues does Replay QA look for?',
    answer:
      'Deep runtime bugs (race conditions, async timing, elusive state mutations, React component failures), UI glitches (layout shifts, broken buttons, elements hidden behind overlays), accessibility failures (WCAG contrast violations, missing ARIA labels, keyboard traps), performance problems (slow network calls, render-blocking resources, long tasks), and security vulnerabilities (injection flaws, broken access control, weak authentication, IDOR, and cross-tenant data exposure via the Security Scan pass).'
  },
  {
    question: 'How does Replay QA find these issues? Are you analyzing code?',
    answer:
      "Not the way a static analyzer does. Replay QA drives your running app in a browser and records what actually happens: every DOM mutation, every network call, every JavaScript frame. Those recordings are deterministic, so the same session behaves identically on every replay and an agent can return to the exact moment things went wrong. Your code does come into it. When your deployed app ships source maps, agents tie that recorded execution back to your original source and step through the functions that ran, which is what makes deeper React problems like elusive state mutations and component-level failures findable. Without source maps Replay QA still finds functional bugs, UI glitches, accessibility failures, and performance problems, it just can't go as deep on React internals. Either way it starts from what the app did at runtime, which is how it catches a race condition that only shows up under real timing, or a button made unclickable by an overlay — neither of which exists in the source to be scanned."
  },
  {
    question: 'Does Replay QA also fix the bugs it finds?',
    answer:
      "No, and that's deliberate. Replay QA finds the bug, works out the root cause, and writes a suggested fix, but applying it stays with your team. The report is built so your coding agent can act on it directly, which means you keep the review step on anything that touches your codebase."
  },
  {
    question: 'Can I push bug reports into our issue tracker?',
    answer:
      'Yes. GitHub Issues, Linear, Jira, or any endpoint that accepts a webhook. You control what gets filed: manually, only after Replay QA confirms a bug, or automatically for every report including unconfirmed ones. Confirmed-only is the safest place to start. When a run came from a pull request, the root cause and fix are also posted as a comment on that PR.'
  },
  {
    question: 'Does Replay QA categorize and prioritize the issues it finds?',
    answer:
      'Yes. Reports are grouped by type and severity, and each root-cause analysis carries a confidence score, so you can start with the high-severity, high-confidence findings instead of reading the whole list.'
  },
  {
    question: 'Can I run Replay QA from my coding agent?',
    answer: (
      <>
        100% yes. We&apos;ve got a robust REST API and MCP and a solid prompt to have your agent get
        everything set up.{' '}
        <a
          href="https://docs.replay.io/reference/replay-qa/api"
          className="underline hover:text-gray-900"
        >
          Learn more in our docs
        </a>
        .
      </>
    )
  },
  {
    question: 'Can I use this with my software factory?',
    answer: (
      <>
        That is music to our ears! Replay QA is a perfect addition to any software factory loop, to
        serve as an important verification layer that goes beyond static code analysis. In fact, we
        wrote up a{' '}
        <a
          href="https://replay.io/blog/what-our-experimental-self-healing-software-loop-shipped-in-two-weeks"
          className="underline hover:text-gray-900"
        >
          blog post
        </a>{' '}
        about how we use Replay QA in our own software factory loop.
      </>
    )
  }
]

export function BugGallerySection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-gray-200 bg-gray-50 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Bug gallery</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Real bugs Replay QA found, with the evidence.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Races, sub-second glitches, and failures that never reach the console. Open one to
              watch the session replay and read how Replay QA traced it to a root cause.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homepageBugs.map((bug) => (
              <BugCard key={bug.slug} bug={bug} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button href="/bugs" variant="outline" size="sm">
              More bugs ({bugs.length})
            </Button>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <FaqAccordionList faqs={outputFaqs} />
          </div>
        </div>
      </Container>
    </section>
  )
}

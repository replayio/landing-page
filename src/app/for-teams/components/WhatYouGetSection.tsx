import { Container } from '~/components/Container'
import { AutoplayVideo } from './AutoplayVideo'
import { FaqAccordionList } from './FaqAccordionList'

const outputFaqs = [
  {
    question: 'What types of issues does Replay QA look for?',
    answer:
      "Deep runtime bugs (race conditions, async timing, elusive state mutations, React component failures), UI glitches (layout shifts, broken buttons, elements hidden behind overlays), accessibility failures (WCAG contrast violations, missing ARIA labels, keyboard traps), performance problems (slow network calls, render-blocking resources, long tasks), and security vulnerabilities (injection flaws, broken access control, weak authentication, IDOR, and cross-tenant data exposure via the Security Scan pass)."
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
  }
]

export function WhatYouGetSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">What you get</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Bug reports your coding agent deserves
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Each report is prepared with coding agents in mind. A detailed root cause analysis, a
              suggested fix, a deterministic runtime recording, and all the context needed to do the
              job.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 shadow-2xl">
            <AutoplayVideo
              src="/ReplayQA_exampleBug.mp4"
              label="Replay QA bug report walkthrough showing root cause, suggested fix, and recording"
            />
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <FaqAccordionList faqs={outputFaqs} />
          </div>
        </div>
      </Container>
    </section>
  )
}

export function VerificationProblemSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">The problem</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Your team ships 47 pull requests a week. Nobody can check them all.
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
            <p>
              Agents wrote most of that code. Static analysis passes on all of it, because static
              analysis reads the code without ever running the app. Nobody can review 47 pull
              requests by hand, let alone click through what each one changed.
            </p>
            <p>
              So it ships to staging and looks fine, because the happy path is fine. Three days later
              an end user emails to say checkout is broken on their phone. An engineer loses an
              afternoon reproducing it, and the fix itself takes twenty minutes.
            </p>
            <p>
              <span className="font-medium text-gray-900">
                Writing code got faster. Verifying it didn&apos;t, and it&apos;s still the part your
                team does by hand.
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

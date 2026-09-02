import { Container } from '~/components/Container'
import { AutoplayVideo } from '~/app/for-teams/components/AutoplayVideo'
import { FaqAccordionList } from '~/app/for-teams/components/FaqAccordionList'

const outputFaqs = [
  {
    question: 'What types of security issues does Security Scan find?',
    answer:
      'Security Scan covers the vulnerability classes most common in AI-generated web apps: injection flaws (SQL, XSS, command injection), broken access control, weak authentication, insecure API behavior, Insecure Direct Object Reference (IDOR), and cross-tenant data exposure. It reasons about how the app is meant to work — not just what it does — which lets it catch authorization and logic gaps that generic scanners miss.'
  },
  {
    question: 'What does a Security Scan bug report include?',
    answer:
      'Each finding includes a plain-language description of the vulnerability, a step-by-step account of how it was discovered (including the exact requests sent), a severity rating, an explanation of what an attacker could do with it, and a specific recommended fix your coding agent can apply directly.'
  },
  {
    question: 'Does Replay QA verify that the vulnerability is actually exploitable?',
    answer:
      'Yes. Security Scan sends real attack traffic against your running app — it doesn\'t guess from source code or config files. If it reports an IDOR, it confirmed that one authenticated session can access another user\'s data. If it reports a broken access control finding, it confirmed that an unprivileged request returned something it shouldn\'t have.'
  },
  {
    question: 'How is this different from a static analysis or SAST tool?',
    answer:
      'Static analysis reads your code without running the app. It can flag patterns that look risky but can\'t confirm whether a real attacker could exploit them. Security Scan drives your live app the way an attacker would — it finds vulnerabilities that only exist at runtime, in the interaction between your frontend, backend, and database, under real conditions.'
  },
  {
    question: 'How is this different from a manual pen test?',
    answer:
      'A manual pen test runs once, costs tens of thousands of dollars, and takes weeks to schedule. Security Scan runs automatically on every build, costs the same credits as a standard QA pass, and delivers findings in minutes. It covers the same vulnerability classes a human pen tester would check — but continuously, not quarterly.'
  }
]

export function SecurityWhatYouGetSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">What you get</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Bug reports that read like a real pen test finding
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Each security finding comes with a full breakdown: what the vulnerability is, how it
              was discovered, what an attacker could do with it, and exactly what to fix.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 shadow-2xl">
            <AutoplayVideo
              src="/replayQA_IDOR-bugreport.mp4"
              label="Replay QA Security Scan bug report for an IDOR vulnerability"
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

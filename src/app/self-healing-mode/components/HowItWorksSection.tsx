import { Container } from '~/components/Container'
import {
  PostLaunchSequence,
  type SequenceStep
} from '~/app/for-app-builders/components/PostLaunchSequence'

const steps: SequenceStep[] = [
  {
    title: 'Real users on your site or app',
    body: 'Fullstory’s JavaScript snippet captures each session as customers use your live app.'
  },
  {
    title: 'Frustration signals detected',
    body: 'Fullstory’s agentic session review spots rage clicks, dead clicks, and error clicks in each session.',
    logo: true
  },
  {
    title: 'Replay QA finds the root cause',
    body: 'Reproduces the problem in a recorded browser and traces it to the root cause in the code.',
    us: true
  },
  {
    title: 'The report goes where you work',
    body: 'An agent-ready bug report lands in your issue tracker or goes straight to your coding agent.'
  }
]

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative isolate scroll-mt-20 overflow-hidden bg-gray-50 py-16 md:py-24"
    >
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-bold uppercase tracking-wider text-accent">
            How it works
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            From a frustrated user to a root-caused bug report.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-gray-600">
            Self-healing Mode runs in the background on your live app. Each frustrated session
            becomes a diagnosed bug report.
          </p>
          <PostLaunchSequence
            steps={steps}
            label="The Self-healing Mode sequence: real users on your site or app, frustration signals detected, Replay QA finds the root cause, and the report goes to your issue tracker or coding agent. It runs continuously."
            note="It keeps watching after each fix ships."
          />
        </div>
      </Container>
    </section>
  )
}

import { Container } from '~/components/Container'
import {
  PostLaunchSequence,
  type SequenceStep
} from '~/app/for-app-builders/components/PostLaunchSequence'
import { FeatureTable } from '~/app/for-app-builders/components/FeatureTable'

const steps: SequenceStep[] = [
  {
    title: 'Real users on your site or app',
    body: 'Fullstory’s JavaScript snippet captures each session as customers use your live app.'
  },
  {
    title: 'Frustration signals detected',
    body: 'Fullstory’s agentic session review spots rage clicks, dead clicks, and errors where something went wrong.',
    logo: true
  },
  {
    title: 'Replay QA finds the root cause',
    body: 'Reproduces the problem in a recorded browser, traces it to the code, and suggests a fix.',
    us: true
  },
  {
    title: 'The fix goes where you work',
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
            From a frustrated user to a ready-to-ship fix.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-gray-600">
            Self-healing Mode is always on. Every frustrated session becomes a diagnosed bug, so
            your app gets better from the way people actually use it.
          </p>
          <PostLaunchSequence
            steps={steps}
            label="The Self-healing Mode sequence: real users on your site or app, frustration signals detected, Replay QA finds the root cause, and the fix goes to your issue tracker or coding agent. It runs continuously."
            note="Always on: the next sessions run on the improved app."
          />
          <FeatureTable
            rows={[
              [
                'Capture',
                'Add Fullstory’s JavaScript snippet to your site or app. It records real user sessions as people use it.'
              ],
              [
                'Detect',
                'Fullstory’s agentic session review finds frustration signals in the session data, the moments a user got stuck, and hands each one to Replay QA automatically.'
              ],
              [
                'Diagnose',
                'Replay QA reproduces the problem in its own recorded browser, finds the root cause from what actually executed, and suggests a fix.'
              ],
              [
                'Report',
                'You get a detailed bug report with a severity, the recording evidence, the root cause and the suggested fix.'
              ],
              [
                'Close the loop',
                'Push the report into your issue tracker, or send it straight back to your coding agent to make the fix.'
              ]
            ]}
          />
        </div>
      </Container>
    </section>
  )
}

import Link from 'next/link'
import { Container } from '~/components/Container'
import { AutoplayVideo } from './AutoplayVideo'

const setupSteps = [
  {
    n: 1,
    title: 'Connect the repo',
    body: 'Add your GitHub repo URL and authenticate. The Replay QA GitHub app installs itself. No config file, no test suite, no CI changes.'
  },
  {
    n: 2,
    title: 'Choose when it runs',
    body: 'Every push to main, every pull request, or both. Replay QA tests against your preview or staging environment and explores the app the way a user would.'
  },
  {
    n: 3,
    title: 'Bugs land in your tracker',
    body: 'Each one arrives with the root cause, a suggested fix, and a full Replay recording. When the run came from a pull request, Replay QA comments on that PR directly.'
  }
]

export function SetupSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Setup</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Connect a GitHub repo in 5 minutes or less
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 shadow-2xl">
            <AutoplayVideo
              src="/ReplayQA_githubSetupFlow_audiopilot.mp4"
              label="Replay QA GitHub repository setup flow"
            />
          </div>

          <div className="mt-14 flex flex-col gap-8">
            {setupSteps.map((step, i, arr) => (
              <div key={step.n} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                    <span className="text-sm font-bold text-accent">{step.n}</span>
                  </div>
                  {i < arr.length - 1 && <div className="mt-2 w-px flex-1 bg-gray-200" />}
                </div>
                <div className="min-w-0 flex-1 pb-2">
                  <h3 className="mb-2 text-base font-semibold tracking-tight text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-gray-600">
            Not ready to connect a repo?{' '}
            <Link
              href="https://qa.replay.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent transition hover:opacity-80"
            >
              Point it at a staging or production URL
            </Link>{' '}
            to see it in action.
          </p>
        </div>
      </Container>
    </section>
  )
}

import { Container } from '~/components/Container'
import { Button } from '~/components/Button'

const steps = [
  {
    number: '01',
    title: 'Add your repo URL',
    description:
      'Paste a link to your GitHub repository — the same “paste a link to your thing” pattern as the URL drop.'
  },
  {
    number: '02',
    title: 'Authenticate with GitHub',
    description:
      'Sign in with your GitHub account. One technical lead can complete setup — no procurement, no engineering ticket.'
  },
  {
    number: '03',
    title: 'The Replay QA app installs',
    description:
      'The GitHub app installs on your repo. No existing Playwright suite, no playwright.config.ts changes, no separate bot to wire up.'
  },
  {
    number: '04',
    title: 'Choose your run cadence',
    description:
      'Run on every main-branch update, on every pull request, or both. On PRs, root cause and a suggested fix are posted right on the pull request.'
  }
]

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

export function GitHubIntegrationSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              Testing continuously
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Connect your GitHub repo
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              The URL drop is a run-it-once check. When you want a quality gate that stays on as
              your team ships, connect a repo instead — same autonomous QA, running on every change.
              No test suite, no pipeline config.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-6"
              >
                <span className="mb-3 text-sm font-bold tabular-nums text-accent">
                  {step.number}
                </span>
                <h3 className="mb-2 text-base font-semibold leading-snug text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button href="https://qa.replay.io/new" target="_blank" size="sm" className="gap-2">
              <GitHubIcon />
              Connect your GitHub repo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

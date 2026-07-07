import Link from 'next/link'
import { Container } from '~/components/Container'
import { Button } from '~/components/Button'

const githubBullets = [
  'Runs on every main-branch update, every PR, or both',
  'Root cause + suggested fix posted right on the PR',
  'No test suite to write, no pipeline to configure'
]

const urlBullets = [
  'Nothing to install, no test knowledge required',
  'Every bug comes with a recording + root cause + fix',
  'Works on localhost via the reverse proxy option'
]

function GitHubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className="text-gray-900"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-gray-900"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

export function QATwoWaysToRun() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              Two ways to run it
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Add your GitHub repo, or drop in a URL
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Same autonomous QA, two ways to start — a continuous quality gate for teams, or a
              one-time check for whatever you just shipped.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-accent/30 bg-accent/[0.03] p-8">
              <div className="mb-4 flex items-center gap-2">
                <GitHubIcon />
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Continuously-running
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Connect your GitHub repo</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                A quality gate that stays on as your team ships. Add your repo, authenticate with
                GitHub, and the Replay QA app installs — no test suite, no config. Then choose when
                it runs.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-600">
                {githubBullets.map((item) => (
                  <li key={item}>&#10003; {item}</li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-gray-500">Best for engineers and engineering teams.</p>
              <Button
                href="https://qa.replay.io/new"
                target="_blank"
                size="sm"
                className="mt-6 w-full sm:w-auto"
              >
                Connect a repo
              </Button>
            </div>

            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8">
              <div className="mb-4 flex items-center gap-2">
                <LinkIcon />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Run-it-once
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Drop in a URL</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Paste a link to any running web app and get a bug report in minutes. Replay QA
                explores your app, writes its own Playwright tests, and files structured bug reports
                — zero setup.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-600">
                {urlBullets.map((item) => (
                  <li key={item}>&#10003; {item}</li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-gray-500">
                Best for vibecoders, internal builders, and agencies.
              </p>
              <Button
                href="https://qa.replay.io/new"
                target="_blank"
                size="sm"
                className="mt-6 w-full sm:w-auto"
              >
                Test a URL
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

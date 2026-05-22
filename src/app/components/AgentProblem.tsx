import { Container } from '~/components/Container'

export function AgentProblem() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            The test assertion tells you what failed.
            <br />
            <span className="text-accent">Not why.</span>
          </h2>

          <div className="mt-12 space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            <p>
              Your Playwright test fails. The error says{' '}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-800">
                expect(page.getByTestId(&apos;submit-btn&apos;)).toBeVisible()
              </code>{' '}
              — timeout after 30 seconds. Why isn&apos;t the button there? Could be a dozen reasons.
            </p>
            <p>
              Your team opens the test, reads the selectors, tries to reproduce locally, adds
              console.logs, re-runs, waits. Maybe they find it in 20 minutes. Maybe it takes two
              hours. Maybe they mark it as flaky and move on.
            </p>
            <p>
              Your coding agent tries to help — but without runtime data, it&apos;s guessing from
              the error message just like you are. It suggests a fix, the test still fails, it tries
              again, burns tokens, goes in circles.
            </p>
            <p>
              Meanwhile, PRs sit blocked. CI re-runs burn time and money. The team stops trusting
              the test suite — failures get ignored, flaky tests accumulate, bad code slips through.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

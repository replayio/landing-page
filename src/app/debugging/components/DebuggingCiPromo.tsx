import { Container } from '~/components/Container'
import { Button } from '~/components/Button'

export function DebuggingCiPromo() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-12 md:py-16">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              Also from Replay
            </p>
            <h2 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
              Want automated analysis on every CI failure?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              Replay CI Agent records every E2E test run automatically and posts root cause + fix as
              a PR comment — no manual recording needed. Free plan available, $299/mo for Growth.
            </p>
          </div>
          <Button
            variant="solid"
            color="custom"
            href="/"
            className="shrink-0 border-0 bg-rose-500 text-white hover:bg-rose-600"
          >
            Learn about CI Agent →
          </Button>
        </div>
      </Container>
    </section>
  )
}

import { Container } from '~/components/Container'

export function PrecogProblem() {
  return (
    <section className="relative isolate overflow-hidden bg-violet-50/80 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Every other debugger waits for the{' '}
            <span className="text-accent">crime. We&apos;ve moved on.</span>
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-600 sm:text-lg">
            <p>
              Current debugging tools — including our own — share a fundamental limitation: they
              require the bug to have already happened. You write code. It ships. It breaks. You
              record. You replay. You find the root cause.
            </p>
            <p>
              This is, frankly, embarrassing. We built a time machine that only goes backwards.{' '}
              <strong className="font-semibold text-gray-900">
                Replay Precog goes the other direction.
              </strong>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

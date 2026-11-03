import { Container } from '~/components/Container'

export function VerificationProblemSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">The problem</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Your team ships more pull requests than anyone can review.
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
            <p>
              Agents wrote most of that code. Static analysis passes on all of it, because static
              analysis reads the code without ever running the app. Nobody can review them all by
              hand, let alone click through what each one changed.
            </p>
            <p>
              So it ships to staging and looks fine, because the happy path is fine. Three days
              later an end user emails to say checkout is broken on their phone. An engineer loses
              an afternoon reproducing it, and the fix itself takes twenty minutes.
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

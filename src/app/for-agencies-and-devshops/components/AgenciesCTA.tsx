import { Container } from '~/components/Container'
import { Button } from '~/components/Button'

export function AgenciesCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Try it on one client app this week.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            In a few minutes Replay QA starts exploring the app, mapping its user journeys, and
            hunting for bugs. Then decide whether to roll it out across the rest.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              href="https://qa.replay.io/new?utm_source=for-agencies-and-devshops"
              target="_blank"
              size="base"
            >
              Try it on a client app
            </Button>
            <Button href="/contact" variant="outline" size="base">
              Talk to us
            </Button>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            No credit card. No existing test suite required.
          </p>
        </div>
      </Container>
    </section>
  )
}

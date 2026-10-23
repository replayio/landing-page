import { Container } from '~/components/Container'
import { Button } from '~/components/Button'

export function AppBuildersCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Ready to talk?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Schedule a call to get the ball rolling.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" size="base">
              Schedule a call
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

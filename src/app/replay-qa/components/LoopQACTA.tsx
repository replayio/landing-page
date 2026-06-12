import { Container } from '~/components/Container'
import { Button } from '~/components/Button'

export function LoopQACTA() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <Container className="max-w-3xl text-center">
        <h2 className="mb-4 font-display text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
          Ready to let Replay QA
          <br />
          <span className="text-accent">find your bugs?</span>
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-gray-600">
          Drop in a URL and Replay QA takes it from there — journeys, tests, recordings, and bug
          reports filed automatically.
        </p>
        <Button
          href="https://qa.replay.io"
          variant="solid"
          color="default"
          size="base"
          className="px-8"
        >
          Try Replay QA
        </Button>
        <p className="mt-3 text-xs text-gray-400">
          No test suite required &middot; Works with any web app
        </p>
      </Container>
    </section>
  )
}

import { Container } from '~/components/Container'
import { Button } from '~/components/Button'

export function SoftwareFactoriesCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Bring your architecture
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            If you&apos;ve built a factory, you&apos;ll want to know how this sits inside it before
            you try it — trigger model, output shape, throughput, failure modes, what happens when a
            run is wrong. That&apos;s the conversation we&apos;d rather have than a demo.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="https://qa.replay.io/new" target="_blank" size="base">
              Set up Replay QA
            </Button>
            <Button href="/contact" variant="outline" size="base">
              Talk to us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

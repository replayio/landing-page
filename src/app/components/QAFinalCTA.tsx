import { Container } from '~/components/Container'
import { HeroUrlInput } from './HeroUrlInput'

export function QAFinalCTA() {
  return (
    <section id="cta" className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Test your app for free.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 sm:text-lg">
            Give Replay QA a URL. No test suite, no QA team, no credit card required.
          </p>
          <div className="mt-8">
            <HeroUrlInput />
          </div>
        </div>
      </Container>
    </section>
  )
}

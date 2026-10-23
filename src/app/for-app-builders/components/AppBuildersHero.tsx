import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import Hyperspace from '~/app/components/hero/hyperspace'

export function AppBuildersHero() {
  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute inset-0 animate-fadeIn">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pb-16 pt-[120px] lg:pb-20 lg:pt-[160px]">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-sm text-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Replay QA for App Builder Platforms
            </span>
            <h1 className="text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl xl:text-7xl">
              The autonomous QA layer for app&#8209;building platforms.
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl animate-fadeInUp text-pretty text-lg leading-relaxed text-gray-700 opacity-0"
              style={{ animationDelay: '0.12s' }}
            >
              Insert Replay QA into your builder harness for runtime visibility of the apps your
              platform builds.
            </p>
            <div
              className="mt-10 flex animate-fadeInUp flex-wrap items-center justify-center gap-3 opacity-0"
              style={{ animationDelay: '0.24s' }}
            >
              <Button href="/contact" size="base">
                Talk to us
              </Button>
              <Button
                href="https://qa.replay.io/new?utm_source=for-app-builders"
                target="_blank"
                variant="outline"
                size="base"
              >
                Try Replay QA
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

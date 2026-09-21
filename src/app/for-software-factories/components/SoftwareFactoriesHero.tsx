'use client'

import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import Hyperspace from '~/app/components/hero/hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'

export function SoftwareFactoriesHero() {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute inset-0 animate-fadeIn">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pb-16 pt-[120px] lg:pb-20 lg:pt-[160px]">
          <div ref={heroContentRef} className="mx-auto max-w-3xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-sm text-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Replay QA for Software Factories
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl xl:text-7xl">
              Your factory scales.
              <br />
              Bug reproduction doesn&apos;t.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-gray-700">
              An autonomous factory is not complete when it generates code. It is complete when a
              failed run creates evidence an agent can act on, and the next run verifies the fix.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href="https://qa.replay.io/new" target="_blank" size="base">
                Set up Replay QA
              </Button>
              <Button href="/contact" variant="outline" size="base">
                Talk to us
              </Button>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Start on your own, or talk through your trigger model, environments, and expected run
              volume with the team.
            </p>
          </div>
        </Container>
      </div>
    </section>
  )
}

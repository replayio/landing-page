'use client'

import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import Hyperspace from '~/app/components/hero/hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'

export function ForTeamsHero() {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pb-16 pt-[120px] lg:pb-20 lg:pt-[160px]">
          <div ref={heroContentRef} className="mx-auto max-w-3xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-sm text-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Replay QA for Teams
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl">
              Autonomous QA for teams shipping faster than manual verification can keep up.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-700">
              Replay QA autonomously explores every new build, reproduces the failures it finds, and
              sends your team evidence they can fix before users discover the bug.
            </p>
            <div className="mt-10">
              <Button href="https://qa.replay.io/new" target="_blank" size="base">
                Test Replay QA on my app
              </Button>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              No credit card. No existing test suite required.
            </p>
          </div>
        </Container>
      </div>
    </section>
  )
}

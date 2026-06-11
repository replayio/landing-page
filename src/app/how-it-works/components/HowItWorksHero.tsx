'use client'

import { Container } from '~/components/Container'
import Hyperspace from '~/app/components/hero/hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'

export function HowItWorksHero() {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pb-16 pt-[120px] lg:pb-20 lg:pt-[160px]">
          <div className="flex w-full flex-col items-center justify-center">
            <div ref={heroContentRef} className="max-w-4xl text-center">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                How it works
              </span>
              <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl xl:text-7xl">
                From URL to bug report.
                <br />
                <span className="text-accent">Automatically.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed tracking-tight text-gray-700">
                Give Replay QA a URL. It explores your app, records every session with our
                time-travel debugger, and delivers a root cause and suggested fix for every bug it
                finds.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

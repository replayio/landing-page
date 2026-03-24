'use client'

import { Container } from '~/components/Container'
import Hyperspace from '~/app/components/hero/hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'

export function PartnerHero() {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pb-16 pt-[120px] lg:pb-24 lg:pt-[180px]">
          <div className="flex w-full flex-col items-center justify-center">
            <div ref={heroContentRef} className="max-w-5xl text-center">
              <div className="mb-8 flex justify-center">
                <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-accent shadow-sm">
                  Design Partner Program
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl xl:text-8xl">
                Help us build the perfect debugger{' '}
                <span className="text-accent">for your coding agent.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-700">
                We&apos;re partnering with a small group of engineering teams to go deep on how
                Replay MCP fits into real workflows. You get free access and a direct line to our
                team. We get honest signal on what to build.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="#apply"
                  className="inline-block rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-accent-light"
                >
                  Apply to join
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

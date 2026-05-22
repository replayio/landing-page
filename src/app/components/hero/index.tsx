'use client'

import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { HomeHeroMarquee } from './marquee'
import Hyperspace from './hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'

export function Hero({ hero: _hero }: LandingPageFragment) {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()
  const marqueeRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-[120px] lg:pt-[180px] 2xl:pt-[260px]">
          <div className="flex flex-col lg:flex-row">
            <div className="flex w-full flex-col items-center justify-center">
              <div ref={heroContentRef} className="primary-emphasis max-w-4xl text-center">
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl xl:text-8xl">
                  Your E2E tests fail.
                  <br />
                  <span className="text-accent">
                    Replay tells you why —
                    <br />
                    and how to fix it.
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                  Replay CI Agent automatically records every test run, analyzes failures using
                  time-travel debugging data, and posts a root cause, failure trace, and suggested
                  fix as a comment on your PR.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3">
                  <Button
                    label="Try Replay for free"
                    variant="solid"
                    color="custom"
                    href="https://docs.replay.io/basics/getting-started/record-your-playwright-tests"
                    target="_blank"
                    className="w-full border-0 bg-rose-500 text-white hover:bg-rose-600 sm:w-auto"
                  />
                  <p className="text-sm text-slate-500">
                    Start free. No credit card required. $299/mo for Growth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={marqueeRef}
            className="flex flex-col items-center pb-10 pt-[90px] xl:pt-[120px] 2xl:pt-[200px]"
          >
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
              Trusted by top engineering teams
            </p>
            <div className="flex min-h-[40px] items-center text-[#8B8B8B]">
              <div className="max-w-full flex-1">
                <HomeHeroMarquee gradientColor="#FCFCFC" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

'use client'

import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { LandingPageFragment } from '~/lib/basehub-queries'
// import CalButton from './cal'
import { HomeHeroMarquee } from './marquee'
import Hyperspace from './hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'

export function Hero({ hero }: LandingPageFragment) {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()
  const marqueeRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className=" relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-[120px] lg:pt-[180px] 2xl:pt-[260px]">
          <div className="flex flex-col lg:flex-row">
            <div className="flex w-full flex-col items-center justify-center">
              <div ref={heroContentRef} className="primary-emphasis max-w-3xl text-center">
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl xl:text-8xl">
                  Your coding agent can&apos;t fix{' '}
                  <span className="text-accent">what it can&apos;t see.</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                  Replay captures the full browser runtime — every DOM change, network request, and
                  state update — and turns it into a root cause and a specific fix. No manual
                  debugging.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button
                    label="Add Replay to your agent →"
                    variant="solid"
                    color="custom"
                    href="https://docs.replay.io/basics/replay-mcp/quickstart"
                    target="_blank"
                    className="w-full border-0 bg-rose-500 text-white hover:bg-rose-600 sm:w-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            ref={marqueeRef}
            className="flex flex-col items-center pb-10 pt-[90px] xl:pt-[120px] 2xl:pt-[200px]"
          >
            <p className="mb-4 text-center text-xl text-gray-500">{hero.logosTitle}</p>
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

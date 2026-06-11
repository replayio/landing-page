'use client'

import { Container } from '~/components/Container'
import { HomeHeroMarquee } from './marquee'
import Hyperspace from './hyperspace'
import { HeroUrlInput } from '../HeroUrlInput'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'

export function Hero() {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()
  const marqueeRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-[120px] lg:pt-[160px] 2xl:pt-[220px]">
          <div className="flex flex-col lg:flex-row">
            <div className="flex w-full flex-col items-center justify-center">
              <div ref={heroContentRef} className="primary-emphasis max-w-4xl text-center">
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-slate-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Replay QA
                </span>
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl xl:text-7xl">
                  AI wrote the app.
                  <br />
                  <span className="text-accent">Replay QA finds what broke.</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed tracking-tight text-slate-700">
                  Give Replay QA a URL. It explores your web app, records every session, finds real
                  bugs, and gives your coding agent the root cause and fix.
                </p>
                <div className="mt-10">
                  <HeroUrlInput />
                </div>
              </div>
            </div>
          </div>

          <div
            ref={marqueeRef}
            className="flex flex-col items-center pb-10 pt-[72px] xl:pt-[100px] 2xl:pt-[160px]"
          >
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
              Replay is trusted by top engineering teams
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

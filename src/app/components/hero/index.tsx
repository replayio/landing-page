'use client'

import { Container } from '~/components/Container'
import { Orb } from '~/components/Orb'
import { HomeHeroMarquee } from './marquee'
import { HeroUrlInput } from '../HeroUrlInput'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'

export function Hero() {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()
  const marqueeRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 h-[420px] w-[420px] opacity-40 sm:h-[640px] sm:w-[640px] lg:h-[1232px] lg:w-[1232px]"
          style={{
            top: '41%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Orb
            hue={264}
            hoverIntensity={0.3}
            rotateOnHover
            forceHoverState={false}
            backgroundColor="#FCFCFC"
          />
        </div>
      </div>
      <div className="relative z-10 flex w-full min-w-0 max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-6 sm:pt-12 lg:pt-[160px] 2xl:pt-[220px]">
          <div className="flex flex-col lg:flex-row">
            <div className="flex w-full min-w-0 flex-col items-center justify-center">
              <div
                ref={heroContentRef}
                className="primary-emphasis w-full max-w-4xl px-1 text-center sm:px-0"
              >
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-slate-600 sm:mb-6">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Replay QA
                </span>
                <h1 className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl sm:leading-tight md:text-6xl xl:text-7xl">
                  AI wrote the app.
                  <br />
                  <span className="text-accent">Replay QA finds what broke.</span>
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed tracking-tight text-slate-700 sm:mt-6 sm:text-lg">
                  Give Replay QA a URL. It explores your web app, records every session, finds real
                  bugs, and gives your coding agent the root cause and fix.
                </p>
                <div className="mt-8 sm:mt-10">
                  <HeroUrlInput />
                </div>
              </div>
            </div>
          </div>

          <div
            ref={marqueeRef}
            className="flex flex-col items-center pb-8 pt-10 sm:pb-10 sm:pt-[72px] xl:pt-[100px] 2xl:pt-[160px]"
          >
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
              Replay is trusted by top engineering teams
            </p>
            <div className="flex min-h-[40px] w-full items-center text-[#8B8B8B]">
              <div className="max-w-full flex-1 overflow-hidden">
                <HomeHeroMarquee gradientColor="#FCFCFC" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

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
    <section className="relative flex overflow-x-clip bg-[#FCFCFC]">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute h-[640px] w-[640px] opacity-40 lg:h-[1232px] lg:w-[1232px]"
          style={{
            top: '41%',
            left: '50vw',
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
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-24 sm:pt-12 lg:pt-[160px] 2xl:pt-[220px]">
          <div className="flex flex-col lg:flex-row">
            <div className="flex w-full min-w-0 flex-col items-center justify-center">
              <div
                ref={heroContentRef}
                className="primary-emphasis w-full max-w-4xl px-2 text-center sm:px-0"
              >
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-sm text-slate-700">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Replay QA
                </span>
                <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl sm:leading-tight md:text-6xl xl:text-7xl">
                  AI wrote the app.
                  <br />
                  <span className="text-accent">Replay QA finds what broke.</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed tracking-tight text-slate-700 sm:text-lg">
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

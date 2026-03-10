'use client'

import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import Hyperspace from '~/app/components/hero/hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'

export function ForEngineersHero() {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-[120px] pb-16 lg:pt-[180px] lg:pb-24">
          <div className="flex flex-col justify-center items-center w-full">
            <div ref={heroContentRef} className="max-w-5xl text-center">
              <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl xl:text-8xl">
                You gave your agent a ticket. It shipped a guess.{' '}
                <span className="text-accent">
                  You spent the next hour in DevTools.
                </span>
              </h1>
              <p className="mt-6 text-lg tracking-tight text-gray-700 max-w-2xl mx-auto">
                Replay MCP gives your coding agent the runtime context it needs to fix bugs — not
                loop on them.
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  label="Add Replay MCP to your agent"
                  variant="solid"
                  color="custom"
                  href="https://docs.replay.io/basics/replay-mcp/quickstart"
                  target="_blank"
                  className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white border-0"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

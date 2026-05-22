'use client'

import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import Hyperspace from '~/app/components/hero/hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'

export function DebuggingHero() {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pb-16 pt-[120px] lg:pb-24 lg:pt-[180px]">
          <div className="flex w-full flex-col items-center justify-center">
            <div ref={heroContentRef} className="max-w-4xl text-center">
              <p className="mb-6 inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 shadow-sm">
                Individual Debugging
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl xl:text-7xl">
                Fix the bug your
                <br />
                <span className="text-accent">agent can&apos;t figure out.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed tracking-tight text-gray-700">
                Replay is a time-travel debugger. Record your app, and get a deterministic capture
                of everything that happened — every function call, every state change, every network
                request. Then let your coding agent analyze it, or investigate it yourself.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <Button
                  label="Get started with Replay MCP"
                  variant="solid"
                  color="custom"
                  href="https://docs.replay.io/basics/replay-mcp/quickstart"
                  target="_blank"
                  className="w-full border-0 bg-rose-500 text-white hover:bg-rose-600 sm:w-auto"
                />
                <p className="text-sm text-slate-500">Free to start — no credit card required</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

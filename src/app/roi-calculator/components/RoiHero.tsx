import Hyperspace from '~/app/components/hero/hyperspace'
import { Container } from '~/components/Container'

export function RoiHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-16 md:pb-16 md:pt-24">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            ROI Calculator
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl xl:text-7xl">
            How much is debugging
            <br />
            <span className="text-accent">actually costing you?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed tracking-tight text-gray-700">
            Enter your team&apos;s numbers. We&apos;ll show you how much engineering time Replay
            removes from the debugging loop &mdash; and what that&apos;s worth.
          </p>
        </div>
      </Container>
    </section>
  )
}

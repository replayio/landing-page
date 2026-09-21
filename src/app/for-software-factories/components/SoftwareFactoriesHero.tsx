'use client'

import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import Hyperspace from '~/app/components/hero/hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'

const capabilities = [
  'Built for 10k+ recordings/day',
  'REST API + MCP',
  'Dev, staging, production, localhost'
]

export function SoftwareFactoriesHero() {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute inset-0 animate-fadeIn">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pb-16 pt-[120px] lg:pb-20 lg:pt-[160px]">
          <div ref={heroContentRef} className="mx-auto max-w-3xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-sm text-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Replay QA for Software Factories
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl xl:text-7xl">
              Your factory scales.
              <br />
              Bug reproduction doesn&apos;t.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-gray-700">
              Replay QA attaches a deterministic recording to every failure your pipeline finds. Your
              agents get a reproduction, a root cause, and a suggested fix — not a stack trace to
              guess from. Trigger it from your own orchestration via REST API.
            </p>
            <div className="mt-10">
              <Button href="https://cal.com/bhackett/30min" size="base">
                Discuss your verification architecture
              </Button>
              <p className="mt-3 text-sm text-gray-500">
                Bring your trigger model, environments, and expected run volume.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {capabilities.map((cap, i) => (
              <span key={i} className="flex items-center gap-2 text-sm text-gray-500">
                {i > 0 && <span className="hidden text-gray-300 sm:inline">·</span>}
                {cap}
              </span>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}

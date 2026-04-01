'use client'

import Link from 'next/link'
import { Container } from '~/components/Container'
import Hyperspace from '~/app/components/hero/hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'
import { PRECOG_DOCS_MCP_QUICKSTART } from '../constants'

export function PrecogHero() {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-[0.08]" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pb-16 pt-[120px] lg:pb-24 lg:pt-[160px]">
          <div ref={heroContentRef} className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-sm text-gray-600 shadow-sm backdrop-blur-sm">
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
              <span>New — April 1, 2025</span>
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              We got tired of waiting for bugs to happen.{' '}
              <span className="text-accent">So we built a debugger that doesn&apos;t.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              Replay Precog delivers deterministic root-cause analysis for bugs in code you
              haven&apos;t written yet. Arrest the bug before it commits the crime.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href={PRECOG_DOCS_MCP_QUICKSTART}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-md transition-opacity hover:opacity-95 sm:w-auto"
              >
                Enable Precog
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

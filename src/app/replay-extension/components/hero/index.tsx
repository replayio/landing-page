'use client'

import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { LandingPageFragment } from '~/lib/basehub-queries'
import Hyperspace from '../../../components/hero/hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'
import Link from 'next/link'
import { LovableIcon, Base44Icon, BoltIcon, ReplitIcon } from '~/components/icons/index'
import { PartnerLogosCycler } from './PartnerLogosCycler'

const INTEGRATION_TOOLS = [
  { name: 'Lovable', Icon: LovableIcon },
  { name: 'Base44', Icon: Base44Icon },
  { name: 'Bolt', Icon: BoltIcon },
  { name: 'Replit', Icon: ReplitIcon }
] as const

export function Hero({ hero }: LandingPageFragment) {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()
  const toolsRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        {/* Partner logos cycler: [Lovable|Base44|Bolt|Replit] + Replay */}
        <div className="w-full">
        </div>
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-[80px] lg:pt-[120px] 2xl:pt-[180px]">
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col justify-center items-center w-full">
              <div ref={heroContentRef} className="primary-emphasis max-w-3xl">
                <div className="w-full flex justify-center items-center py-8">
                  <PartnerLogosCycler />
                </div>
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl xl:text-8xl">
                  Build fearlessly.
                </h1>
                <p className="mt-6 text-lg tracking-tight text-slate-700">
                  It&apos;s like having a senior engineer watching over your shoulder — catching
                  bugs, finding root causes, and telling your AI exactly how to fix them.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <Button
                    label="Get Replay for Chrome"
                    variant="solid"
                    href="https://chromewebstore.google.com/detail/replay/ndjijdodfmndgibhajpdhhnofmnjibhb"
                    target="_blank"
                    className="w-full sm:w-auto"
                  />
                  <Link
                    href="https://docs.replay.io/basics/replay-mcp/overview"
                    target="_blank"
                    className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
                  >
                    See How It Works
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={toolsRef}
            className="flex flex-col items-center justify-center pb-10 pt-[90px] xl:pt-[120px] 2xl:pt-[200px]"
          >
            <p className="mb-4 text-sm font-medium text-slate-500">
              Works with your favorite tools
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {INTEGRATION_TOOLS.map(({ name, Icon }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

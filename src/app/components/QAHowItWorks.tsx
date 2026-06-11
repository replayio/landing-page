'use client'

import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { Container } from '~/components/Container'

const steps = [
  {
    number: '01',
    title: 'Give it a URL',
    description:
      'Point Replay QA at any web app — a marketing site, a SaaS product, an internal tool, or all of the above. No configuration, no test files, no setup beyond the URL.',
    videoSrc: '/LoopQA_url.mp4'
  },
  {
    number: '02',
    title: 'Discovers journeys and writes tests',
    description:
      'Replay QA explores your app the way a user would — navigating flows, filling forms, triggering interactions. It identifies meaningful user journeys and writes Playwright tests for each one. No human authoring required.',
    videoSrc: '/LoopQA_journeys.mp4'
  },
  {
    number: '03',
    title: 'Runs tests with Replay recording',
    description:
      'Playwright executes every test in a Replay-instrumented browser. Every session is recorded deterministically — every function call, DOM mutation, network request, and state change captured. When something fails, nothing is lost.',
    videoSrc: '/LoopQA_recordingtests.mp4'
  },
  {
    number: '04',
    title: 'Files detailed bug reports',
    description:
      'For every bug found, Replay QA files a report with everything needed to understand and fix it — without anyone having to reproduce it manually.',
    videoSrc: '/LoopQA_bugreport.mp4'
  }
]

export function QAHowItWorks({ showLearnMoreLink = true }: { showLearnMoreLink?: boolean }) {
  const [active, setActive] = useState(0)

  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">How it works</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            From URL to bug report — automatically
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:gap-10">
          {/* Left: tabs */}
          <div className="flex shrink-0 flex-col gap-2 lg:w-[360px]">
            {steps.map((step, i) => (
              <button
                key={step.number}
                onClick={() => setActive(i)}
                className={clsx(
                  'rounded-xl border px-5 py-5 text-left transition-all',
                  active === i
                    ? 'border-accent bg-[rgba(240,45,94,0.04)]'
                    : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={clsx(
                      'text-sm font-bold tabular-nums',
                      active === i ? 'text-accent' : 'text-gray-400'
                    )}
                  >
                    {step.number}
                  </span>
                  <span
                    className={clsx(
                      'text-base font-semibold leading-snug',
                      active === i ? 'text-gray-900' : 'text-gray-500'
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {active === i && (
                  <p className="mt-2 pl-8 text-sm leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                )}
              </button>
            ))}
          </div>

          {/* Right: video panel */}
          <div className="flex-1">
            <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
              <video
                key={steps[active].videoSrc}
                className="h-full w-full object-cover"
                src={steps[active].videoSrc}
                controls
                playsInline
                autoPlay
                muted
              />
            </div>
          </div>
        </div>

        {showLearnMoreLink && (
          <div className="mt-12 text-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:text-gray-900"
            >
              Learn more about how Replay QA works
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        )}
      </Container>
    </section>
  )
}

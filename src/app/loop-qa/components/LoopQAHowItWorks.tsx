'use client'

import { useState } from 'react'
import { Container } from '~/components/Container'

const steps = [
  {
    number: '01',
    title: 'Give it a URL',
    description:
      'Point Loop QA at any web app — a marketing site, a SaaS product, an internal tool, or all of the above. No configuration, no test files, no setup beyond the URL.',
    videoSrc: '/LoopQA_url.mp4'
  },
  {
    number: '02',
    title: 'Discovers journeys and writes tests',
    description:
      'Loop QA explores your app the way a user would — navigating flows, filling forms, triggering interactions. It identifies meaningful user journeys and writes Playwright tests for each one. No human authoring required.',
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
      'For every bug found, Loop QA files a report with everything needed to understand and fix it — without anyone having to reproduce it manually.',
    videoSrc: '/LoopQA_bugreport.mp4'
  }
]

export function LoopQAHowItWorks() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-6xl">
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-accent">
          How it works
        </p>
        <h2 className="mb-16 text-center font-display text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
          From URL to bug report — automatically
        </h2>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          <div className="flex shrink-0 flex-col gap-2 lg:w-[340px]">
            {steps.map((step, i) => (
              <button
                key={step.number}
                onClick={() => setActive(i)}
                className={`rounded-xl border px-5 py-5 text-left transition-all ${
                  active === i
                    ? 'border-accent/30 bg-accent/[0.04]'
                    : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="mb-2 flex items-center gap-3">
                  <span
                    className={`text-sm font-bold tabular-nums ${active === i ? 'text-accent' : 'text-gray-400'}`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`text-base font-semibold leading-snug ${
                      active === i ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {active === i && (
                  <p className="pl-8 text-sm leading-relaxed text-gray-500">{step.description}</p>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1">
            <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
              {steps[active].videoSrc ? (
                <video
                  key={steps[active].videoSrc}
                  className="h-full w-full object-cover"
                  src={steps[active].videoSrc}
                  controls
                  playsInline
                  autoPlay
                  muted
                />
              ) : (
                <div className="flex flex-col items-center gap-4 px-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="ml-1 text-accent"
                    >
                      <path d="M5 3l14 9-14 9V3z" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-900">{steps[active].title}</p>
                    <p className="text-xs text-gray-400">Recording coming soon</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

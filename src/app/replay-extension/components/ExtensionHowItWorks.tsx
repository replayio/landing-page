'use client'

import { useState } from 'react'
import { Container } from '~/components/Container'
import { RightArrowIcon } from '~/components/icons/rightArrow'

const steps = [
  {
    number: 1,
    title: 'Install the extension',
    description:
      'Add the Replay Chrome Extension from the Chrome Web Store. It takes 10 seconds.'
  },
  {
    number: 2,
    title: 'Record the bug',
    description:
      "Click the Replay icon and use your app normally. When you hit the bug, stop recording. That's it."
  },
  {
    number: 3,
    title: 'Get the fix',
    description:
      'Replay analyzes your recording, finds the root cause, and gives your AI agent a step-by-step fix to apply.'
  }
] as const

function GifPlaceholder() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-gray-800/50 p-6 md:p-8">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-gray-600 md:h-16 md:w-16"
        aria-hidden
      >
        <svg
          className="h-6 w-6 text-gray-500 md:h-8 md:w-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M8 5v14l11-7L8 5z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-500">GIF coming soon</p>
    </div>
  )
}

function StepCard({ step }: { step: (typeof steps)[number] }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-800 sm:flex-row">
      {/* Left: Text content */}
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-6 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-lg font-bold text-white">
          {step.number}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">{step.description}</p>
        </div>
      </div>

      {/* Right: GIF placeholder */}
      <div className="flex min-h-[140px] w-full sm:min-h-0 sm:w-64 sm:flex-shrink-0">
        <GifPlaceholder />
      </div>
    </div>
  )
}

export function ExtensionHowItWorks() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + steps.length) % steps.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % steps.length)
  }

  return (
    <section
      id="how-it-works"
      className="relative isolate overflow-hidden bg-gray-900 py-16 md:py-24"
    >
      <Container className="relative">
        <div className="text-center">
          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            How it works
          </h2>
          <p className="mt-4 text-base text-gray-400 sm:text-lg">
            Three steps. No coding required.
          </p>
        </div>

        {/* Desktop: All 3 steps stacked */}
        <div className="mt-12 hidden space-y-6 lg:block">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>

        {/* Mobile: Carousel with prev/next */}
        <div className="mt-12 lg:hidden">
          <StepCard step={steps[currentIndex]} />
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-gray-800 text-accent transition-transform active:scale-95"
              aria-label="Previous step"
            >
              <span className="inline-flex rotate-180">
                <RightArrowIcon width={18} height={18} />
              </span>
            </button>
            <span className="text-sm text-gray-400">
              {currentIndex + 1} of {steps.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-gray-800 text-accent transition-transform active:scale-95"
              aria-label="Next step"
            >
              <RightArrowIcon width={18} height={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

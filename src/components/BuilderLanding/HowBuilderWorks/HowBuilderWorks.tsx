'use client'

import Image from 'next/image'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'

// Icon components
const DocumentChecklistIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-600"
  >
    <path
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const WrenchBrushIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-600"
  >
    {/* Wrench */}
    <path
      d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Brush */}
    <path
      d="M19 11l-2-2m-7 7l2 2m0 0l2-2m-2 2l-2-2m4 0l-2-2m2 2l2 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const BugIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-600"
  >
    <path
      d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M17.66 17.66l-1.41-1.41M4.93 19.07l-1.41-1.41M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CircularArrowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-600"
  >
    <path
      d="M4 4v5h5M4 9l5-5M20 20v-5h-5M20 15l-5 5M9 4H7a2 2 0 00-2 2v2M15 20h2a2 2 0 002-2v-2M15 4h2a2 2 0 012 2v2M9 20H7a2 2 0 01-2-2v-2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const RightArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-400"
  >
    <path
      d="M6 12l4-4-4-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const features = [
  {
    title: 'Plan & Ideate',
    icon: <DocumentChecklistIcon />,
    description: 'Builder will help you create a detailed plan for your app.',
    highlight: 'No need for extensive prompts',
  },
  {
    title: 'Design & Iterate',
    icon: <WrenchBrushIcon />,
    description: 'Easily make component changes & customize your design.',
    highlight: 'Edit only components you choose',
  },
  {
    title: 'Test & Fix',
    icon: <BugIcon />,
    description: 'We will automatically test your application and fix any issues.',
    highlight: 'Goodbye to manual debugging',
  },
  {
    title: 'One-click Deploy',
    icon: <CircularArrowIcon />,
    description: 'Deploying your app is as simple as it gets',
    highlight: 'No need for coding experience',
  },
]

export function HowBuilderWorks() {
  return (
    <section id="how-builder-works" className="relative isolate overflow-hidden bg-white pb-16 pt-8 md:pb-24 md:pt-20">
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Section - Text Content */}
          <div className="flex flex-col">
            {/* Headline */}
            <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
              We're with you{' '}
              <span className="text-accent">every step of the way.</span>
            </h2>

            {/* Sub-headline */}
            <p className="mt-4 text-lg text-gray-600 sm:text-xl">
              Anyone can go from idea to live web application in minutes - no code, no hassle.
            </p>

            {/* Feature Cards */}
            <div className="mt-8 space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all hover:border-gray-300 hover:bg-white"
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-600">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                      {feature.description}{' '}
                      <span className="font-medium text-accent">{feature.highlight}</span>
                    </p>
                  </div>

                  {/* Right Arrow */}
                  <div className="flex shrink-0 items-center pt-1">
                    <RightArrowIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Visual Demo */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl">
              {/* Application Screenshot with slight tilt */}
              <div className="relative transform overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-xl transition-transform hover:scale-[1.02] lg:rotate-[-2deg]">
                <div className="aspect-video bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300" />
                {/* Video player overlay in bottom right */}
                <div className="absolute bottom-4 right-4">
                  <div className="rounded-lg bg-white p-2 shadow-lg">
                    <div className="h-16 w-28 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-12 flex justify-center">
          <Button
            variant="solid"
            color="default"
            size="base"
            className="px-8"
            href="https://builder.replay.io/?focus=true"
            target="_blank"
          >
            Start Building
          </Button>
        </div>
      </Container>
    </section>
  )
}

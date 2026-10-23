import { Container } from '~/components/Container'
import { StepVideoPlayer } from './StepVideoPlayer'

export function WhatItIsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Replay QA is an autonomous testing agent for the apps your platform builds.
            </h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              Your platform sends it an app with one API call. Replay QA tests it like a real user
              would and sends back what&apos;s broken, why, and how to fix it. There&apos;s no test
              suite to write and no QA team to hire.
            </p>
          </div>
          <StepVideoPlayer />
        </div>
      </Container>
    </section>
  )
}

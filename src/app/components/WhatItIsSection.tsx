import { Container } from '~/components/Container'
import { StepVideoPlayer } from './StepVideoPlayer'

export function WhatItIsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Replay QA explores your app like a real user would and sends back what&apos;s broken,
              why, and how to fix it.
            </h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              There&apos;s no test suite to write and no QA team to hire.
            </p>
          </div>
          <StepVideoPlayer />
        </div>
      </Container>
    </section>
  )
}

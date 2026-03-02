'use client'

import { Container } from '~/components/Container'

export function ExtensionSolutionSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent sm:text-base">
            That&apos;s why we built the Replay Extension
          </p>
          <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
            Record the bug.
            <br />
            Get the fix.
          </h2>
          <p className="mt-8 text-base leading-relaxed text-slate-600 sm:text-lg">
            The Replay Chrome Extension records exactly what happened in your browser — every
            click, every error, every network request. Then it analyzes the recording, finds
            the root cause, and tells your AI agent exactly how to fix it. No DevTools
            required.
          </p>
        </div>
      </Container>
    </section>
  )
}

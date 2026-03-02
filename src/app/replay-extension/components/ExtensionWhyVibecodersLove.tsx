'use client'

import { Container } from '~/components/Container'

const features = [
  {
    title: 'No coding required',
    description:
      "You don't need to read code, open DevTools, or understand stack traces. Replay handles the technical stuff and gives your AI a fix it can actually use."
  },
  {
    title: 'Works everywhere you vibe code',
    description:
      "Lovable, Base44, Bolt, Replit — wherever you're building, Replay records what happens in the browser and helps your AI debug it."
  },
  {
    title: 'Breaks the debugging loop',
    description:
      "Stop going back and forth with an AI that can't see the bug. Replay shows it exactly what went wrong so it can fix things on the first try."
  }
] as const

export function ExtensionWhyVibecodersLove() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container className="relative">
        <div className="text-center">
          <h2 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
            Why vibecoders love Replay
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Built for builders who&apos;d rather ship than debug.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

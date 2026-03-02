import { Container } from '~/components/Container'

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-[calc(var(--header-height)+4rem)] pb-16 md:pt-[calc(var(--header-height)+6rem)] md:pb-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            We make software{' '}
            <span className="text-accent">visible.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
            Replay started with a simple belief: if you can&apos;t see what your software is doing,
            you can&apos;t fix it. We built the technology to change that — for developers, for AI
            agents, and for anyone building with code.
          </p>
        </div>
      </Container>
    </section>
  )
}

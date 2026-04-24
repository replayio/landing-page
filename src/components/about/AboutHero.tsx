import Image from 'next/image'
import { Container } from '~/components/Container'

const replayLogoGif = '/images/replay-logo-variations.gif'

export function AboutHero() {
  return (
    <section className="bg-white pb-16 pt-24 md:pb-20 md:pt-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            We make the invisible <span className="text-accent">visible.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-700">
            Replay started with a simple belief: if you can&apos;t see what your software is doing,
            you can&apos;t fix it. We built the technology to change that — for developers, for AI
            agents, and for anyone building with code.
          </p>
          <div className="mx-auto mt-12 max-w-md">
            <Image
              src={replayLogoGif}
              alt="Replay logo variations"
              width={480}
              height={270}
              className="w-full rounded-xl border border-gray-200 shadow-sm"
              unoptimized
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

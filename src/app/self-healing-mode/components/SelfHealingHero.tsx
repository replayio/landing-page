import Image from 'next/image'
import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import Hyperspace from '~/app/components/hero/hyperspace'

export function SelfHealingHero() {
  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute inset-0 animate-fadeIn">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pb-16 pt-[120px] lg:pb-20 lg:pt-[160px]">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-sm text-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              New in Replay QA: Self-healing Mode
            </span>
            <h1 className="text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl xl:text-7xl">
              Turn user frustration into fixes.
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl animate-fadeInUp text-pretty text-lg leading-relaxed text-gray-700 opacity-0"
              style={{ animationDelay: '0.12s' }}
            >
              When a real user hits a bug in your live app, Self-healing Mode catches the moment and
              hands it to Replay QA. You get the root cause and a suggested fix, in your issue
              tracker or straight to your coding agent.
            </p>
            <div
              className="mt-10 flex animate-fadeInUp flex-wrap items-center justify-center gap-3 opacity-0"
              style={{ animationDelay: '0.24s' }}
            >
              <Button
                href="https://qa.replay.io/new?utm_source=self-healing-mode"
                target="_blank"
                size="base"
              >
                Turn on Self-healing Mode
              </Button>
              <Button href="#how-it-works" variant="outline" size="base">
                See how it works
              </Button>
            </div>
            <p
              className="mt-8 flex animate-fadeInUp flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-gray-500 opacity-0"
              style={{ animationDelay: '0.36s' }}
            >
              <span>Powered by</span>
              <Image
                src="/for-app-builders/fullstory.svg"
                alt="Fullstory"
                width={74}
                height={14}
                className="h-3.5 w-auto"
              />
              <span>session capture technology and agentic session review.</span>
            </p>
          </div>
        </Container>
      </div>
    </section>
  )
}

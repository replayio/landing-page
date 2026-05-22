'use client'

import { Orb } from '~/components/Orb'
import { Button } from '~/components/Button'

export function LoopQAHero() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="h-[640px] w-[640px] sm:h-[1232px] sm:w-[1232px]"
          style={{ position: 'absolute', top: '41%', left: '50vw', transform: 'translate(-50%, -50%)' }}
        >
          <Orb hue={264} hoverIntensity={0.3} rotateOnHover forceHoverState={false} backgroundColor="#ffffff" />
        </div>
      </div>

      <section className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-16 pt-24 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Autonomous QA
        </span>
        <h1 className="mb-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl">
          Drop in a URL.
          <br />
          <span className="text-accent">Loop QA finds the bugs.</span>
        </h1>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-600">
          Autonomous QA that explores your app, finds the bugs, and tells you exactly how to fix them. No test suite to
          write, no QA team required.
        </p>
        <Button
          href="https://loop-qa.replay.io"
          variant="solid"
          color="default"
          size="base"
          className="px-8"
        >
          Try Loop QA
        </Button>
        <p className="mt-3 text-center text-xs text-gray-400">
          No test suite required &middot; Works with any web app
        </p>
      </section>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-20">
        <div className="aspect-video overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
          <video
            className="h-full w-full object-cover"
            src="/LoopQA_PlaceholderProductOverview.mp4"
            controls
            playsInline
            poster="/loopQa_screenshot.png"
          />
        </div>
        <div className="mt-5 flex justify-center">
          <a
            href="https://loop-qa.replay.io/projects/proj-team-knowledge-hub-iyi2da-netlify-app-mpen5qsj/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border-2 border-accent px-6 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            View live demo
          </a>
        </div>
      </div>
    </div>
  )
}

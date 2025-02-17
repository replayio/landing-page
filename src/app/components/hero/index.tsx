import { Button, ClipboardButton } from '~/components/Button'
import { Container } from '~/components/Container'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { featureFlags } from '~/lib/feature-flags'
// import CalButton from './cal'
import { HomeHeroMarquee } from './marquee'
import Hyperspace from './hyperspace'
import { Carrousel } from './carrousel'
import Link from 'next/link'
import { RichText } from 'basehub/react-rich-text'

export function Hero({ hero }: LandingPageFragment) {
  const { h1, h2 } = hero.heroVariants.items[0]

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC] flex-col">
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-[120px] lg:pt-[180px] 2xl:pt-[260px]">
          <div className="flex flex-col items-center">
            <div className="flex-1 max-w-3xl mx-auto">
              <div className="primary-emphasis">
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl xl:text-8xl text-center">
                  An all seeing debugger for your web app
                </h1>
                <div className="mt-6 rounded-lg bg-white/20 text-lg tracking-tight text-slate-700 text-center">
                  We're building{' '}
                  <a 
                    href="https://static.replay.io/protocol/tot/Nut/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Nut
                  </a>,
                  a chat API for explaining problems in your app.
                  Nut records your app to capture and later analyze the billions
                  of things that happened while it ran, then tells you the root cause.
                  Take the actual work out of figuring out most bugs.
                </div>
              </div>
            </div>
          </div>
          <img
            src="/images/hero-image.jpg"
            alt="Nut Explanation"
            className="w-[80%] md:w-[60%] h-auto mt-8 mx-auto"
          />
          <div className="flex flex-col items-center">
            <div className="flex-1 max-w-3xl mx-auto mt-6 rounded-lg bg-white/20 text-lg tracking-tight text-slate-700 text-center">
              Nut works especially well with AI code writers.  AIs are lousy at debugging
              problems in code they've written.  The basic issue is a lack of context:
              people use devtools to understand their app, but AIs struggle here.
              Nut gives AIs the clear explanations they need to fix bugs reliably.
            </div>
            <div className="flex-1 max-w-3xl mx-auto mt-6 rounded-lg bg-white/20 text-lg tracking-tight text-slate-700 text-center">
              For now we're focusing on{' '}
              <a 
                href="https://nut.new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Nut.new
              </a>, a no-code tool in the mold of{' '}
              <a 
                href="https://bolt.new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Bolt
              </a>,{' '}
              <a 
                href="https://v0.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                v0
              </a>, and{' '}
              <a 
                href="https://lovable.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Lovable
              </a>.
              You can build complete apps from scratch by prompting the AI,
              and call the Nut API to get past the points where other tools get stuck.
              Nut.new is free to use lightly, and in unlimited amounts through our early
              adopter program or with your own Anthropic API key.
            </div>
          </div>
        </Container>
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-[60px] lg:pt-[90px] 2xl:pt-[120px]">
          <div className="flex flex-col items-center">
            <div className="flex-1 max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl xl:text-6xl text-center">
                How it works
              </h2>
              <div className="flex-1 max-w-3xl mx-auto mt-6 rounded-lg bg-white/20 text-lg tracking-tight text-slate-700 text-center">
                Replay's Chromium-based deterministic{' '}
                <a
                  href="https://blog.replay.io/how-replay-works"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  browser recorder
                </a>{' '}
                makes Nut possible.
                The browser captures just enough data while your app is running that it can
                be replayed later and behave exactly the same.
                This behavior is queried like a database and processed with advanced techniques
                such as dataflow and control dependency analysis to get to the
                underlying cause of any problem in the recording.
              </div>
            </div>
          </div>
        </Container>
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-[60px] lg:pt-[90px] 2xl:pt-[120px]">
          <div className="flex flex-col items-center">
            <div className="flex-1 max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl xl:text-6xl text-center">
                Early adopters
              </h2>
              <div className="flex-1 max-w-3xl mx-auto mt-6 mb-12 rounded-lg bg-white/20 text-lg tracking-tight text-slate-700 text-center">
                Nut is early in development.
                We're offering unlimited free access to{' '}
                <a 
                  href="https://nut.new" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Nut.new
                </a>{' '}
                for early adopters who can give us feedback we'll use to improve Nut.
                Reach us at{' '}
                <a
                  href="mailto:hi@replay.io"
                  className="text-blue-600 hover:text-blue-800"
                >
                  hi@replay.io
                </a>{' '}
                or fill out our{' '}
                <a
                  href="https://replay.io/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  contact form
                </a>{' '}
                to join our early adopter program.
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

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

const HeroTitle = "An all seeing debugger for your web app";
const HeroText = "We're building Nut, a chat API for explaining problems in your app.  Nut uses our lightweight recorder to capture and later query the billions of things that happened while the app was running.  Nut analyzes this data to tell you what is causing the bug.  Take the actual work out of figuring out most bugs.";

const HeroFooter1 = "Nut works especially well with AI code writers.  AIs are lousy at debugging problems in code they’ve written.  The basic issue is a lack of context: people use devtools to understand their app, but AIs struggle here.  Nut gives AIs the clear explanations they need to fix bugs reliably.";
const HeroFooter2 = "For now we're focusing on Nut.new, a no-code tool in the mold of Bolt, v0, and Lovable.  You can build complete apps from scratch by prompting the AI, and call the Nut API to get past the points where other tools get stuck.  Nut.new is free to use lightly, and in unlimited amounts through our early adopter program or with your own Anthropic API key.";

export function Hero({ hero }: LandingPageFragment) {
  const { h1, h2 } = hero.heroVariants.items[0]

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC] flex-col">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-[120px] lg:pt-[180px] 2xl:pt-[260px]">
          <div className="flex flex-col items-center">
            <div className="flex-1 max-w-3xl mx-auto">
              <div className="primary-emphasis">
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl xl:text-8xl text-center">
                  {HeroTitle}
                </h1>
                <div className="mt-6 rounded-lg bg-white/20 text-lg tracking-tight text-slate-700 text-center">
                  {HeroText}
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
              {HeroFooter1}
            </div>
            <div className="flex-1 max-w-3xl mx-auto mt-6 rounded-lg bg-white/20 text-lg tracking-tight text-slate-700 text-center">
              {HeroFooter2}
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

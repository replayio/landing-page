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

export function Hero({ hero }: LandingPageFragment) {
  const { h1, h2 } = hero.heroVariants.items[0]

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className=" relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-[120px] lg:pt-[180px] 2xl:pt-[260px]">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1">
              <div className="primary-emphasis max-w-3xl">
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl xl:text-8xl">
                  <RichText>{HeroTitle}</RichText>
                </h1>
                <div className="mt-6 max-w-[620px] rounded-lg bg-white/20 text-lg tracking-tight text-slate-700">
                  <RichText>{HeroText}</RichText>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

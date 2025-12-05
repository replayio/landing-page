import { Button, LinkButton } from '~/components/Button'
import { Container } from '~/components/Container'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { featureFlags } from '~/lib/feature-flags'
// import CalButton from './cal'
import { HomeHeroMarquee } from './marquee'
import Hyperspace from './hyperspace'
import { Carrousel } from './carrousel'
import Link from 'next/link'
import { RichText } from 'basehub/react-rich-text'
import Image from 'next/image'
import { getAspectRatio } from '~/lib/images'
export function Hero({ hero }: LandingPageFragment) {
  const { h1, h2 } = hero.heroVariants.items[3]

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className=" relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pt-[120px] lg:pt-[180px] 2xl:pt-[260px]">
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col justify-center items-center w-full">
              <div className="primary-emphasis max-w-3xl">
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl xl:text-8xl">
                  The time-travel debugger from the future.
                </h1>
                <div className="mt-6 max-w-3xl rounded-lg bg-white/20 text-lg tracking-tight text-slate-700">
                  Record, replay, and inspect your software with Replay. More than a video. Replay lets you jump to any point in execution, add Console logs on the fly, and squash bugs as a team.
                </div>
                <div className="mt-8 flex max-w-3xl min-w-3xl flex-col gap-x-6 gap-y-4 lg:mx-0 lg:flex-row">
                  <div className="flex flex-row items-start gap-x-4">
                    <Button
                      label='Launch DevTools'
                      variant='solid'
                      href='https://app.replay.io'
                      target="_blank"
                      className=" w-full "
                    />
                    {/* {hero.showSecondaryCta && (
                      <LinkButton
                        href={hero.secondaryCta.href || ''}
                        label={hero.secondaryCta.label + ' ->'}
                      />
                    )} */}
                  </div>
                </div>
              </div>

            </div>
            {/* <div className="mx-auto mt-12 h-fit w-full max-w-[480px] scale-100 p-0 lg:mx-0 lg:mt-0 lg:flex lg:w-auto lg:max-w-full lg:scale-75 xl:scale-100">
              <Image
                alt={hero.example.alt || ''}
                width={500}
                height={500 * getAspectRatio(hero.example.aspectRatio)}
                src={hero.example.url}
              />
            </div> */}
          </div>

          <div className="pb-10 pt-[90px] xl:pt-[120px] 2xl:pt-[200px]">
            <div className="flex min-h-[40px] items-center text-[#8B8B8B]">
              <p className="hidden whitespace-nowrap xl:inline-block">{hero.logosTitle}</p>
              <div className="max-w-full flex-1">
                <HomeHeroMarquee gradientColor="#FCFCFC" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

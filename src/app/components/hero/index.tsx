import { Button, ClipboardButton } from '~/components/Button'
import { Container } from '~/components/Container'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { featureFlags } from '~/lib/feature-flags'
import CalButton from './cal'
import { HomeHeroMarquee } from './marquee'
import Hyperspace from './hyperspace'
import { Carrousel } from './carrousel'
import Link from 'next/link'
import { RichText } from 'basehub/react-rich-text'

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
                  <RichText>{h1!.json.content}</RichText>
                </h1>
                <div className="mt-6 max-w-[620px] rounded-lg bg-white/20 text-lg tracking-tight text-slate-700">
                  <RichText>{h2!.json.content}</RichText>
                </div>
              </div>

              <div className="mx-auto mt-8 flex max-w-[480px] flex-col justify-start gap-x-6 gap-y-4 lg:mx-0 lg:flex-row">
                <div className="flex flex-col items-center">
                  <ClipboardButton
                    label={hero.installationLink.label || ''}
                    _id={hero.installationLink._id}
                    variant={hero.installationLink.variant || ''}
                    className="hidden w-full md:block"
                    clipboard={hero.installationLink.clipboard}
                  />
                  <Link href="https://docs.replay.io/quickstart/" className="w-full">
                    <Button className="w-full md:hidden">Quickstart Guide</Button>
                    <span className="mt-2 hidden text-center text-sm text-accent hover:underline md:block">
                      Quickstart Guide {'->'}
                    </span>
                  </Link>
                </div>
                <CalButton link={hero.contactUsLink} />
              </div>
            </div>
            <div className="mx-auto mt-12 h-fit w-full max-w-[480px] scale-100 p-0 lg:mx-0 lg:mt-0 lg:flex lg:w-auto lg:max-w-full lg:scale-75 xl:scale-100">
              {featureFlags.showTestSuiteTestimonials && (
                <Carrousel testimonials={hero.testimonials.items} />
              )}
            </div>
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

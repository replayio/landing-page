import { BaseHubButton } from '~/components/Button'
import { Container } from '~/components/Container'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { RichText } from 'basehub/react-rich-text'
import { Carousel } from '~/components/Carousel'
import { featureFlags } from '~/lib/feature-flags'
import CalButton from './cal'
import { HomeHeroMarquee } from './marquee'
import Hyperspace from './hyperspace'

export function Hero({ hero }: LandingPageFragment) {
  return (
    <section className="relative flex">
      <div className="absolute -left-[20%] top-0 h-full w-[120%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative flex flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl py-[180px] lg:py-[160px] 2xl:py-[260px]">
          <div className="flex-1">
            <div className="max-w-lg">
              <h1 className=" font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Fix flakes with{' '}
                <span className="relative whitespace-nowrap">
                  <span className="text-accent relative">perfect</span>
                </span>{' '}
                playback.
              </h1>
              <div className="mt-6 max-w-3xl rounded-lg bg-white/20 text-lg tracking-tight text-slate-700">
                <RichText>{hero.subtitle.json.content}</RichText>
              </div>
            </div>

            <div className="mx-auto my-12 flex max-w-[320px] flex-col justify-start gap-x-6 gap-y-4 lg:max-w-full lg:flex-row">
              <BaseHubButton {...hero.getStartedLink} />
              <CalButton link={hero.contactUsLink} />
            </div>
          </div>
          <div className="hidden h-fit p-0 lg:flex">
            {featureFlags.showTestSuiteTestimonials && (
              <Carousel testimonials={hero.testimonials.items} />
            )}
          </div>
        </Container>
        <div className="z-10 mx-auto mb-12 mt-auto w-full max-w-7xl rounded-lg py-0">
          <p className="hidden font-display text-base text-slate-900">{hero.logosTitle}</p>

          <div className="min-h-[40px]">
            <HomeHeroMarquee />
          </div>
        </div>
      </div>
    </section>
  )
}

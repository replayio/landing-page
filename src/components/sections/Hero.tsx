'use client'

import Image from 'next/image'

import { BaseHubButton } from '~/components/Button'
import { Container } from '~/components/Container'
import logoReact from '~/images/hero-logos/react.svg'
import logoGlide from '~/images/hero-logos/glide.svg'
import logoApolloGraphql from '~/images/hero-logos/apollo-graphql.svg'
import logoCodeSandbox from '~/images/hero-logos/code-sandbox.svg'
import logoMetabase from '~/images/hero-logos/metabase.svg'
import logoVercel from '~/images/hero-logos/vercel.svg'
import logoWeightsAndBiases from '~/images/hero-logos/weights-and-biases.svg'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { RichText } from 'basehub/react-rich-text'
import styles from '../../styles/Landingpage.module.css'
import Cal from './hero/Cal'
import { Carousel } from '~/components/Carousel'
import { featureFlags } from '~/lib/feature-flags'
import { HyperSpace } from '../Hyper'
import Marquee from 'react-fast-marquee'
import { useMinTabletBreakpoint } from '~/hooks/use-media'

export function Hero({ hero }: LandingPageFragment) {
  const isMinTablet = useMinTabletBreakpoint()
  return (
    <section className="relative mt-[calc(var(--header-height)*-1)] flex min-h-[100dvh] sm:min-h-[90dvh] lg:max-h-[1080px] xl:min-h-[100dvh]">
      <div className="relative flex flex-1 flex-col pt-[180px] lg:pt-[220px] 2xl:pt-[280px]">
        <Container className="relative z-10 flex w-full max-w-7xl ">
          <div className="flex-1">
            <div className="max-w-lg">
              <h1 className=" font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Fix flakes with{' '}
                <span className="relative whitespace-nowrap">
                  <span className={`${styles.colorPrimaryAccent} relative`}>perfect</span>
                </span>{' '}
                playback.
              </h1>
              <div className="mt-6 max-w-3xl rounded-lg bg-white/20 text-lg tracking-tight text-slate-700">
                <RichText>{hero.subtitle.json.content}</RichText>
              </div>
            </div>

            <div className="mx-auto my-12 flex max-w-[320px] flex-col justify-start gap-x-6 gap-y-4 lg:max-w-full lg:flex-row">
              <BaseHubButton {...hero.getStartedLink} />
              <Cal link={hero.contactUsLink} />
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
            <Marquee autoFill gradient gradientWidth={isMinTablet ? 200 : 60} speed={20}>
              {[
                { name: 'React', logo: logoReact },
                { name: 'WeightsBiases', logo: logoWeightsAndBiases },
                { name: 'Vercel', logo: logoVercel },
                { name: 'Code Sandbox', logo: logoCodeSandbox },
                { name: 'Metabase', logo: logoMetabase },
                { name: 'Glide', logo: logoGlide },
                { name: 'Apollo GraphQL', logo: logoApolloGraphql }
              ].map((company) => (
                <Image
                  key={company.name}
                  src={company.logo}
                  alt={company.name}
                  aria-label={`${company.name} logo`}
                  className="mx-1"
                />
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      <div style={{ zIndex: -1 }} className="absolute inset-0 w-full">
        <HyperSpace
          cx={-10}
          cy={75}
          radiusX={60}
          radiusY={30}
          lines={250}
          strokeWidth={0.1}
          extensionLength={500}
          stroke="#f3f3f3"
        />
      </div>
    </section>
  )
}

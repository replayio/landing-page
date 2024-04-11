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

export function Hero({ hero }: LandingPageFragment) {
  return (
    <section className="relative mt-[calc(var(--header-height)*-1)] flex lg:max-h-[1080px] lg:min-h-[100dvh]">
      <div className="relative flex flex-1 flex-col pt-[280px]">
        <Container className="relative z-10 flex w-full max-w-7xl items-baseline">
          <div className="flex-1 text-left">
            <h1 className=" font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Fix flakes with{' '}
              <span className="relative whitespace-nowrap">
                <span className={`${styles.colorPrimaryAccent} relative`}>perfect</span>
              </span>{' '}
              playback.
            </h1>
            <div className="mt-4 max-w-3xl rounded-lg bg-white/20 p-2 text-lg tracking-tight text-slate-700">
              <RichText>{hero.subtitle.json.content}</RichText>
            </div>

            <div className=" mb-32 mt-16 flex justify-start gap-x-6">
              <BaseHubButton {...hero.getStartedLink} />
              <Cal link={hero.contactUsLink} />
            </div>
          </div>
          <div className="hidden p-0 lg:flex">
            {featureFlags.showTestSuiteTestimonials && (
              <Carousel testimonials={hero.testimonials.items} />
            )}
          </div>
        </Container>
        <div className="z-10 mb-12 mt-auto w-full rounded-lg px-4 py-0">
          <p className="hidden font-display text-base text-slate-900">{hero.logosTitle}</p>
          <ul role="list" className="flex h-[44px] flex-wrap items-center justify-center gap-x-8">
            {[
              [
                { name: 'WeightsBiases', logo: logoWeightsAndBiases },
                { name: 'Vercel', logo: logoVercel },
                { name: 'Metabase', logo: logoMetabase },
                { name: 'Glide', logo: logoGlide },
                { name: 'Code Sandbox', logo: logoCodeSandbox },
                { name: 'React', logo: logoReact },
                { name: 'Apollo GraphQL', logo: logoApolloGraphql }
              ]
            ].map((group, groupIndex) => (
              <li key={groupIndex}>
                <ul
                  role="list"
                  className="flex items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
                >
                  {group.map((company) => (
                    <li key={company.name} className="mb-1">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        aria-label={`${company.name} logo`}
                        unoptimized
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
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

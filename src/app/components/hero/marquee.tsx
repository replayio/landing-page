'use client'

import Image from 'next/image'
import logoReact from '~/images/hero-logos/react.svg'
import logoGlide from '~/images/hero-logos/glide.svg'
import logoApolloGraphql from '~/images/hero-logos/apollo-graphql.svg'
import logoCodeSandbox from '~/images/hero-logos/code-sandbox.svg'
import logoMetabase from '~/images/hero-logos/metabase.svg'
import logoVercel from '~/images/hero-logos/vercel.svg'
import logoWeightsAndBiases from '~/images/hero-logos/weights-and-biases.svg'
import Marquee from 'react-fast-marquee'
import { useMinTabletBreakpoint } from '~/hooks/use-media'
import { PropsWithChildren } from 'react'

type MarqueeProps = PropsWithChildren<{
  style?: React.CSSProperties
  className?: string
  play?: boolean
  pauseOnHover?: boolean
  pauseOnClick?: boolean
  gradientColor?: string
}>

export const HomeHeroMarquee = (props: MarqueeProps) => {
  const isMinTablet = useMinTabletBreakpoint()
  return (
    <Marquee gradient gradientWidth={isMinTablet ? 200 : 60} speed={20} {...props}>
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
          loading="eager"
          className="mx-5"
        />
      ))}
    </Marquee>
  )
}

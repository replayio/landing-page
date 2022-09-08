import { EmblaCarouselType } from 'embla-carousel-react'
import Image from 'next/future/image'
import { FC, useRef } from 'react'

import { Carousel } from '~/components/common/carousel'
import { PlayIcon } from '~/components/common/play-icon'
import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button, ButtonLink } from '~/components/primitives/button'
import { Link } from '~/components/primitives/link'
import { useMedia } from '~/hooks/use-media'
import { breakpoints } from '~/lib/constants'
import codeSandboxSvg from '~/public/images/logos/code-sandbox.svg'
import dynaboardSvg from '~/public/images/logos/dynaboard.svg'
import excalidrawSvg from '~/public/images/logos/excalidraw.svg'
import glideSvg from '~/public/images/logos/glide.svg'
import midniteSvg from '~/public/images/logos/midnite.svg'
import solidJsSvg from '~/public/images/logos/solid-js.svg'
import subsetSvg from '~/public/images/logos/subset.svg'
import xStateSvg from '~/public/images/logos/xstate.svg'

import s from './trusted-by.module.scss'

const highlightedLogos = [
  {
    title: 'Glide.com',
    description:
      "Glide's mission is to put the power, beauty, and magic of software development into the hands of a billion new creators.",
    image: '/images/home/glide-highlight-image.png',
    href: 'https://replay.io/glide'
  },
  {
    title: 'TableCheck',
    description:
      "Discover and book the best venues in Japan. Whether you're looking for a quick bite or fine dining, TableCheck has you covered.",
    image: '/images/home/tablecheck-highlight-image.png',
    href: 'https://replay.io/tablecheck'
  },
  {
    title: 'Pantheon',
    description:
      "Pantheon's WebOps Platform improves productivity to drive down the cost of making changes to your Drupal and WordPress websites.",
    image: '/images/home/pantheon-highlight-image.png',
    href: 'https://replay.io/pantheon'
  }
]

const logos = [
  [
    {
      title: 'Midnite',
      logo: midniteSvg,
      url: 'https://www.midnite.com/'
    },
    {
      title: 'Subset',
      logo: subsetSvg,
      url: 'https://subset.so/'
    },
    {
      title: 'Code Sandbox',
      logo: codeSandboxSvg,
      url: 'https://codesandbox.io'
    },
    {
      title: 'Dynaboard',
      logo: dynaboardSvg,
      url: 'https://dynaboard.com/'
    }
  ],
  [
    {
      title: 'Excalidraw',
      logo: excalidrawSvg,
      url: 'https://excalidraw.com'
    },
    {
      title: 'Solid JS',
      logo: solidJsSvg,
      url: 'https://www.solidjs.com/'
    },
    {
      title: 'XState',
      logo: xStateSvg,
      url: 'https://xstate.js.org'
    },
    {
      title: 'Glide',
      logo: glideSvg,
      url: 'https://glide.com'
    }
  ]
]

export const TrustedBy: FC = () => {
  const isTabletSize = useMedia(`(min-width: ${breakpoints.screenMd}px)`)
  const carousel = useRef<EmblaCarouselType>(null)

  return (
    <Section className={s['section']}>
      <Container size="sm">
        <SectionHeading centered title="Trusted by top teams" />

        <Carousel
          className={s['carousel']}
          slideClassName={s['carousel-slide']}
          config={{ loop: true }}
          dots={!isTabletSize}
          ref={carousel}
        >
          {highlightedLogos.map((logo, idx) => (
            <div className={s['highlighted']} key={idx}>
              <div className={s['image']}>
                <Image
                  width={530}
                  height={310}
                  src={logo.image}
                  alt={logo.title}
                  quality={100}
                />
              </div>
              <div className={s['content']}>
                <div>
                  <p className={s['title']}>{logo.title}</p>
                  <p className={s['description']}>{logo.description}</p>
                </div>
                <div className={s['cta-container']}>
                  <ButtonLink
                    href={logo.href}
                    className={s['cta']}
                    variant="tertiary-inverted"
                  >
                    View case study
                    <PlayIcon style={{ marginLeft: 8 }} />
                  </ButtonLink>
                  <Button
                    className={s['next']}
                    onClick={() => carousel.current?.scrollNext()}
                    aria-label="Next"
                    unstyled
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.75 19.25H11V20.75H11.75V19.25ZM28.25 20.75C28.6642 20.75 29 20.4142 29 20C29 19.5858 28.6642 19.25 28.25 19.25V20.75ZM11.75 20.75H28.25V19.25H11.75V20.75Z"
                        fill="#464646"
                      />
                      <path
                        d="M21.5 13.25L28.25 20L21.5 26.75"
                        stroke="#464646"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        <div className={s['logos-grid']}>
          {logos.flat().map(({ title, logo, url }) => (
            <Link href={url} className={s['logo']} title={title} key={title}>
              <Image src={logo} alt={`${title} logo`} />
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}

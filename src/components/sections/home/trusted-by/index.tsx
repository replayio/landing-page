import { EmblaCarouselType } from 'embla-carousel-react'
import Image from 'next/future/image'
import { FC, useRef } from 'react'

import { Carousel } from '~/components/common/carousel'
import { PlayIcon } from '~/components/common/play-icon'
import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button } from '~/components/primitives/button'
import circleCiSvg from '~/public/images/logos/circle-ci.svg'
import codeSandboxSvg from '~/public/images/logos/code-sandbox.svg'
import excalidrawSvg from '~/public/images/logos/excalidraw.svg'
import gitbookSvg from '~/public/images/logos/git-book.svg'
import glideSvg from '~/public/images/logos/glide.svg'
import replItSvg from '~/public/images/logos/repl-it.svg'
import solidJsSvg from '~/public/images/logos/solid-js.svg'
import xStateSvg from '~/public/images/logos/xstate.svg'

import s from './trusted-by.module.scss'

const highlightedLogos = [
  {
    title: 'Glide.com',
    description:
      "Glide's mission is to put the power, beauty, and magic of software development into the hands of a billion new creators.",
    image: '/images/home/glide-highlight-image.png',
    href: '/'
  },
  {
    title: 'Glide.com',
    description:
      "Glide's mission is to put the power, beauty, and magic of software development into the hands of a billion new creators.",
    image: '/images/home/glide-highlight-image.png',
    href: '/'
  }
]

const logos = [
  [
    {
      title: 'Circle Ci',
      logo: circleCiSvg
    },
    {
      title: 'Gitbook',
      logo: gitbookSvg
    },
    {
      title: 'Code Sandbox',
      logo: codeSandboxSvg
    },
    {
      title: 'Repl.it',
      logo: replItSvg
    }
  ],
  [
    {
      title: 'Excalidraw',
      logo: excalidrawSvg
    },
    {
      title: 'Solid JS',
      logo: solidJsSvg
    },
    {
      title: 'XState',
      logo: xStateSvg
    },
    {
      title: 'Glide',
      logo: glideSvg
    }
  ]
]

export const TrustedBy: FC = () => {
  const carousel = useRef<EmblaCarouselType>(null)

  return (
    <Section className={s['section']}>
      <Container size="sm">
        <SectionHeading centered title="Trusted by top teams" />

        <Carousel
          className={s['carousel']}
          slideClassName={s['carousel-slide']}
          config={{ loop: true }}
          dots={false}
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
                <p className={s['title']}>{logo.title}</p>
                <p className={s['description']}>{logo.description}</p>
                <div className={s['cta-container']}>
                  <Button className={s['cta']} variant="tertiary-inverted">
                    View case study
                    <PlayIcon style={{ marginLeft: 8 }} />
                  </Button>
                  <Button
                    className={s['next']}
                    onClick={() => carousel.current?.scrollNext()}
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

        <div className={s['logos-desktop']}>
          <div className={s['logos-grid']}>
            {logos.flat().map(({ title, logo }) => (
              <div className={s['logo']} title={title} key={title}>
                <Image src={logo} />
              </div>
            ))}
          </div>
        </div>
      </Container>
      <div className={s['logos-mobile']}>
        <Carousel slideClassName={s['slide']}>
          {logos.map((logos, idx) => (
            <Container size="sm" key={idx}>
              <div className={s['logos-grid']}>
                {logos.map(({ logo, title }) => (
                  <div className={s['logo']} title={title} key={title}>
                    <Image src={logo} />
                  </div>
                ))}
              </div>
            </Container>
          ))}
        </Carousel>
      </div>
    </Section>
  )
}

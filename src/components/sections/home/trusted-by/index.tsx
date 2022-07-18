import Image from 'next/future/image'
import { FC } from 'react'

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
  return (
    <Section className={s['section']}>
      <Container size="sm">
        <SectionHeading centered title="Trusted by top teams" />

        <div className={s['highlighted']}>
          <div className={s['image']}>
            <Image
              width={530}
              height={310}
              src={highlightedLogos[0].image}
              alt={highlightedLogos[0].title}
              quality={100}
            />
          </div>
          <div className={s['content']}>
            <p className={s['title']}>{highlightedLogos[0].title}</p>
            <p className={s['description']}>
              {highlightedLogos[0].description}
            </p>
            <Button className={s['cta']} variant="tertiary-inverted">
              View case study
              <PlayIcon style={{ marginLeft: 8 }} />
            </Button>
          </div>
        </div>

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

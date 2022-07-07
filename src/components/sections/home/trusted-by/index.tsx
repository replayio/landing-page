import Image from 'next/future/image'
import { FC } from 'react'

import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import circleCiSvg from '~/public/images/logos/circle-ci.svg'
import codeSandboxSvg from '~/public/images/logos/code-sandbox.svg'
import excalidrawSvg from '~/public/images/logos/excalidraw.svg'
import gitbookSvg from '~/public/images/logos/git-book.svg'
import glideSvg from '~/public/images/logos/glide.svg'
import replItSvg from '~/public/images/logos/repl-it.svg'
import solidJsSvg from '~/public/images/logos/solid-js.svg'
import xStateSvg from '~/public/images/logos/xstate.svg'

import s from './trusted-by.module.scss'

const logos = [
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
  },
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

export const TrustedBy: FC = () => {
  return (
    <Section className={s['section']}>
      <Container size="sm">
        <SectionHeading centered title="Trusted by top teams" />
        <div className={s['logos-grid']}>
          {logos.map(({ title, logo }) => (
            <div className={s['logo']} title={title} key={title}>
              <Image src={logo} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

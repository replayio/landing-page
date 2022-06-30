import { FC } from 'react'

import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import s from './trusted-by.module.scss'

const logos = [
  {
    title: 'Circle Ci'
  },
  {
    title: 'Gitbook'
  },
  {
    title: 'Code Sandbox'
  },
  {
    title: 'Repl.it'
  },
  {
    title: 'Excalidraw'
  },
  {
    title: 'Solid JS'
  },
  {
    title: 'XState'
  },
  {
    title: 'Glide'
  }
]

export const TrustedBy: FC = () => {
  return (
    <Section className={s['section']}>
      <Container size="sm">
        <SectionHeading centered title="Trusted by top teams" />
        <div className={s['logos-grid']}>
          {logos.map(({ title }) => (
            <div className={s['logo']} title={title} key={title} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

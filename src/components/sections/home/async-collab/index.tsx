import { FC } from 'react'

import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import s from './async-collab.module.scss'

export const AsyncCollab: FC = () => {
  return (
    <Section className={s['section']}>
      <Container size="md">
        <Heading centered>Async Collaboration</Heading>
        <p className={s['subtitle']}>
          We’ve spent the past 7 years researching how to record and
          deterministically replay runtimes securely, performantly, and
          reliably.
        </p>
      </Container>
    </Section>
  )
}

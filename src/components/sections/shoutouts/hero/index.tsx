import Image from 'next/future/image'
import { FC } from 'react'

import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import bg from '~/public/images/shoutouts/bg.svg'

import s from './hero.module.scss'

export const Hero: FC = () => {
  return (
    <Section className={s.section}>
      <Container className={s.container} size="md">
        <div className={s['heading']}>
          <Heading as="h1" size="sm">
            Everyone claims to be magical.
            <br />
            <span className={s.highlighted}> Replay is actually magical!</span>
          </Heading>
          <span>
            Replay is one of those rare experiences that feels incredibly simple
            and obvious, and at the same time, profoundly deep and complex.
          </span>
        </div>
        <div className={s['bg']}>
          <Image src={bg} alt="" />
        </div>
      </Container>
    </Section>
  )
}

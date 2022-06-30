import { FC } from 'react'

import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import s from './hero.module.scss'

export const Hero: FC = () => {
  return (
    <Section>
      <Container>
        <div className={s['hero']}>
          <Heading>
            Debug your application after the fact with{' '}
            <span className={s['heading-highlight']}>powerful</span>{' '}
            <span className={s['heading-highlight']}>Developer</span>{' '}
            <span className={s['heading-highlight']}>Tools</span>
          </Heading>
        </div>
      </Container>
    </Section>
  )
}

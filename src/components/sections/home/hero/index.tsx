import { FC } from 'react'

import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button } from '~/components/primitives/button'

import s from './hero.module.scss'

export const Hero: FC = () => {
  return (
    <Section>
      <Container>
        <div className={s['hero']}>
          <div className={s['heading']}>
            <Heading size="lg">
              <span className={s['heading-highlight']}>
                Record, Share, and Debug
              </span>{' '}
              your application with DevTools.
            </Heading>
            <div className={s['cta']}>
              <Button variant="primary">Download Replay</Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

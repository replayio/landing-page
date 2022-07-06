import { gsap } from 'lib/gsap'
import { FC, useRef } from 'react'

import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button } from '~/components/primitives/button'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'

import s from './hero.module.scss'

export const Hero: FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      gsap
        .timeline({
          scrollTrigger: {
            start: 0,
            end: 300,
            scrub: true
          }
        })
        .to(ref.current, {
          opacity: 0,
          scale: 0.97,
          y: -100
        })
    }
  }, [])

  return (
    <Section ref={ref}>
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

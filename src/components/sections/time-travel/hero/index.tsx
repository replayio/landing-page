import dynamic, { LoaderComponent } from 'next/dynamic'
import React, { useEffect, useRef } from 'react'

import { Container } from '~/components/layout/container'
import { Section } from '~/components/layout/section'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { gsap } from '~/lib/gsap'

import { OverboardStory } from '../overboard-story'
import s from './hero.module.scss'

const Sky = dynamic(
  () => import('~/components/common/sky').then((m) => m.Sky) as LoaderComponent,
  {
    ssr: false
  }
)
export const Hero = () => {
  const firstRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { isDesktop } = useDeviceDetect()

  useEffect(() => {
    if (!isDesktop) return

    const t = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '500px top',
        scrub: true
      }
    })

    t.to([firstRef.current], {
      opacity: 0.4,
      scale: 0.85
    })

    return () => {
      t.revert()
      t.kill()
    }
  }, [isDesktop])

  return (
    <Section id="time-travel-hero" className={s['section']} ref={sectionRef}>
      <div className={s['bg-container']}>
        <div className={s['child']}>
          <Sky />
        </div>
      </div>
      <div className={s['first']} ref={firstRef}>
        <Container>
          <TitleAndSubtitle
            title={{
              children: 'Time travel debugging',
              hero: true
            }}
            subtitle={{
              className: s.subtitle,
              children: `Time travel enables entirely new debugging experiences such as instant console logs.`
            }}
          />
        </Container>
      </div>
      <OverboardStory />
    </Section>
  )
}

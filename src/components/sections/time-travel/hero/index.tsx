import React, { useEffect, useRef } from 'react'

import Video from '~/components/common/video-modal'
import { Container } from '~/components/layout/container'
import { Section } from '~/components/layout/section'
import { Button } from '~/components/primitives/cta'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { gsap } from '~/lib/gsap'

import { OverboardStory } from '../overboard-story'
import s from './hero.module.scss'

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
      <div className={s['first']} ref={firstRef}>
        <Container>
          <TitleAndSubtitle
            title={{
              children: 'Time travel debugging',
              hero: true
            }}
            subtitle={{
              className: s.subtitle,
              children: (
                <>
                  Time travel has been the holy grail for the past 60 years
                  because if you can capture the bug, you can see it, and
                  understand it.
                </>
              )
            }}
          />

          <div className={s['ctas']}>
            <Video.Modal
              poster="/images/homepage/hero-video-placeholder.png"
              url="https://stream.mux.com/RfpT026NiAnQTWXP4BKsBBUHjFReABrAO01ltzQxmOVQE.m3u8"
            >
              <Video.Trigger asChild>
                <Button mode="secondary" size="big" aria-label="Watch video">
                  Watch video
                </Button>
              </Video.Trigger>
            </Video.Modal>
          </div>
        </Container>
      </div>
      <OverboardStory />
    </Section>
  )
}

import { gsap, SplitText } from '~/lib/gsap'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

import { Section } from '~/components/layout/section'
import { Button } from '~/components/primitives/cta'
import { Title } from '~/components/primitives/texts'

const Sky = dynamic(() => import('~/components/common/sky').then((m) => m.Sky) as LoaderComponent, {
  ssr: false
})
const Grid3D = dynamic(
  () => import('~/components/common/grid-3d').then((m) => m.Grid3D) as LoaderComponent,
  {
    ssr: false
  }
)

import dynamic, { LoaderComponent } from 'next/dynamic'

import { useDeviceDetect } from '~/hooks/use-device-detect'

import s from './prefooter.module.scss'

const Prefooter = () => {
  const { isDesktop } = useDeviceDetect()
  const ctaRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current || !ctaRef.current || !isDesktop) {
      return
    }

    // gsap split text
    const split = new SplitText(titleRef.current, {
      type: 'chars',
      charsClass: 'char'
    })

    const timelineConfig: gsap.TimelineVars = {
      defaults: {
        ease: 'power2.inOut'
      },
      paused: true
    }

    if (isDesktop) {
      timelineConfig.scrollTrigger = {
        scrub: 1.2,
        trigger: sectionRef.current,
        start: 'top 30%',
        end: '95% bottom'
      }
    }

    // gsap timeline
    const tl = gsap.timeline(timelineConfig)

    tl.fromTo(
      [split.chars, ctaRef.current],
      {
        opacity: 0.5,
        z: -50
      },
      {
        z: 0,
        opacity: 1,
        duration: 50,
        stagger: {
          amount: 10,
          from: 'center'
        }
      }
    )

    return () => {
      tl.revert()
      tl.kill()
      tl.scrollTrigger?.kill?.()
      split.revert()
    }
  }, [isDesktop])

  return (
    <Section className={s['section']} id="prefooter" ref={sectionRef}>
      <div className={s['pin']} ref={pinRef}>
        <div className={s['stars']}>
          <Sky />
        </div>
        <div className={s['top']}>
          <Grid3D />
        </div>
        <div className={s['bottom']}>
          <Grid3D />
        </div>

        <div className={s['content']}>
          <Title className={s['title']}>
            <span ref={titleRef}>Get started</span>
          </Title>

          <div className={s['ctas']}>
            <Link
              passHref
              href="https://docs.replay.io/getting-started/what-is-replay-io"
              rel="noopener"
            >
              <Button mode="secondary" size="big" aria-label="Contact us">
                Read the docs
              </Button>
            </Link>

            <Link passHref href="/contact" rel="noopener">
              <Button mode="secondary" size="big" aria-label="Contact us">
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Prefooter

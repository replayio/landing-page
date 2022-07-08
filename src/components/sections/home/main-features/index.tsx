import { ScrollTrigger } from 'lib/gsap'
import { FC, useEffect, useRef } from 'react'

import { HeadingSet } from '~/components/common/heading-set'
import { ProgressBar } from '~/components/common/progress-bar'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'

// import { isDev } from '~/lib/constants'
import s from './main-features.module.scss'

const ScrollProgressBar = () => {
  const progressRef = useRef<any>(null)

  useEffect(() => {
    const sectionRef = document.querySelector('#main-features-section')

    if (!sectionRef) return

    const trigger = ScrollTrigger.create({
      trigger: sectionRef,
      markers: false,
      scrub: 1,
      start: 'top bottom',
      onUpdate: (stState) => {
        if (progressRef.current) {
          progressRef.current.update(stState.progress * 100)
        }
      }
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <ProgressBar
      ref={progressRef}
      markers={[{ position: 20 }, { position: 80 }]}
      direction="vertical"
      animated={false}
    />
  )
}

export const MainFeatures: FC = () => {
  return (
    <Section id="main-features-section" className={s['section']}>
      <Container size="sm">
        <div className={s['main-features']}>
          <HeadingSet
            className={s['feature']}
            overtitle="Time Travel"
            title="Record and share replays with your team."
            description="Replays help your team debug the problem without reproducing it locally on their computer. You’ll be amazed at how much faster issues are resolved when they include a replay."
          />

          <div className={s['progress-bar']}>
            <ScrollProgressBar />
          </div>

          <HeadingSet
            className={s['feature']}
            overtitle="Async Collaboration"
            title="Debug replays with developer tools."
            description="Travel back in time and debug your application as it initially ran. You’ll love how easy it is to test your assumptions and see what actually went wrong."
          />
        </div>
      </Container>
    </Section>
  )
}

import { ScrollTrigger } from 'lib/gsap'
import { FC, useEffect, useState } from 'react'

import { HeadingSet } from '~/components/common/heading-set'
import { ProgressBar } from '~/components/common/progress-bar'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import s from './main-features.module.scss'

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const sectionRef = document.querySelector('#main-features-section')

    if (!sectionRef) return

    const trigger = ScrollTrigger.create({
      trigger: sectionRef,
      markers: true,
      scrub: 1,
      start: 'top bottom',
      onUpdate: (stState) => {
        setProgress(stState.progress * 100)
      }
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return <ProgressBar progress={progress} direction="vertical" />
}

export const MainFeatures: FC = () => {
  return (
    <Section id="main-features-section" className={s['section']}>
      <Container size="sm">
        <div className={s['main-features']}>
          <HeadingSet
            overtitle="Time Travel"
            title={
              <>
                Debug your application as&nbsp;if it is running locally on your
                computer.
              </>
            }
            description="Inspect React components, view Network events, everything you need is at the tip of your fingers."
          />

          <div className={s['progress-bar']}>
            <ScrollProgressBar />
          </div>

          <HeadingSet
            overtitle="Async Collaboration"
            title="Add replays to Bug Reports and Pull Requests and share them in Slack."
            description="Collaboratively debug the hardest problems asynchronously."
          />
        </div>
      </Container>
    </Section>
  )
}

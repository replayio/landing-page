import { ScrollTrigger } from 'lib/gsap'
import { FC, useEffect, useMemo, useRef, useState } from 'react'

import { HeadingSet } from '~/components/common/heading-set'
import { ProgressBar } from '~/components/common/progress-bar'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { isDev } from '~/lib/constants'

// import { isDev } from '~/lib/constants'
import s from './main-features.module.scss'

type ScrollProgressBarProps = {
  onProgressUpdate: (num: number | undefined) => void
}

const ScrollProgressBar: FC<ScrollProgressBarProps> = ({
  onProgressUpdate
}) => {
  const progressRef = useRef<any>(null)

  const markers = useMemo(
    () => [
      {
        position: 20,
        onInactive: () => onProgressUpdate(undefined),
        onActive: () => onProgressUpdate(0)
      },
      {
        position: 80,
        onActive: () => onProgressUpdate(1)
      }
    ],
    [onProgressUpdate]
  )

  useEffect(() => {
    const sectionRef = document.querySelector('#main-features-section')

    if (!sectionRef) return

    const trigger = ScrollTrigger.create({
      trigger: sectionRef,
      markers: isDev,
      scrub: 1,
      start: 'top 80%',
      end: 'bottom 50%',
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
      markers={markers}
      direction="vertical"
      animated={false}
    />
  )
}

export const MainFeatures: FC = () => {
  const [activeHeading, setActiveHeading] = useState<number | undefined>(
    undefined
  )

  return (
    <Section id="main-features-section" className={s['section']}>
      <Container size="sm">
        <div className={s['main-features']}>
          <HeadingSet
            disabled={activeHeading !== 0}
            className={s['feature']}
            overtitle="Time Travel"
            title="Record and share replays with your team."
            description={
              <>
                <p>
                  Replays help your team debug the problem without reproducing
                  it locally on their computer.
                </p>
                <p>
                  You’ll be amazed at how much faster issues are resolved when
                  they include a replay.
                </p>
              </>
            }
          />

          <div className={s['progress-bar']}>
            <ScrollProgressBar onProgressUpdate={setActiveHeading} />
          </div>

          <HeadingSet
            disabled={activeHeading !== 1}
            className={s['feature']}
            overtitle="Async Collaboration"
            title="Debug replays with developer tools."
            description={
              <>
                <p>
                  Travel back in time and debug the application as it initially
                  ran with familiar developer tools.
                </p>
                <p>
                  You’ll love how easy it is to test your assumptions and see
                  what actually went wrong!
                </p>
              </>
            }
          />
        </div>
      </Container>
    </Section>
  )
}

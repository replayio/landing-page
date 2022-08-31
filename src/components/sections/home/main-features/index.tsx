import { ScrollTrigger } from 'lib/gsap'
import { FC, useEffect, useMemo, useRef, useState } from 'react'

import { HeadingSet } from '~/components/common/heading-set'
import { PlayIcon } from '~/components/common/play-icon'
import { ProgressBar } from '~/components/common/progress-bar'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { ButtonLink } from '~/components/primitives/button'
import { useDeviceDetect } from '~/hooks/use-device-detect'

import s from './main-features.module.scss'

type ScrollProgressBarProps = {
  onProgressUpdate: (num: number | undefined) => void
}

const ScrollProgressBar: FC<ScrollProgressBarProps> = ({
  onProgressUpdate
}) => {
  const progressRef = useRef<any>(null)
  const { isDesktop } = useDeviceDetect()

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
      markers: false,
      scrub: 1,
      start: 'top 80%',
      end: 'bottom 50%',
      id: 'main-features-section-scroll-trigger',
      onUpdate: (stState) => {
        if (progressRef.current) {
          progressRef.current.update(stState.progress * 100)
        }
      }
    })

    return () => {
      trigger.kill()
    }
  }, [isDesktop])

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
            overtitle="Async Collaboration"
            title="Record and share replays with your team."
            description={
              <>
                <p>
                  Replay.io gives your team the ability to time travel. When you
                  share a replay with your team, they can inspect the replay as
                  if they were sitting next to you when you recorded it. This is
                  because when they’re viewing the replay, we’re replaying a
                  browser in our backend that thinks it’s interacting with you,
                  your computer, and the internet.
                </p>

                <ButtonLink
                  href="#async-collaboration"
                  variant="tertiary-inverted-alt"
                  style={{ marginTop: '2rem' }}
                >
                  Replay for teams <PlayIcon style={{ marginLeft: 8 }} />
                </ButtonLink>
              </>
            }
          />

          <div className={s['progress-bar']}>
            <ScrollProgressBar onProgressUpdate={setActiveHeading} />
          </div>

          <HeadingSet
            disabled={activeHeading !== 1}
            className={s['feature']}
            overtitle="Time Travel Debugging"
            title="Debug replays with developer tools."
            description={
              <>
                <p>
                  Replay.io lets you travel back in time and debug the
                  application as it initially ran with familiar developer tools.
                  You can inspect a React component at any point in time or add
                  a print statement and see the logs in the Console. Anything is
                  possible when you can replay!
                </p>
              </>
            }
          />
        </div>
      </Container>
    </Section>
  )
}

import { ScrollTrigger } from 'lib/gsap'
import { FC, useEffect, useMemo, useRef, useState } from 'react'

import { HeadingSet } from '~/components/common/heading-set'
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
                  Have you ever looked at a bug and wished you could teleport
                  back to when it first occurred? With Replay, you get the next
                  best thing.
                </p>
                <p>
                  If someone on the team can record the bug, you can debug it.
                  This works because Replay is the first Time Travel Debugger
                  for the web.
                </p>
                <ButtonLink
                  href="https://medium.com/replay-io/how-replay-works-5c9c29580c58"
                  variant="tertiary-inverted-alt"
                  style={{ marginTop: '2rem' }}
                >
                  How Replay works
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
            title="Debug replays with Developer Tools."
            description={
              <>
                <p>
                  Travel back in time and debug the application as it initially
                  ran.
                </p>
                <p>
                  Inspect React components. Add print statements. Everything
                  that's possible in Chrome DevTools is possible!
                </p>
                <ButtonLink
                  href="#async-collaboration"
                  variant="tertiary-inverted-alt"
                  style={{ marginTop: '2rem' }}
                >
                  Replay for teams
                </ButtonLink>
              </>
            }
          />
        </div>
      </Container>
    </Section>
  )
}

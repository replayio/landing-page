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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '8rem'
        }}
      >
        <div>
          <ButtonLink
            href="#async-collaboration"
            variant="secondary"
            style={{ marginTop: '2rem' }}
          >
            View overboard replay
            <PlayIcon style={{ marginLeft: '14px' }} />
          </ButtonLink>
        </div>
      </div>
      <Container size="sm">
        <div className={s['main-features']}>
          <HeadingSet
            disabled={activeHeading !== 0}
            className={s['feature']}
            overtitle="Async Collaboration"
            title="Record the bug once. Never reproduce it again."
            description={
              <>
                <p>
                  <b>
                    Replay gives you the power to share what you’re seeing with
                    your team so that they can fix it fast.{' '}
                  </b>
                  Because Replay replays the browser down to level of the event
                  loop, you no longer need to worry about filing bug reports
                  with lengthy steps to reproduce. You can simply record the
                  replay, add a couple of comments, and create the ticket.
                </p>

                <ButtonLink
                  href="#async-collaboration"
                  variant="tertiary-inverted-alt"
                  style={{ marginTop: '2rem' }}
                >
                  Replay for Teams
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
            title="Experience the thrill of time-travel debugging."
            description={
              <>
                <p>
                  <b>
                    Replay gives you the freedom to see what your application
                    looked like at any point in time.
                  </b>{' '}
                  The hardest problems have many twists and turns, nulls and
                  undefineds. With Replay, you can start annotating interesting
                  points in time and narrowing down the problem. And because
                  replays can be shared, debugging can now become a team sport.
                </p>
                <ButtonLink
                  href="#developer-tools"
                  variant="tertiary-inverted-alt"
                  style={{ marginTop: '2rem' }}
                >
                  Replay DevTools
                </ButtonLink>
              </>
            }
          />
        </div>
      </Container>
    </Section>
  )
}

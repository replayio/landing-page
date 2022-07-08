import { FC, useEffect, useRef } from 'react'

import { AspectBox } from '~/components/common/aspect-box'
import { PlayIcon } from '~/components/common/play-icon'
import {
  ProgressBar,
  ProgressThumb,
  UPDATE_INTERVAL_MS
} from '~/components/common/progress-bar'
import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button } from '~/components/primitives/button'

import s from './software-tells-story.module.scss'

const story = [
  {
    title: 'Replayable.dev',
    subtitle: 'Share all the context. Avoid draining back-and-forths.',
    asset: <></>
  },
  {
    title: 'Tutorials',
    subtitle: 'Share all the context. Avoid draining back-and-forths.',
    asset: <></>
  },
  {
    title: 'React Community Guide',
    subtitle: 'Share all the context. Avoid draining back-and-forths.',
    asset: <></>
  },
  {
    title: 'Walkthroughs',
    subtitle: 'Share all the context. Avoid draining back-and-forths.',
    asset: <></>
  }
]

export const SoftwareTellsStory: FC = () => {
  const progressDesktopRef = useRef<any>(null)
  const progressMobileRef = useRef<any>(null)
  const currentProgress = useRef<number>(0)

  const updateProgress = (progressComp: any) => {
    currentProgress.current = (currentProgress.current + 1) % 101
    progressComp.update(currentProgress.current)
  }

  useEffect(() => {
    const intervalDesktop = setInterval(
      () =>
        progressDesktopRef.current &&
        updateProgress(progressDesktopRef.current),
      UPDATE_INTERVAL_MS
    )

    const intervalMobile = setInterval(
      () =>
        progressMobileRef.current && updateProgress(progressMobileRef.current),
      UPDATE_INTERVAL_MS
    )

    return () => {
      clearInterval(intervalDesktop)
      clearInterval(intervalMobile)
    }
  }, [])

  return (
    <Section className={s['section']}>
      <Container size="lg">
        <SectionHeading title="Software tells a story" centered />
        <div className={s['cta']}>
          <Button variant="tertiary" size="md">
            Replay for teams{' '}
            <span style={{ marginLeft: 8 }}>
              <PlayIcon />
            </span>
          </Button>
        </div>

        <div className={s['main-mobile']}>
          <div className={s['content']}>
            <p className={s['content-title']}>{story[0].title}</p>
            <p className={s['content-subtitle']}>{story[0].subtitle}</p>
          </div>

          <div className={s['asset']}>
            <AspectBox ratio={785 / 627} />
          </div>

          <div>
            <ProgressBar
              markers={[
                { position: 0, size: 14 },
                { position: 25, size: 14 },
                { position: 50, size: 14 },
                { position: 75, size: 14 },
                { position: 100, size: 14 }
              ]}
              ref={progressMobileRef}
              direction="horizontal"
            />
          </div>
        </div>

        <div className={s['main-desktop']}>
          <div className={s['story']}>
            <div className={s['progress']}>
              <ProgressBar ref={progressDesktopRef} direction="vertical" />
            </div>
            <div className={s['story-chunks']}>
              {story.map(({ title, subtitle }) => (
                <div className={s['story-chunk']} key={title}>
                  <div className={s['timeline']}></div>
                  <div className={s['content']}>
                    <p className={s['content-title']}>
                      <span className={s['timeline-marker']}>
                        <ProgressThumb size={14} />
                      </span>
                      {title}
                    </p>
                    <p className={s['content-subtitle']}>{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={s['asset']}>
            <AspectBox ratio={785 / 627} />
          </div>
        </div>
      </Container>
    </Section>
  )
}

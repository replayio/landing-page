import { FC, useEffect, useRef } from 'react'

import { AspectBox } from '~/components/common/aspect-box'
import {
  ANIMATION_UPDATE_INTERVAL_MS,
  ProgressBar,
  ProgressThumb
} from '~/components/common/progress-bar'
import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import s from './software-tells-story.module.scss'

const story = [
  {
    title: 'Replayable issues',
    subtitle:
      'Have a question or want to help others? Add a replay to a GitHub issue and it will appear in replaylable.',
    asset: <></>
  },
  {
    title: 'Replayable tutorials',
    subtitle:
      'Want to teach others or learn how something works?  Replayable lists educational replayable tutorial.',
    asset: <></>
  },
  {
    title: 'Replayable stories',
    subtitle:
      'Want to share a recent debugging journey or see how others debug? Replayable highlights great replayable stories.',
    asset: <></>
  },
  {
    title: 'OSS Community guide',
    subtitle:
      'Replayable’s OSS guide documents how you can update your issue template and encourage others to share replays when they have a question.',
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
      ANIMATION_UPDATE_INTERVAL_MS
    )

    const intervalMobile = setInterval(
      () =>
        progressMobileRef.current && updateProgress(progressMobileRef.current),
      ANIMATION_UPDATE_INTERVAL_MS
    )

    return () => {
      clearInterval(intervalDesktop)
      clearInterval(intervalMobile)
    }
  }, [])

  return (
    <Section className={s['section']}>
      <Container size="lg">
        <SectionHeading
          title="Replayable.dev"
          subtitle="Replayable.dev is an experiment in what happens when you can share replays with others. Whether you want to ask a question, explain how something works, or share a debugging journey, we believe software is more understandable when you can replay it."
          centered
        />

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
                { position: 0 },
                { position: 25 },
                { position: 50 },
                { position: 75 },
                { position: 100 }
              ]}
              markerSize={14}
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

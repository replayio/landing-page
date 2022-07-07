import { FC, useEffect, useState } from 'react'

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
  const [progress, setProgress] = useState(0)

  const updateProgress = () => {
    setProgress((progress) => (progress + 1) % 101)
  }

  useEffect(() => {
    const interval = setInterval(updateProgress, UPDATE_INTERVAL_MS)

    return () => clearInterval(interval)
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
        <div className={s['main']}>
          <div className={s['story']}>
            <div className={s['progress']}>
              <ProgressBar direction="vertical" progress={progress} thumbless />
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

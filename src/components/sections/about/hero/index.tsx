import { ScrollTrigger } from 'lib/gsap'
import { FC, useEffect, useMemo, useRef, useState } from 'react'

import { HeadingSet } from '~/components/common/heading-set'
import { ProgressBar } from '~/components/common/progress-bar'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { useMedia } from '~/hooks/use-media'
import now from '~/public/images/about/peteluma-1.jpeg'
import future from '~/public/images/about/peteluma-2.jpeg'

import s from './hero.module.scss'

type ScrollProgressBarProps = {
  onProgressUpdate: (num: number | undefined) => void
}

const ScrollProgressBar: FC<ScrollProgressBarProps> = ({
  onProgressUpdate
}) => {
  const isMobile = useMedia('(max-width: 768px)')

  const progressRef = useRef<any>(null)

  const markers = useMemo(
    () => [
      {
        position: isMobile ? 8 : 25,
        onInactive: () => onProgressUpdate(undefined),
        onActive: () => onProgressUpdate(1)
      },
      {
        position: isMobile ? 62 : 57,
        onActive: () => onProgressUpdate(0)
      }
    ],
    [onProgressUpdate, isMobile]
  )

  useEffect(() => {
    const sectionRef = document.querySelector('#values')

    if (!sectionRef) return

    const trigger = ScrollTrigger.create({
      trigger: sectionRef,
      markers: false,
      scrub: 1,
      start: 'top 40%',
      end: 'bottom 20%',
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

export const Hero: FC = () => {
  const [activeHeading, setActiveHeading] = useState<number | undefined>(
    undefined
  )

  return (
    <Section id="values" className={s['section']}>
      <TitleAndSubtitle
        title={{
          children: <>About Replay</>,
          hero: true
        }}
        subtitle={{
          className: s.subtitle,
          children:
            'Learn where Replay is right now and where we are going next.'
        }}
      />
      <Container size="sm">
        <div className={s['main-features']}>
          <HeadingSet
            disabled={activeHeading !== 0}
            className={s['feature']}
            image={{
              src: future,
              alt: 'The replay team chatting',
              placeholder: 'blur'
            }}
            title="Replay in the future"
            description={
              <>
                <p>
                  We see a world where collaborating with Replay is second
                  nature. When a bug is reported, the bug report includes a
                  replay. When a test fails, there is a link to the replay. When
                  a question is asked on Stack Overflow, teams can discuss it
                  directly in the replay. You see where we’re going with this.
                </p>
                <p>
                  At its heart, Replay provides the unparalleled ability to
                  understand your software. We are sparking fundamental change
                  by challenging the ways we think about software development.
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
            title="Replay here and now"
            image={{
              src: now,
              alt: 'The replay team chatting',
              placeholder: 'blur'
            }}
            description={
              <>
                <p>
                  We believe people understand what they can see, and if you
                  cannot see what your software is doing, you cannot understand
                  it. With Replay, we are making software easier to understand
                  whether you are writing your first application, or challenging
                  what’s possible.
                </p>
                <p>
                  Great software development isn’t about 10x more output. It’s
                  about 10x more insight, insight derived from being able to
                  visualize, communicate, and collaborate 10x more effectively.
                </p>
              </>
            }
          />
        </div>
      </Container>
    </Section>
  )
}

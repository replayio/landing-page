import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { AspectBox } from '~/components/common/aspect-box'
import { ProgressAPI, ProgressBar } from '~/components/common/progress-bar'
import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { useGsapTime } from '~/hooks/use-gsap-time'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'
import { useMedia } from '~/hooks/use-media'
import { breakpoints } from '~/lib/constants'

import { Comunity, Github, Stories, Tutorials } from './illustrations'
import s from './software-tells-story.module.scss'

const story = [
  {
    title: 'Replayable issues',
    subtitle:
      'Have a question or want to help others? Add a replay to a GitHub issue and it will appear in replaylable.',
    Comp: Github
  },
  {
    title: 'Replayable tutorials',
    subtitle:
      'Want to teach others or learn how something works?  Replayable lists educational replayable tutorial.',
    Comp: Tutorials
  },
  {
    title: 'Replayable stories',
    subtitle:
      'Want to share a recent debugging journey or see how others debug? Replayable highlights great replayable stories.',
    Comp: Stories
  },
  {
    title: 'OSS Community guide',
    subtitle:
      'Replayable’s OSS guide documents how you can update your issue template and encourage others to share replays when they have a question.',
    Comp: Comunity
  }
]

export const SoftwareTellsStory: FC = () => {
  const mobileTimeline = useRef<ProgressAPI>(null)
  const desktopTimeline = useRef<ProgressAPI>(null)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const isDesktop = useMedia(`(min-width: ${breakpoints.screenLg}px)`)
  const storyContainerRef = useRef<HTMLDivElement>(null)
  const [ref, { inView }] = useIntersectionObserver<HTMLDivElement>({
    triggerOnce: false
  })

  const handleTimeUpdate = useCallback(
    (progress) => {
      if (isDesktop) {
        desktopTimeline.current?.update(progress.percentage)
      } else {
        mobileTimeline.current?.update(progress.percentage)
      }
    },
    [isDesktop]
  )

  const time = useGsapTime({
    duration: 20,
    loop: true,
    onUpdate: handleTimeUpdate
  })

  useEffect(() => {
    if (!storyContainerRef.current) return

    const storyContainerElm = storyContainerRef.current

    const preventScroll = (e: WheelEvent) => {
      e.preventDefault()
    }

    storyContainerElm?.addEventListener('wheel', preventScroll, {
      passive: false
    })

    return () => {
      storyContainerElm?.removeEventListener('wheel', preventScroll)
    }
  }, [])

  useEffect(() => {
    if (inView) {
      time.start()
    } else {
      time.pause()
    }

    return time.pause
  }, [time, inView])

  useEffect(() => {
    if (!storyContainerRef.current || !isDesktop || activeIdx === null) return

    const selector = gsap.utils.selector(storyContainerRef.current)
    const [storyChunks] = selector(`[data-story-chunk-idx="${activeIdx}"]`)
    const scrollIntoView = storyChunks

    storyContainerRef.current.scrollTo({
      top: scrollIntoView.offsetTop + scrollIntoView.clientHeight / 2,
      behavior: 'smooth'
    })
  }, [activeIdx, isDesktop])

  const markers = useMemo(() => {
    return story.map((s, idx) => ({
      position: isDesktop
        ? idx === 0
          ? 0
          : `story-desktop-marker-${s.title}`
        : (100 / story.length) * idx,
      onActive: () => {
        setActiveIdx(idx)
      }
    }))
  }, [isDesktop])

  return (
    <Section className={s['section']} ref={ref}>
      <Container size="lg">
        <SectionHeading
          title="Replayable.dev"
          subtitle="Replayable.dev is an experiment in what happens when you can share replays with others. Whether you want to ask a question, explain how something works, or share a debugging journey, we believe software is more understandable when you can replay it."
          centered
        />

        <div className={s['main-mobile']}>
          <div className={s['content']}>
            <p className={s['content-title']}>{story[activeIdx || 0].title}</p>
            <p className={s['content-subtitle']}>
              {story[activeIdx || 0].subtitle}
            </p>
          </div>

          <div className={s['asset']}>
            <AspectBox ratio={785 / 627} />
            {story.map(({ Comp }, idx) => (
              <div className={s['animation-container']} key={idx}>
                {Comp && !isDesktop && <Comp active={activeIdx === idx} />}
              </div>
            ))}
          </div>

          <div className={s['progress-mobile']}>
            <ProgressBar
              markers={markers}
              animated={false}
              markerSize={14}
              ref={mobileTimeline}
              direction="horizontal"
            />
          </div>
        </div>

        <div className={s['main-desktop']}>
          <div className={s['story']} ref={storyContainerRef}>
            <div
              style={{ position: 'relative', margin: '200px 0' }}
              className={s['story-inner']}
            >
              <div className={s['progress']}>
                <ProgressBar
                  markers={markers}
                  ref={desktopTimeline}
                  animated={false}
                  direction="vertical"
                />
              </div>
              <div className={s['story-chunks']}>
                {story.map(({ title, subtitle }, idx) => (
                  <div
                    data-story-chunk-idx={idx}
                    className={s['story-chunk']}
                    key={title}
                  >
                    <div className={s['timeline']} />
                    <div
                      className={clsx(s['content'], {
                        [s['disabled']]: activeIdx !== idx
                      })}
                    >
                      <p className={s['content-title']}>
                        <span
                          id={`story-desktop-marker-${title}`}
                          className={s['timeline-marker']}
                        />
                        {title}
                      </p>
                      <p className={s['content-subtitle']}>{subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={s['asset']}>
            <AspectBox ratio={785 / 627} />
            {story.map(({ Comp }, idx) => (
              <div className={s['animation-container']} key={idx}>
                {Comp && isDesktop && <Comp active={activeIdx === idx} />}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

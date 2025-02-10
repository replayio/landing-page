import { ScrollTrigger } from '~/lib/gsap'
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

const ScrollProgressBar: FC<ScrollProgressBarProps> = ({ onProgressUpdate }) => {
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

  return <ProgressBar ref={progressRef} markers={markers} direction="vertical" animated={false} />
}

export const Hero: FC = () => {
  const [activeHeading, setActiveHeading] = useState<number | undefined>(undefined)

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
            'Learn where Replay is right now and where we are going next. Find out about our values. Meet the team and discover opportunities to join us on our journey.'
        }}
      />
    </Section>
  )
}

import React, { useRef } from 'react'

import { Section } from '~/components/common/section'
import { CameraIcon } from '~/components/icons/camera'
import { ForwardIcon } from '~/components/icons/forward'
import { MagnifyingGlassIcon } from '~/components/icons/maginifying-glass'
import { TargetIcon } from '~/components/icons/target'
import { TerminalIcon } from '~/components/icons/terminal'
import { ToolIcon } from '~/components/icons/tool'
import { Container } from '~/components/layout/container'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { useViewportSize } from '~/hooks/use-viewport-size'
import { gsap } from '~/lib/gsap'

import s from './roadmap.module.scss'

const SCROLL_TRIGGER_DURATION = 4000
const ITEM_HEIGHT = 220
const PIN_PADDING = 152

export const Roadmap = () => {
  const { height } = useViewportSize()

  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline>()

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current
      const spacer = spacerRef.current
      const items = container?.querySelectorAll(`.${s.item}`)

      const progressBar = progressBarRef.current

      if (!container || !spacer || !items || !progressBar) {
        return
      }
      gsap.set(spacer, {
        height: SCROLL_TRIGGER_DURATION
      })

      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: spacerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2
        },
        defaults: {
          duration: 15,
          ease: 'none'
        }
      })

      items.forEach((item, i) => {
        if (!tl.current) return

        const icon = item.querySelector(`.${s.iconWrapper}`)
        const svg = icon?.querySelector('svg')
        const description = item.querySelector(`.${s.description}`)
        const title = item.querySelector(`.${s.title}`)
        const year = item.querySelector(`.${s.year}`)

        tl.current

          .to(progressBar, {
            height: `${38 + i * ITEM_HEIGHT}px`
          })
          .from(
            icon,
            {
              delay: 15,
              scale: 0.25,
              background: '#4b5563'
            },
            '<'
          )
          .from(
            title,
            {
              color: '#9ca3af'
            },
            '<'
          )
          .from(
            [svg],
            {
              opacity: 0
            },
            '<'
          )
          .from(
            [description, year],
            {
              yPercent: 20,
              opacity: 0
            },
            '<'
          )
      })

      tl.current.to(progressBar, {
        height: '100%'
      })

      const totalDuration = tl.current.duration()
      const containerHeight = container.offsetHeight
      const offset = height - containerHeight - PIN_PADDING * 2

      tl.current.to(
        container,
        {
          duration: totalDuration - (totalDuration / items.length) * 2,
          y: offset
        },
        (totalDuration / items.length) * 2
      )
    }, sectionRef)

    return () => {
      ctx.revert()
      ctx.kill()
    }
  }, [height])

  return (
    <Section
      ref={sectionRef}
      data-sitemap
      data-sitemap-icon="roadmap"
      data-sitemap-short-title="Roadmap"
      data-sitemap-complete-title="The time travel  roadmap"
      className={s.section}
    >
      <TitleAndSubtitle
        title={{ children: 'The time travel  roadmap.', as: 'h2' }}
      />
      <div ref={spacerRef}>
        <div className={s.pin}>
          <Container ref={containerRef} className={s.container}>
            {data.map((item, index) => (
              <RoadmapItem key={index} {...item} />
            ))}
            <span className={s.progressBar}>
              <span ref={progressBarRef} className={s.thumb} />
            </span>
          </Container>
        </div>
      </div>
    </Section>
  )
}

const RoadmapItem = ({ title, description, year, icon: Icon }: DataType) => {
  return (
    <article
      style={{
        height: ITEM_HEIGHT
      }}
      className={s.item}
    >
      <div className={s.iconWrapper}>
        <Icon className={s.icon} />
      </div>
      <div className={s.content}>
        <div className={s.year}>{year}</div>
        <div className={s.title}>{title}</div>
        <div className={s.description}>{description}</div>
      </div>
    </article>
  )
}

type DataType = {
  title: string
  description: string
  year: string
  icon: React.FC<JSX.IntrinsicElements['svg']>
}

const data: DataType[] = [
  {
    year: '1960s',
    title: 'Early Research',
    description:
      'Researchers like Lamport and Clapp demonstrated that deterministic replay was possible.',
    icon: MagnifyingGlassIcon
  },
  {
    year: '2000s',
    title: 'Omniscient Debugging',
    description:
      'Researchers like Lewis, Shapiro, and Sagiv program state could be efficiently queried.',
    icon: TargetIcon
  },
  {
    year: '2010s',
    title: 'Record and Replay',
    description:
      'Companies like Mozilla, Microsoft, and Undo released the first systems-level record and replay debuggers.',
    icon: CameraIcon
  },
  {
    year: '2022',
    title: 'Browser DevTools',
    description:
      'We released the first browser recorder with Replayable Print Statements, Graphics, Networking, and React DevTools.',
    icon: ToolIcon
  },
  {
    year: '2024',
    title: 'Fullstack Debugging',
    description:
      'We will release the first time-travel enabled debugger for full stack JS web applications.',
    icon: TerminalIcon
  },
  {
    year: '2025',
    title: 'Replayability',
    description: 'We will release control and data flow dynamic analysis APIs',
    icon: ForwardIcon
  }
]

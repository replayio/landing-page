import { ResizeObserver } from '@juggle/resize-observer'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'

import { Carousel } from '~/components/common/carousel'
import { Section, SectionHeading } from '~/components/common/section'
import { Tabs } from '~/components/common/tabs'
import { Container } from '~/components/layout/container'
import { useMedia } from '~/hooks/use-media'
import { breakpoints } from '~/lib/constants'

import { Card } from './card'
import s from './fast-and-secure.module.scss'
import {
  browsers,
  platforms,
  Runtime,
  runtimes,
  security,
  testRunners
} from './runtimes'

const categories = [
  {
    title: 'Browsers',
    key: 'browsers',
    content: browsers
  },
  {
    title: 'Security',
    key: 'security',
    content: security
  },
  {
    title: 'Runtimes',
    key: 'runtimes',
    content: runtimes
  },
  {
    title: 'Platforms',
    key: 'platforms',
    content: platforms
  },
  {
    title: 'Test Runners',
    key: 'test-runners',
    content: testRunners
  }
]

const CarouselSection: FC<{ cards: Runtime[] }> = ({ cards }) => {
  const isDesktopSize = useMedia(`(min-width: ${breakpoints.screenLg}px)`, true)
  const [ref, bounds] = useMeasure({ scroll: true, polyfill: ResizeObserver })

  useEffect(() => {
    const lanternContainer = document.querySelector<HTMLDivElement>(
      '.cards-lantern-container'
    )
    if (!lanternContainer) return
    ref(lanternContainer)
  }, [ref])

  useEffect(() => {
    const lanternContainer = document.querySelector<HTMLDivElement>(
      '.cards-lantern-container'
    )
    if (!lanternContainer) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - bounds.left
      const y = e.clientY - bounds.top

      lanternContainer.style.setProperty('--lantern-x', `${x}px`)
      lanternContainer.style.setProperty('--lantern-y', `${y}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [bounds.left, bounds.top])

  const startIndex = Math.floor(cards.length / 2)
  const [selectedIndex, setSelectedIndex] = useState(startIndex)

  return (
    <div className={s['carousel-container']}>
      <div className={s['left-gradient']} />
      <div className={s['right-gradient']} />

      <Carousel
        config={{ startIndex }}
        className={clsx(s['slider'], 'cards-lantern-container')}
        containerClassname={s['slider-container']}
        slideClassName={s['slide-wrapper']}
        dots={!isDesktopSize}
        onSelectedIndexChange={setSelectedIndex}
      >
        {cards.map(({ icon, title, description, badge }, idx) => {
          const diff = selectedIndex - 1
          // todo check this
          const lanternIndex = idx - diff
          return (
            <div className={s['slide']} key={idx}>
              <Card
                key={idx}
                icon={icon}
                title={title}
                badge={badge}
                lanternIndex={lanternIndex}
              />
              <p className={s['description']}>{description}</p>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export const FastAndSecure: FC = () => {
  return (
    <Section className={s['section']}>
      <Container size="md">
        <SectionHeading
          title="Universal &amp; Secure"
          subtitle="We’ve spent the past 7 years researching how to record and deterministically replay runtimes securely, performantly, and reliably."
          centered
        />

        <Tabs
          className={s['tabs']}
          contentClassName={s['tabs-content']}
          defaultValue="browsers"
          tabs={categories.map(({ title, key }) => ({
            children: title,
            value: key
          }))}
          contents={categories.map(({ content, key }) => ({
            children: <CarouselSection cards={content} />,
            value: key
          }))}
        />

        <div className={s['content']}>
          <div className={s['line-container']}>
            <span className={s['line']} />
          </div>
          <p className={s['description']}>
            We believe software should be replayable regardless of where and how
            it is run.
          </p>
        </div>
      </Container>
    </Section>
  )
}

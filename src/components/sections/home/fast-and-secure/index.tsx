import clsx from 'clsx'
import { FC } from 'react'

import { Carousel } from '~/components/common/carousel'
import { Section, SectionHeading } from '~/components/common/section'
import { Tabs } from '~/components/common/tabs'
import { Container } from '~/components/layout/container'

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
  return (
    <>
      {/* DESKTOP */}
      <div className={s['grid-container']}>
        {cards.map(({ icon, title, badge }, idx) => {
          return (
            <Card key={idx} icon={icon} title={title} badge={badge} lantern />
          )
        })}
      </div>

      {/* MOBILE */}
      <div className={s['carousel-container']}>
        <div className={s['left-gradient']} />
        <div className={s['right-gradient']} />

        <Carousel
          config={{ startIndex: Math.floor(cards.length / 2) }}
          className={clsx(s['slider'], 'cards-lantern-container')}
          containerClassname={s['slider-container']}
          slideClassName={s['slide-wrapper']}
          dots
        >
          {cards.map(({ icon, title, badge }, idx) => {
            return <Card key={idx} icon={icon} title={title} badge={badge} />
          })}
        </Carousel>
      </div>
    </>
  )
}

export const FastAndSecure: FC = () => {
  return (
    <Section className={s['section']}>
      <Container size="md">
        <SectionHeading
          title="Universal &amp; Secure"
          subtitle={
            <div>
              <p>
                We’ve spent the past 7 years researching how to record and
                deterministically replay runtimes securely, performantly, and
                reliably. The result is a recorder that is enterprise ready and
                stress tested on the most ambitious applications.
              </p>
            </div>
          }
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
      </Container>
    </Section>
  )
}

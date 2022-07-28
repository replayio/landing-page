import Image, { ImageProps } from 'next/image'
import { FC, ReactNode } from 'react'

import { Badge } from '~/components/common/badge'
import { Carousel } from '~/components/common/carousel'
import { Section, SectionHeading } from '~/components/common/section'
import { Tabs } from '~/components/common/tabs'
import { Container } from '~/components/layout/container'
import { useMedia } from '~/hooks/use-media'
import { breakpoints } from '~/lib/constants'

import s from './fast-and-secure.module.scss'
import {
  browsers,
  platforms,
  Runtime,
  runtimes,
  security,
  testRunners
} from './runtimes'

type CardProps = {
  icon: ImageProps['src']
  title: string | ReactNode
  badge: string
}

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

const Card: FC<CardProps> = ({ icon, title, badge }) => {
  return (
    <div className={s['card']}>
      <div className={s['icon']}>
        <Image src={icon} width={80} height={80} alt="runtime logo" />
      </div>
      <p className={s['title']}>{title}</p>
      <Badge className={s['badge']} text={badge} />
    </div>
  )
}

const CarouselSection: FC<{ cards: Runtime[] }> = ({ cards }) => {
  const isDesktopSize = useMedia(`(min-width: ${breakpoints.screenLg}px)`, true)

  return (
    <div className={s['carousel-container']}>
      <div className={s['left-gradient']} />
      <div className={s['right-gradient']} />

      <Carousel
        config={{ startIndex: Math.floor(cards.length / 2) }}
        className={s['slider']}
        containerClassname={s['slider-container']}
        slideClassName={s['slide-wrapper']}
        dots={!isDesktopSize}
      >
        {cards.map(({ icon, title, description, badge }, idx) => (
          <div className={s['slide']} key={idx}>
            <Card key={idx} icon={icon} title={title} badge={badge} />
            <p className={s['description']}>{description}</p>
          </div>
        ))}
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

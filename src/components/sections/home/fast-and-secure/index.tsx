import range from 'lodash/range'
import Image, { ImageProps } from 'next/image'
import { FC } from 'react'
import { Badge } from '~/components/common/badge'

import { Carousel } from '~/components/common/carousel'
import { Section, SectionHeading } from '~/components/common/section'
import { Tabs } from '~/components/common/tabs'
import { Container } from '~/components/layout/container'
import { useMedia } from '~/hooks/use-media'
import { breakpoints } from '~/lib/constants'
import chromeSvg from '~/public/images/logos/chrome.svg'

import s from './fast-and-secure.module.scss'

type CardProps = {
  icon: ImageProps['src']
  title: string
  badge: string
}

const cards = range(5).map(() => ({
  icon: chromeSvg,
  title: 'Chromium',
  badge: 'Beta',
  description:
    'We believe software should be replayable regardless of where and how it is run.'
}))

const categories = [
  {
    title: 'Browsers',
    key: 'browsers',
    content: cards
  },
  {
    title: 'Security',
    key: 'security',
    content: cards
  },
  {
    title: 'Runtimes',
    key: 'runtimes',
    content: cards
  },
  {
    title: 'Platforms',
    key: 'platforms',
    content: cards
  },
  {
    title: 'Test Runners',
    key: 'test-runners',
    content: cards
  }
]

const Card: FC<CardProps> = ({ icon, title, badge }) => {
  return (
    <div className={s['card']}>
      <div className={s['icon']}>
        <Image src={icon} alt={title} />
      </div>
      <p className={s['title']}>{title}</p>
      <Badge className={s['badge']} text={badge} />
    </div>
  )
}

const CarouselSection: FC<{ cards: typeof cards }> = ({ cards }) => {
  const isDesktop = useMedia(`(min-width: ${breakpoints.screenLg}px)`)

  return (
    <div className={s['carousel-container']}>
      <div className={s['left-gradient']} />
      <div className={s['right-gradient']} />

      <Carousel
        config={{ startIndex: Math.floor(cards.length / 2) }}
        className={s['slider']}
        dots={!isDesktop}
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

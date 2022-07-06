import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

import { Section, SectionHeading } from '~/components/common/section'
import { Tabs } from '~/components/common/tabs'
import { Container } from '~/components/layout/container'
import chromeSvg from '~/public/images/logos/chrome.svg'

import s from './fast-and-secure.module.scss'

type CardProps = {
  icon: ImageProps['src']
  title: string
  badge: string
}

const cards = [...Array(5)].map(() => ({
  icon: chromeSvg,
  title: 'Chromium',
  badge: 'Beta'
}))

const Card: FC<CardProps> = ({ icon, title, badge }) => {
  return (
    <div className={s['card']}>
      <div className={s['icon']}>
        <Image src={icon} alt={title} />
      </div>
      <p className={s['title']}>{title}</p>
      <span className={s['badge']}>{badge}</span>
    </div>
  )
}

export const FastAndSecure: FC = () => {
  return (
    <Section className={s['section']}>
      <Container size="md">
        <SectionHeading
          title="Fast &amp; Secure"
          subtitle="We’ve spent the past 7 years researching how to record and deterministically replay runtimes securely, performantly, and reliably."
          centered
        />

        <Tabs
          className={s['tabs']}
          tabs={[
            { title: 'Browsers' },
            { title: 'Security' },
            { title: 'Runtimes' },
            { title: 'Platforms' },
            { title: 'Test Runners' }
          ]}
        />
        <div className={s['slider']}>
          {cards.map((card) => (
            <Card
              icon={card.icon}
              title={card.title}
              badge={card.badge}
              key={card.title}
            />
          ))}
        </div>
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

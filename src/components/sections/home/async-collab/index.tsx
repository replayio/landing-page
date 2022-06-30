import { FC } from 'react'

import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import s from './async-collab.module.scss'

type CardProps = {
  title: string
  subtitle?: string
}

const Card: FC<CardProps> = ({ title, subtitle }) => (
  <div className={s['card']}>
    <div className={s['card-heading']}>
      <h4 className={s['title']}>{title}</h4>
      <p className={s['subtitle']}>{subtitle}</p>
    </div>
    <div className={s['card-animation']}></div>
  </div>
)

export const AsyncCollab: FC = () => {
  return (
    <Section className={s['section']}>
      <Container size="md">
        <SectionHeading
          centered
          title="Async Collaboration"
          subtitle="We’ve spent the past 7 years researching how to record and
          deterministically replay runtimes securely, performantly, and
          reliably."
        />
        <div className={s['cards']}>
          <Card
            title="Bug Reports"
            subtitle="Record the issue once. Never reproduce the issue locally again."
          />
          <Card
            title="Pull requests"
            subtitle="Include replays in descriptions. Receive feedback faster."
          />
          <Card
            title="Feedback"
            subtitle="Share all the context. Avoid draining back-and-forths."
          />
          <Card
            title="Automated Tests"
            subtitle="Record end-to-end tests in CI. Fix flakey tests once and for all."
          />
        </div>
      </Container>
    </Section>
  )
}

import clsx from 'clsx'
import { FC } from 'react'

import { PlayIcon } from '~/components/common/play-icon'
import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button } from '~/components/primitives/button'

import s from './async-collab.module.scss'
import { AutomatedTests, BugReports, PullRequests } from './illustrations'

type CardProps = {
  title: string
  subtitle?: string
  contentSpacing: 'sm' | 'lg'
}

const Card: FC<CardProps> = ({ title, subtitle, children, contentSpacing }) => (
  <div className={s['card']}>
    <div className={s['card-heading']}>
      <h4 className={s['title']}>{title}</h4>
      <p className={s['subtitle']}>{subtitle}</p>
    </div>
    <div className={clsx(s['card-content'], s[`spacing-${contentSpacing}`])}>
      {children}
    </div>
  </div>
)

export const AsyncCollab: FC = () => {
  return (
    <Section className={s['section']}>
      <Container size="md">
        <SectionHeading
          centered
          title="Async Collaboration"
          subtitle="Replay lets you collaborate with your team in new ways. Because replays are as easy to record as a video and as powerful to inspect as running application, you can easily file the perfect bug report, answer a new team member’s question, give feedback on a new feature, and even debug a failing test. The possibilities are endless."
        />
        <div className={s['cta']}>
          <Button variant="tertiary-inverted">
            Learn more <PlayIcon style={{ marginLeft: 8 }} />
          </Button>
        </div>
        <div className={s['cards']}>
          <Card
            contentSpacing="lg"
            title="Bug Reports"
            subtitle="Record the issue once. Never reproduce the issue locally again."
          >
            <BugReports />
          </Card>
          <Card
            contentSpacing="lg"
            title="Automated Tests"
            subtitle="Record end-to-end tests in CI. Fix flakey tests once and for all."
          >
            <AutomatedTests />
          </Card>
          <Card
            contentSpacing="sm"
            title="Pull requests"
            subtitle="Include replays in descriptions. Receive feedback faster."
          >
            <PullRequests />
          </Card>
          <Card
            contentSpacing="sm"
            title="Feedback"
            subtitle="Share all the context. Avoid draining back-and-forths."
          />
        </div>
      </Container>
    </Section>
  )
}

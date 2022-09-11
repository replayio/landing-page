import clsx from 'clsx'
import { FC } from 'react'

import { Badge } from '~/components/common/badge'
import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { ButtonLink } from '~/components/primitives/button'

import s from './async-collab.module.scss'
import { BugReports, EndToEndTests, Feedback, PullReq } from './illustrations'

type CardProps = {
  title: string
  subtitle?: string
  contentSpacing: 'sm' | 'lg'
  beta?: boolean
}

const Card: FC<CardProps> = ({
  title,
  subtitle,
  children,
  contentSpacing,
  beta = false
}) => (
  <div className={s['card']}>
    <div className={s['card-heading']}>
      <h4 className={s['title']}>
        {title}{' '}
        {beta && (
          <Badge className={s['badge']} variant="secondary" text="Beta" />
        )}
      </h4>
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
          subtitle="Replays are as easy to record as a video. And because anyone can debug a replay, sharing replays with your team lets you avoid needless back-and-forths and collaborate in new ways."
        />
        <div className={s['cta']}>
          <ButtonLink
            href="https://app.replay.io/team/new"
            variant="secondary"
            style={{ marginTop: '0rem' }}
          >
            Create Replay Team
          </ButtonLink>
        </div>
        <div className={s['cards']}>
          <Card
            contentSpacing="lg"
            title="Bug Reports"
            subtitle={`Add replays to bug reports so that anyone on the team can debug the issue with a single click and you'll never hear "Works for me" again.`}
          >
            <BugReports />
          </Card>
          <Card
            contentSpacing="lg"
            title="End-to-End Tests"
            subtitle="Record your tests in CI and debug them after the fact. You’ll love how easy it is to open the replay and see whether you broke the test or if it was simply flaky."
            beta
          >
            <EndToEndTests />
          </Card>
          <Card
            contentSpacing="sm"
            title="Pull requests"
            subtitle="When you include replays in your PR, they act as preview branches for your code. Reviewers are able to open the replay and see what was going wrong before and how you fixed it. "
          >
            <PullReq />
          </Card>
          <Card
            contentSpacing="sm"
            title="Feedback"
            subtitle="When you ask a question in Slack and include a replay, your team members are able to open the replay and comment on the code alongside you."
          >
            <Feedback />
          </Card>
        </div>
      </Container>
    </Section>
  )
}

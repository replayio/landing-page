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
          subtitle="As easy to record as a video.  Sharing replays with your team lets you avoid needless back-and-forths and collaborate in new ways."
        />
        <div className={s['cta']}>
          <ButtonLink
            href="https://app.replay.io/team/new"
            variant="secondary"
            style={{ marginTop: '0rem' }}
          >
            Create Team
          </ButtonLink>
        </div>
        <div className={s['cards']}>
          <Card
            contentSpacing="lg"
            title="Bug Reports"
            subtitle="Add replays to bug reports so that anyone on the team can debug the issue with a single click."
          >
            <BugReports />
          </Card>
          <Card
            contentSpacing="lg"
            title="End-to-End Tests"
            subtitle="Record your tests in CI and debug them after the fact. You’ll love how easy it is to see whether you broke the test or if it was simply flaky."
            beta
          >
            <EndToEndTests />
          </Card>
          <Card
            contentSpacing="sm"
            title="Pull requests"
            subtitle="Include replays of the problem and the fix in the PR so that reviewers can see what was wrong and how it was fixed."
          >
            <PullReq />
          </Card>
          <Card
            contentSpacing="sm"
            title="Feedback"
            subtitle="Share replays in Slack when you want to get others feedback.In context comments make it easy to discuss function calls and ui elements."
          >
            <Feedback />
          </Card>
        </div>
      </Container>
    </Section>
  )
}

import { FC } from 'react'

import { HeadingSet } from '~/components/common/heading-set'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import s from './main-features.module.scss'

const ProgressBar = () => {
  return (
    <div className={s['progress-bar']}>
      <div className={s['progress-bar__bar']} />
      <div className={s['progress-bar__thumb']} />
    </div>
  )
}

export const MainFeatures: FC = () => {
  return (
    <Section className={s['section']}>
      <Container size="sm">
        <div className={s['main-features']}>
          <HeadingSet
            overtitle="Time Travel"
            title={
              <>
                Debug your application as&nbsp;if it is running locally on your
                computer.
              </>
            }
            description="Inspect React components, view Network events, everything you need is at the tip of your fingers."
          />

          <div>
            <ProgressBar />
          </div>

          <HeadingSet
            overtitle="Async Collaboration"
            title="Add replays to Bug Reports and Pull Requests and share them in Slack."
            description="Collaboratively debug the hardest problems asynchronously."
          />
        </div>
      </Container>
    </Section>
  )
}

import { FC } from 'react'

import { Carousel } from '~/components/common/carousel'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import { Card } from './card'
import s from './hero.module.scss'

const bugreportingPlans = [
  {
    type: 'Individual',
    price: 'Free',
    mode: 'forever',
    cta: 'Sign Up',
    link: 'https://app.replay.io/',
    features: [
      'GitHub PR Comments',
      'GitHub Action',
      'Test Suite Dashboard',
      ''
    ]
  },

  {
    type: 'Team',
    price: 20,
    mode: 'per month / per developer',
    cta: 'Create Team',
    link: 'https://app.replay.io/team/new',
    features: [
      '1000 recordings per month',
      'Up to 10 users + developers',
      'Source map uploads',
      'Record automated tests'
    ]
  },
  {
    type: 'Organization',
    price: 75,
    mode: 'per month / per developer',
    cta: 'Create Organization',
    link: 'https://app.replay.io/org/new',
    features: [
      '10,000 recordings per month',
      'Up to 100 users + developers',
      'Account-level access controls',
      'Additional organizational settings',
      'Additional SSO integrations'
    ]
  },
  {
    type: 'Enterprise',
    cta: 'Email Us',
    link: 'mailto:sales@replay.io',
    features: [
      'Unlimited recordings',
      'Ability to host your own storage',
      'Custom contract',
      'Dedicated support',
      'SLAs'
    ]
  }
]

const testsuitePlans = [
  {
    type: 'Free',
    price: 'Free',
    mode: 'forever',
    cta: 'Sign Up',
    link: 'https://app.replay.io/',
    features: [
      '➡️ Update these!',
      'GitHub PR Comments',
      'GitHub Action',
      'Test Suite Dashboard',
      'Cypress + Playwright DevTools'
    ]
  },
  {
    type: 'Starter',
    price: 20,
    mode: 'per month / per developer',
    cta: 'Create Team',
    link: 'https://app.replay.io/team/new',
    features: ['➡️ Update these!', 'GitHub Integration', 'Fast start times']
  },
  {
    type: 'Pro',
    price: 75,
    mode: 'per month / per developer',
    cta: 'Create Organization',
    link: 'https://app.replay.io/org/new',
    features: [
      '➡️ Definitely update these!',
      'Upload + Processing Strategies: With the ability to decide which recordings are uploaded and processed on commit and merge, you’re in control of which recordings your team can debug efficiently.'
    ]
  },

  {
    type: 'Enterprise',
    cta: 'Email Us',
    link: 'mailto:sales@replay.io',
    features: [
      '➡️ Update these!',
      'Custom Upload + Processing Strategies',
      'Bring your own storage',
      'Integrations into your own dashboard'
    ]
  }
]

export const Hero: FC<{ selectedTab: string }> = ({ selectedTab }) => {
  const selectedPlans =
    selectedTab === 'testsuite' ? testsuitePlans : bugreportingPlans

  return (
    <Section className={s.section}>
      <Container className={s.container} size="md">
        <div className={s['hero']}>
          <ul className={s.plans}>
            {selectedPlans.map((item, i) => (
              <li key={i}>
                <Card
                  variant={item.type === 'Organization' ? 'primary' : 'default'}
                  data={item}
                />
              </li>
            ))}
          </ul>
          <div className={s.plans__mobile}>
            <Carousel className={s.slider} slideClassName={s['slide']}>
              {selectedPlans.map((item, i) => (
                <Card
                  variant={item.type === 'Organization' ? 'primary' : 'default'}
                  key={i}
                  data={item}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </Container>
    </Section>
  )
}

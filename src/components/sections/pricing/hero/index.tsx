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
    features: ['GitHub PR Comments', 'GitHub Action', 'Test Suite Dashboard']
  },

  {
    type: 'Team',
    price: 20,
    mode: 'per month / per developer',
    cta: 'Create team',
    link: 'https://app.replay.io/team/new',
    features: [
      '200 recordings per month',
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
    link: 'https://app.replay.io/team/new',
    features: [
      '1,000 recordings per month',
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
    features: ['Ability to host your own storage', 'Custom contract', 'Dedicated support', 'SLAs']
  }
]

const testsuitePlans = [
  {
    type: 'Free',
    price: 'Free',
    mode: 'forever',
    cta: 'Get in touch',
    features: [
      '10 recordings processed',
      '100 recordings uploaded',
      '7 day retention',
      'Unlimited seats'
    ]
  },
  {
    type: 'Starter',
    price: 50,
    mode: 'per month ',
    cta: 'Get in touch',
    features: [
      '100 recordings processed',
      '1,000 recordings uploaded',
      '7 day retention',
      'Unlimited seats'
    ]
  },
  {
    type: 'Pro',
    price: 500,
    mode: 'per month',
    cta: 'Get in touch',
    features: [
      '1,000 recordings processed',
      '10,000 recordings uploaded',
      '14 day retention',
      'Unlimited seats',
      'Account-level access controls',
      'Additional SSO integrations'
    ]
  },

  {
    type: 'Enterprise',
    cta: 'Email us',
    link: 'mailto:sales@replay.io',
    features: [
      '30 day retention',
      'Unlimited seats',
      'Ability to host your own storage',
      'Custom contract',
      'Dedicated support'
    ]
  }
]

export const Hero: FC<{ selectedTab: string }> = ({ selectedTab }) => {
  const selectedPlans = selectedTab === 'tests' ? testsuitePlans : bugreportingPlans

  return (
    <Section className={s.section}>
      <Container className={s.container} size="md">
        <div className={s['hero']}>
          <ul className={s.plans}>
            {selectedPlans.map((item, i) => (
              <li key={i}>
                <Card mode={selectedTab} data={item} />
              </li>
            ))}
          </ul>
          <div className={s.plans__mobile}>
            <Carousel className={s.slider} slideClassName={s['slide']}>
              {selectedPlans.map((item, i) => (
                <Card
                  variant={item.type === 'Pro' ? 'primary' : 'default'}
                  key={i}
                  mode={selectedTab}
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

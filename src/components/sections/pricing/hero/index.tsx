import clsx from 'clsx'
import { FC, useState } from 'react'

import { Carousel } from '~/components/common/carousel'
import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import { Card } from './card'
import s from './hero.module.scss'
import { PricingModes, Toggle } from './toggle'

const bugsPlansData = [
  {
    type: 'Individual',
    price: 'Free',
    mode: 'forever',
    cta: 'Sign Up',
    link: 'https://app.replay.io/',
    features: ['100 recordings per month', 'Privacy controls', 'Google SSO']
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
const testsPlansData = [
  {
    type: 'Replay for CI',
    cta: 'Email Us',
    link: 'mailto:sales@replay.io',
    features: ['Unlimited recordings', 'Trace Viewer', 'Dedicated support']
  }
]

export const Hero: FC = () => {
  const [mode, setMode] = useState<PricingModes>('bugs')

  const plansData = mode === 'bugs' ? bugsPlansData : testsPlansData

  return (
    <Section className={s.section}>
      <Container className={s.container} size="md">
        <div className={s['hero']}>
          <div className={s['heading']}>
            <Heading as="h1" size="sm">
              Pricing
            </Heading>
            <span>
              Individuals and open source communities
              <br /> will always be able to use Replay for free.
            </span>
          </div>
          <div className={s.toggle}>
            <Toggle mode={mode} setMode={setMode} />
          </div>
          <ul className={clsx(s.plans, { [s.tests]: mode === 'tests' })}>
            {plansData.map((item, i) => (
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
              {plansData.map((item, i) => (
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

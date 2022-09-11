import { FC } from 'react'

import { Carousel } from '~/components/common/carousel'
import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import { Card } from './card'
import s from './hero.module.scss'

const plansData = [
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
      '100 recordings per month',
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
      '100 recordings per month',
      'Up to 10 users + developers',
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

export const Hero: FC = () => {
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
          <ul className={s.plans}>
            {plansData.map((item, i) => (
              <Card
                variant={item.type === 'Organization' ? 'primary' : 'default'}
                key={i}
                data={item}
              />
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

import clsx from 'clsx'
import Image from 'next/future/image'
import { FC, useState } from 'react'

import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button } from '~/components/primitives/button'
import { Link } from '~/components/primitives/link'

import { plans } from './plans'
import s from './plans.module.scss'

// type PlansProps = {}

const tabs = ['Individual', 'Team', 'Organization', 'Enterprise']

export const Plans: FC = () => {
  const [activeKey, setActiveKey] = useState(0)

  return (
    <Section className={s.section}>
      <Container className={s.container} size="lg">
        <div className={s['heading']}>
          <Heading size="sm">Plans</Heading>
          <div className={s['tabs-container']}>
            <div className={s.tabs}>
              {tabs.map((tab, i) => (
                <Link
                  href={`#${tab}`}
                  onClick={() => setActiveKey(i)}
                  className={clsx({ [s.active]: activeKey === i })}
                  key={i}
                >
                  {tab}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className={s['plan-container']}>
          {plans.map((plan, i) => (
            <div key={i} className={s.plan} id={plan.type}>
              <div>
                <Image src={plan.icon} alt={plan.type} />
                <span>{plan.type}</span>
                <span>{plan.description}</span>
                <Button
                  variant={plan.type === 'Enterprise' ? 'tertiary' : 'primary'}
                >
                  {plan.cta}
                </Button>
              </div>
              <div>
                {plan.content.map((item, i) => (
                  <div key={i}>
                    {item.features && (
                      <>
                        <span>{item.features.title}</span>
                        <ul>
                          {item.features.items.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    <span>{item.title}</span>
                    <span>{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

import clsx from 'clsx'
import Image from 'next/future/image'
import { FC, useEffect, useRef, useState } from 'react'

import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { ButtonLink } from '~/components/primitives/button'

import { plans } from './plans'
import s from './plans.module.scss'

const tabs = ['Individual', 'Team', 'Organization', 'Enterprise']

export const Plans: FC = () => {
  const [activeKey, setActiveKey] = useState(0)
  const [isStuck, setIsStuck] = useState(false)

  const tabsRef = useRef<HTMLDivElement>(null)
  const plansRefs = useRef<(HTMLDivElement | null)[]>([])

  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    plansRefs.current = Array.from({ length: plans.length })
  }, [])

  useEffect(() => {
    if (!plansRefs.current) return

    const plans = plansRefs.current

    for (const plan of plans) {
      if (!plan) return

      if (plan?.getBoundingClientRect().top < 400) {
        setActiveKey(plans.indexOf(plan))
      }
    }
  }, [scrollPosition])

  useEffect(() => {
    if (!tabsRef.current) return

    const distanceTop = tabsRef.current.getBoundingClientRect().top

    if (distanceTop < 77) {
      setIsStuck(true)
    } else {
      setIsStuck(false)
    }
  }, [tabsRef, scrollPosition])

  const navigateToPlan = (key: number) => {
    if (!plansRefs.current) return

    const plans = plansRefs.current
    if (!plans[key]) return

    plans[key]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Section className={s.section}>
      <div className={s['heading']}>
        <Heading size="sm">Plans</Heading>
      </div>
      <div
        className={clsx(s['tabs-container'], { [s.stuck]: isStuck === true })}
        ref={tabsRef}
      >
        <Container className={s['inner-container']}>
          {isStuck && <span>Plans</span>}
          <div className={s.tabs}>
            {tabs.map((tab, i) => (
              <button
                onClick={() => navigateToPlan(i)}
                className={clsx({ [s.active]: activeKey === i })}
                key={i}
              >
                {tab}
              </button>
            ))}
          </div>
        </Container>
      </div>
      <Container className={s.container}>
        <div className={s['plan-container']}>
          {plans.map((plan, i) => (
            <div
              key={i}
              ref={(divElement) => (plansRefs.current[i] = divElement)}
              className={clsx(s.plan)}
              id={plan.type}
            >
              <div>
                <Image src={plan.icon} alt={plan.type} />
                <span>{plan.type}</span>
                <span>{plan.description}</span>
                <ButtonLink
                  href={plan.link}
                  variant={plan.type === 'Enterprise' ? 'tertiary' : 'primary'}
                >
                  {plan.cta}
                </ButtonLink>
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

import clsx from 'clsx'
import Image from 'next/future/image'
import { FC, useEffect, useRef, useState } from 'react'

import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button } from '~/components/primitives/button'
import { Link } from '~/components/primitives/link'

import { plans } from './plans'
import s from './plans.module.scss'

const tabs = ['Individual', 'Team', 'Organization', 'Enterprise']

export const Plans: FC = () => {
  const [activeKey, setActiveKey] = useState(0)
  const [isStuck, setIsStuck] = useState(false)

  const tabsRef = useRef<HTMLDivElement>(null)

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
    if (!tabsRef.current) return
    const distanceTop = tabsRef.current.getBoundingClientRect().top
    if (distanceTop < 77) {
      setIsStuck(true)
    } else {
      setIsStuck(false)
    }
  }, [tabsRef, scrollPosition])

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
        </Container>
      </div>
      <Container className={s.container}>
        <div className={s['plan-container']}>
          {plans.map((plan, i) => (
            <div key={i} className={clsx(s.plan)} id={plan.type}>
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

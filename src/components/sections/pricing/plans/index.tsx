import { PopupButton } from '@typeform/embed-react'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'

import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button, ButtonLink } from '~/components/primitives/button'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import enterprise from '~/public/images/pricing/enterprise.svg'
import individual from '~/public/images/pricing/individual.svg'
import organization from '~/public/images/pricing/organization.svg'
import team from '~/public/images/pricing/team.svg'

import s from './plans.module.scss'

type Plan = {
  type: string
  icon: any
  description: string | React.ReactNode
  cta: string
  link?: string
  content: Array<{
    title?: string
    description?: string | React.ReactNode
    features?: {
      title: string
      items: string[]
    }
  }>
}

export const bugreportingPlans: Plan[] = [
  {
    type: 'Individual',
    icon: individual,
    description:
      'Replay will always be free for local development, open source, and collaboration.',
    cta: 'Sign Up',
    link: 'https://app.replay.io/',
    content: [
      {
        features: {
          title: 'Perfect for',
          items: [
            'Debugging your app locally',
            'Posting a question on StackOverflow',
            'Adding a replay to a GitHub issue',
            'Getting feedback from friends'
          ]
        }
      },
      {
        title: 'Private by default',
        description:
          'Replays are private by default so that you have the ability to decide if you would like to make your replay publicly available or invite collaborators.'
      },
      {
        title: 'Single sign on authentication',
        description:
          'Google SSO is available by default for all of our plan levels because security should not be expensive.'
      }
    ]
  },
  {
    type: 'Team',
    icon: team,
    description:
      'Team workspaces make it easy to collaborate, manage recordings, and track conversations so that bugs get fixed faster.',
    cta: 'Create Team',
    link: 'https://app.replay.io/team/new',
    content: [
      {
        title: 'Only pay for developers on your team',
        description:
          'Replay is best when anyone on the team can record and collaborate within Replay. This is why teams can be up to ten users and you only pay per developer.'
      },
      {
        title: 'Upload source maps',
        description: `Upload source maps at deploy time to Replay's secure backend with our Webpack and Next.js integrations or CLI. Because source maps are associated with the team, only members will have access to them.`
      },
      {
        title: 'Create recordings programmatically',
        description: `Record Node scripts and Playwright and Puppeteer tests in CI with API Keys. With Replay, you can record the flaky test once and debug it directly.`
      },
      {
        title: 'Open source communities',
        description: `Teams are a safe way for open source communities to receive private replays that only maintainers will be able to view. Email support@replay.io and we'll cover the cost.`
      }
    ]
  },
  {
    type: 'Organization',
    icon: organization,
    description:
      'Organization includes Team workspaces with additional controls around access and recordings, SSO / SAML integration and Enterprise Security features.',
    cta: 'Create Organization',
    link: 'https://app.replay.io/team/new',
    content: [
      {
        features: {
          title: 'Account-level access controls',
          items: [
            'Limit team members by email domain',
            'Disable public recordings',
            'Allow and block recordings on specific domains'
          ]
        }
      },
      {
        title: 'Multiple Teams',
        description:
          'Create multiple teams for different workflows, environments and teams within your Organization. We set an Org-wide cap at 10k recordings / month and up to 100 users / developers.'
      },
      {
        title: 'Test Suites',
        description:
          'We offer custom integrations with your e2e test runner and CI/CD pipeline e.g. Playwright, Cypress. Add Replay to CI, upload Replay for test failures to record and debug flaky tests. '
      },
      {
        title: 'Single sign on authentication',
        description: `Replay handles authentication with Google SSO by default. Additional identity providers and authentication protocols of your choice are available e.g Okta.`
      }
    ]
  },
  {
    type: 'Enterprise',
    icon: enterprise,
    description:
      'The enterprise plan offers additional controls around how Replays are managed, how they are recorded, and how they are stored. We also happy to discuss additional customizations around security, platform support, and debugging functionality.',
    cta: 'Email Us',
    link: 'mailto:sales@replay.io',
    content: [
      {
        title: 'Own your data',
        description: `Retain full control of your Replay data. Host a storage bucket that Replay uses to store all of your replays. Revoke and monitor access to your replay data.`
      },
      {
        title: 'Support',
        description: `Access to dedicated support and a 99.9% uptime commitment for all scheduled availability.`
      },
      {
        title: 'Custom integrations',
        description:
          'Integrate Replay into your existing bug reporting, CI/CD, and development workflows. e.g. Jira, Jenkins, Selenium, Sentry, NextJS'
      }
    ]
  },
  {
    type: 'Open Source',
    icon: organization,
    description:
      'Our Open Source Plan offers the same features of our Team Plan with more flexibility on the number of users and developers.',
    cta: 'Email Us',
    link: 'mailto:sales@replay.io',
    content: [
      {
        title: 'Team Plan',
        description: `Access to Team Plan features with flexibility on the number of seats for developers and users to fit large and growing Open Source projects taht want to use Replay at scale.`
      },
      {
        title: 'Issue Template Best Practices',
        description: `Documentation and onboarding support to get your bug report process in good shape with Replay.`
      },
      {
        title: 'Team Inbox',
        description: `Contributors can submit Replays and share them with maintainers so they can be easily triaged with source map support.`
      }
    ]
  }
]

export const testsuitePlans: Plan[] = [
  {
    type: 'Free',
    icon: individual,
    description: 'For side projects with a few end-to-end tests',
    cta: 'Get in touch',
    content: [
      {
        features: {
          title: 'Workflow integrations',
          items: ['GitHub PR Comments', 'GitHub Action', 'Test Suite Dashboard']
        }
      },
      {
        title: 'Cypress + Playwright DevTools',
        description:
          'Replays recorded with our Cypress and Playwright plugins will include a testing panel with ability to play to test steps, view step details, and jump into application event handlers.'
      }
    ]
  },
  {
    type: 'Starter',
    icon: team,
    description: 'For small teams with fewer than 50 end-to-end tests running in CI',
    cta: 'Get in touch',
    content: [
      {
        title: 'Fast start times',
        description: 'Everything in the free tier but faster and with more recordings.'
      }
    ]
  },
  {
    type: 'Pro',
    icon: organization,
    description: 'For mature teams with between 20-200 tests running in CI',
    cta: 'Get in touch',
    content: [
      {
        title: 'Upload + Processing Strategies',
        // @ts-ignore
        description: (
          <div>
            <p>
              Decide which recordings are uploaded and processed based on commit and merge
              strategies. This is most useful once you have a large suite and want to more control
              over which recordings start quickly.
            </p>
          </div>
        )
      }
    ]
  },
  {
    type: 'Enterprise',
    icon: enterprise,
    description: 'For large engineering teams looking to manage their test suite at scale.',
    cta: 'Email Us',
    link: 'mailto:sales@replay.io',
    content: [
      {
        title: 'Custom Upload + Processing Strategies',
        description:
          'Design your own upload + processing strategies. This is only necessary for the largest test suites + teams that run hundreds of thousands of tests a day.'
      },
      {
        title: 'Bring your own storage',
        description:
          'Store your recordings in the storage provider of their choice (typically S3). This is most useful for access controls, but can also be helpful for additional cost controls.'
      },
      {
        title: 'Integrations into your own dashboard',
        description:
          'Use Replay’s GraphQL APIs to integrate Replay.io recording metadata into their in house dashboards.'
      }
    ]
  }
]

const bugreportingTabs = ['Individual', 'Team', 'Organization', 'Enterprise', 'Open Source']
const testsuiteTabs = ['Free', 'Starter', 'Pro', 'Enterprise']

export const Plans: FC<{ selectedTab: string }> = ({ selectedTab }) => {
  const [activeKey, setActiveKey] = useState(0)
  const [isStuck, setIsStuck] = useState(false)
  const selectedPlans = selectedTab === 'tests' ? testsuitePlans : bugreportingPlans
  const tabs = selectedTab === 'tests' ? testsuiteTabs : bugreportingTabs

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
    plansRefs.current = Array.from({ length: bugreportingPlans.length })
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
      <TitleAndSubtitle
        title={{
          children: <>Plans</>,
          hero: true
        }}
        subtitle={{
          children: ''
        }}
      />
      <div
        className={clsx(s['tabs-container'], {
          [s.stuck as string]: isStuck === true
        })}
        ref={tabsRef}
      >
        <Container className={s['inner-container']}>
          {isStuck && <span>Plans</span>}
          <div className={s.tabs}>
            {tabs.map((tab, i) => (
              <button
                onClick={() => navigateToPlan(i)}
                className={clsx({ [s.active as string]: activeKey === i })}
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
          {selectedPlans.map((plan, i) => (
            <div
              key={i}
              ref={(divElement) => {
                plansRefs.current[i] = divElement
              }}
              className={clsx(s.plan)}
              id={plan.type}
            >
              <div>
                <Image src={plan.icon} alt={plan.type} />
                <span>{plan.type}</span>
                <span>{plan.description}</span>
                {plan.link ? (
                  <ButtonLink href={plan.link} variant="tertiary-inverted-alt">
                    {plan.cta}
                  </ButtonLink>
                ) : (
                  <PopupButton id="jTudlerL" className={s.cta}>
                    <Button
                      variant="tertiary-inverted-alt"
                      aria-label="Learn more about Test Suites"
                    >
                      {plan.cta}
                    </Button>
                  </PopupButton>
                )}{' '}
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

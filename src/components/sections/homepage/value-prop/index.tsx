import Link from 'next/link'
import React from 'react'

import { TitleAndSubtitle } from '~/components/primitives/texts'

import s from './value-prop.module.scss'

const ValueProp = () => {
  const valuePropsData = [
    {
      title: 'Stop reproducing bugs',
      description:
        'Say goodbye to screenshots, videos, and repro steps. Recording a bug with Replay lets anyone debug it as if it happened on their own machine.',
      link: '/overview#stop-reproducing-bugs',
      linkText: 'Learn More'
    },
    {
      title: 'Support your users with ease',
      description:
        'Bugs reported by QA and users with Replay are fully actionable and quickly understood by developers. Never close issues again for a lack of information.',
      link: '/overview#support-your-users',
      linkText: 'Learn More'
    },
    {
      title: 'Fix all your flaky tests',
      description:
        'Debugging a flaky test failure with Replay is just as easy as any other bug. Stop struggling to understand these failures, or suppressing tests because they don’t pass reliably.',
      link: '/overview#fix-all-your-flaky-tests',
      linkText: 'Learn More'
    },
    {
      title: 'Deploy with confidence',
      description:
        'Building a thorough and rock solid test suite is easy with Replay and really hard without it. This lets you deploy whenever you want and catch more issues before they hit users.',
      link: '/overview#deploy-with-confidence',
      linkText: 'Learn More'
    },
    {
      title: 'Debug test failures remotely',
      description:
        'With Replay you can directly debug test failures that happened in CI as if they happened on your own machine. There is no need to locally reproduce the failure, or pore over logs or videos.',
      link: '/overview#debug-test-failures-remotely',
      linkText: 'Learn More'
    },
    {
      title: 'Modernize your test suite',
      description:
        'Replay is easy to integrate with any test suite regardless of its framework. Get the best debugging experience in the world without rewriting any of your tests.',
      link: '/overview#modernize-your-test-suite',
      linkText: 'Learn More'
    }
  ]

  return (
    <div className={s.componentWrapper}>
      <div className={s.timeTravelHero}>
        <TitleAndSubtitle
          title={{
            as: 'h2',
            children: 'Travel Back in Time',
            className: s.timeTravelHero
          }}
          subtitle={{
            children: (
              <span className={s.timeTravelText}>
                Replay is a next-generation time travel debugger. With low overhead, the browser
                records just enough so it can be replayed exactly and inspected down to the finest
                detail. <br />
                <br />
                <Link href="/overview">Learn more</Link>
              </span>
            )
          }}
        />
      </div>

      <div className={s.columns}>
        {valuePropsData.map((item, index) => (
          <React.Fragment key={index}>
            <div className={s.valueProp}>
              <TitleAndSubtitle
                title={{
                  as: 'h2',
                  children: item.title,
                  className: s.header
                }}
                subtitle={{
                  children: <span>{item.description}</span>
                }}
              />
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  color: '#9ca3af',
                  textDecoration: 'underline'
                }}
              >
                <Link href={item.link}>{item.linkText}</Link>
              </div>
            </div>
            {index === 1 && <hr className={s.divider} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ValueProp

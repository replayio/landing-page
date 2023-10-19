import Link from 'next/link'
import React from 'react'

import { TitleAndSubtitle } from '~/components/primitives/texts'

const ValueProp = () => {
  const valuePropsData = [
    {
      title: 'Stop Reproducing Bugs',
      description:
        'Say goodbye to screenshots, videos, and repro steps. Recording a bug with Replay lets anyone debug it as if it happened on their own machine.',
      link: 'https://www.replay.io',
      linkText: 'Learn More'
    },
    {
      title: 'Support your Users with Ease',
      description:
        'Bugs reported by QA and users with Replay are fully actionable and quickly understood by developers. Never close issues again for a lack of information.',
      link: 'https://www.replay.io',
      linkText: 'Learn More'
    },
    {
      title: 'Fix all your Flaky Tests',
      description:
        'Debugging a flaky test failure with Replay is just as easy as any other bug. Stop struggling to understand these failures, or suppressing tests because they don’t pass reliably.',
      link: 'https://www.replay.io',
      linkText: 'Learn More'
    },
    {
      title: 'Deploy with Confidence',
      description:
        'Building a thorough and rock solid test suite is easy with Replay and really hard without it. This lets you deploy whenever you want and catch more issues before they hit users.',
      link: 'https://www.replay.io',
      linkText: 'Learn More'
    },
    {
      title: 'Debug Test Failures Remotely',
      description:
        'With Replay you can directly debug test failures that happened in CI as if they happened on your own machine. There is no need to locally reproduce the failure, or pore over logs or videos.',
      link: 'https://www.replay.io',
      linkText: 'Learn More'
    },
    {
      title: 'Modernize Your Test Suite',
      description:
        'Replay is easy to integrate with any test suite regardless of its framework. Get the best debugging experience in the world without rewriting any of your tests.',
      link: 'https://www.replay.io',
      linkText: 'Learn More'
    }
  ]

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1000px',
        margin: 'auto'
      }}
    >
      {valuePropsData.map((item, index) => (
        <div
          key={index}
          style={{
            flex: '0 48%',
            fontSize: '16px',
            padding: '30px',
            marginBottom: '20px'
          }}
        >
          <TitleAndSubtitle
            title={{
              as: 'h2',
              children: item.title,
              style: { fontSize: '30px' }
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
      ))}
    </div>
  )
}

export default ValueProp

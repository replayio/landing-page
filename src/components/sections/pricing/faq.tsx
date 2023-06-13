import Link from 'next/link'
import { useState } from 'react'

import { TitleAndSubtitle } from '~/components/primitives/texts'

import styles from './FAQ.module.css'

// FAQ data structure
const faqs = [
  {
    question: 'How are recordings and test cases related to each other?',
    answer: (
      <div>
        <p>
          Replay records content processes. For browsers, that’s tabs. For Node,
          that’s processes. Cypress runs each spec in its own tab, so a Replay
          recording will include all of the test cases in the spec. Playwright
          will often open a new page per test case, so it is typical for
          recordings to map 1.1. to test cases however it’s possible for a
          single test case to open multiple pages at which point one test case
          might have multiple recordings.
        </p>
      </div>
    )
  },
  {
    question:
      'What is the difference between uploading and processing a recording?',
    answer: (
      <div>
        <p>
          Replay gets its name because recordings are replayed in their original
          runtime after the fact. In order to be able to start debugging a
          recording quickly, we need to be able to be able to process it which
          simply means, replay it once and gather assets that’ll help us start
          the replay efficiently the next time.{' '}
        </p>
        <p>
          Because it takes approximately as long to replay a recording as to
          record it in the first place, we try to be selective about which
          recordings are processed. We also count recording processings in
          increments of 3 minutes as a way to normalize costs across teams. The
          typical recording is 52 seconds, so this should not come into play,
          but we don’t want the typical team to “pay” for the processing costs
          of teams with exceptionally long recordings.
        </p>
      </div>
    )
  },
  {
    question: "What happens if I exceed my plan's included test case runs?",
    answer: (
      <div>
        <p>New recordings will not be uploaded.</p>
      </div>
    )
  },
  {
    question: 'Can I run Replay alongside Cypress Dashboard?',
    answer: (
      <div>
        <p>
          Absolutely. Replay is a Cypress plugin and can be used with other
          plugins and the Cypress Cloud. In fact we encourage you too. We think
          that it is helpful to use Replay for debugging and a dashboard
          provider for suite-level insights and orchestration.
        </p>
      </div>
    )
  },
  {
    question: 'What is Replay.io’s approach to privacy?',
    answer: (
      <div>
        <p>
          Recordings are private by default. You own your own recordings. We
          will not sell or use your recording data in any way. Moreover we do
          not have access to view the recordings unless they are shared with us.
        </p>
      </div>
    )
  },
  {
    question: 'What is Replay.io’s approach to security?',
    answer: (
      <div>
        <p>
          Replay.io uses standard end-to-end encryption and networking security
          practices and has achieved SOC2 Type II. Replay.io is also architected
          with both a safe-by-design and minimal-blast-radius approach. See our
          <Link href="https://docs.replay.io/resources-and-examples/security-practices">
            security practices
          </Link>{' '}
          and <Link href="/security-and-privacy">policies</Link>
          for more information and don’t hesitate to reach out to
          security@replay.io if you have additional questions.
        </p>
      </div>
    )
  },
  {
    question: 'Do I need a credit card to sign up?',
    answer: (
      <div>
        <p>
          No - when you create a team you are starting a free trial for 30 days.
          You’ll only need to add a credit card if you’d like to continue using
          the team beyond the 30 day limit.{' '}
        </p>
      </div>
    )
  },
  {
    question: 'How will you charge me?',
    answer: (
      <div>
        <p>
          We ask for a credit card. Your credit card information will never
          touch our servers as we use <a href="https://stripe.com/">Stripe</a>{' '}
          our payments processor. For Enterprise customers we can do ACH and
          custom invoices if requested.
        </p>
      </div>
    )
  },
  {
    question: 'Can I cancel at anytime?',
    answer: (
      <div>
        <p>
          Definitely! You can cancel or downgrade your subscription at anytime.
          You can also delete your workplace in the settings page at anytime.
        </p>
      </div>
    )
  }
]
export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(-1)

  const renderedFaqs = faqs.map((faq, index) => {
    const isActive = index === activeIndex

    return (
      <div key={index}>
        <button
          onClick={() => setActiveIndex(index)}
          className={
            isActive ? styles.accordionButtonActive : styles.accordionButton
          }
        >
          {faq.question}
        </button>
        {isActive && (
          <div className={styles.accordionContent}>{faq.answer} </div>
        )}
      </div>
    )
  })

  return (
    <>
      <TitleAndSubtitle
        title={{
          className: styles.title,
          as: 'h2',
          children: 'Frequently asked questions'
        }}
        subtitle={{
          children: ''
        }}
      />

      <div className={styles.accordion}>{renderedFaqs}</div>
    </>
  )
}

import { useState } from 'react'

import { TitleAndSubtitle } from '~/components/primitives/texts'

import styles from './FAQ.module.css'

// FAQ data structure
const faqs = [
  {
    question: 'What counts as a recording?',
    answer: `
    <ul>
    <li>Cypress (one spec / one recording)</li>
    <li>Playwright one test case / one recording</li>
    <li>Recordings are modulo 3 minutes</li></ul>`
  },
  {
    question:
      'What is the difference between uploading and processing a recording?',
    answer: 'Answer here'
  },
  {
    question: "What happens if I exceed my plan's included test case runs?",
    answer: 'Answer here'
  },
  {
    question: 'Can we run Replay.io alongside Cypress Dashboard?',
    answer: 'Answer here'
  },
  {
    question: "Is Replay secure? Where's my data stored?",
    answer: 'Answer here'
  },
  {
    question: 'Do I need a credit card to sign up?',
    answer: 'Answer here'
  },
  {
    question: 'How will you charge me?',
    answer: `We ask for a credit card. Your credit card information will never touch our servers as we use <a href="https://stripe.com/">Stripe</a> our payments processor. For Enterprise customers we can do ACH and custom invoices if requested.`
  },
  {
    question: 'Can I cancel at anytime?',
    answer:
      'Definitely! You can cancel or downgrade your subscription at anytime. You can also delete your workplace in the settings page at anytime.'
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
          <div
            className={styles.accordionContent}
            dangerouslySetInnerHTML={{ __html: faq.answer }}
          />
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

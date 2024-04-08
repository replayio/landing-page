import { LandingPageFragment } from '~/lib/basehub-queries'

import circle from '~/images/faq/circle.png'
import cypress from '~/images/faq/cypress.png'
import gdpr from '~/images/faq/gdpr.png'
import github from '~/images/faq/github.png'
import gitlab from '~/images/faq/gitlab.png'
import playwright from '~/images/faq/playwright.png'
import sauce from '~/images/faq/sauce.png'
import selenium from '~/images/faq/selenium.png'
import semaphore from '~/images/faq/semaphore.png'
import soc2 from '~/images/faq/soc2.png'
import Link from 'next/link'
import Image from 'next/image'

const logos = {
  'test-runner': [
    {
      image: playwright,
      alt: 'Playwright',
      height: 45
    },

    {
      image: cypress,
      alt: 'Cypress',
      height: 40
    },
    {
      image: selenium,
      alt: 'Selenium',
      height: 35
    }
  ],
  'ci-environment': [
    {
      image: circle,
      alt: 'CircleCI',
      height: 32
    },
    {
      image: github,
      alt: 'Github',
      height: 45
    },
    {
      image: gitlab,
      alt: 'Gitlab',
      height: 35
    },
    {
      image: sauce,
      alt: 'Sauce Labs',
      height: 40
    },
    {
      image: semaphore,
      alt: 'Semaphore',
      height: 35
    }
  ],
  security: [
    { image: gdpr, alt: 'GDPR', height: 45 },
    { image: soc2, alt: 'SOC2', height: 45 }
  ]
}

export default function FAQ({ faq }: LandingPageFragment) {
  return (
    <div className="border-t border-slate-300 bg-slate-100 py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 ">
          <h2 className="text-3xl  font-bold tracking-tight text-gray-900 sm:text-4xl">
            {faq.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">{faq.subTitle}</p>
        </div>
        <dl className="ext-base mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  text-left leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {faq.questions.items.map((question) => (
            <div key={question._title} className="flex flex-col">
              <dt className="font-semibold text-gray-900">{question._title}</dt>
              <dd className="mt-1 flex-grow text-gray-600">
                {question.summary}
                {question.href && (
                  <>
                    <br />
                    <Link className="underline" href={question.href}>
                      Learn more
                    </Link>
                  </>
                )}
              </dd>
              {question.logos && (
                <dd className="mt-1 text-gray-600">
                  {
                    <div className="mt-4 flex flex-row items-center">
                      {logos[question.logos as keyof typeof logos].map((logo, i) => (
                        <div key={i} className="mr-2">
                          <Image src={logo.image} alt={logo.alt} height={logo.height} />
                        </div>
                      ))}
                    </div>
                  }
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

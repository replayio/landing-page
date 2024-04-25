'use client'

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
import { useMemo, useState } from 'react'
import { Button } from '../Button'
import { useMinTabletBreakpoint } from '~/hooks/use-media'
import { Title } from '../primitives/texts'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

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
  const isTablet = useMinTabletBreakpoint()
  const [showAll, setShowAll] = useState(false)

  const questions = useMemo(() => {
    if (isTablet) {
      return faq.questions.items
    }
    return showAll ? faq.questions.items : faq.questions.items.slice(0, 4)
  }, [showAll, isTablet, faq.questions.items])

  return (
    <section className="border-t border-slate-300 bg-slate-100 py-20 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 ">
          <Title as="h2">{faq.title}</Title>
          <p className="mt-4 text-lg leading-8 text-gray-600">{faq.subTitle}</p>
        </div>
        <dl className="mx-auto mt-16 hidden max-w-2xl grid-cols-1 gap-x-20 gap-y-12 text-left leading-7 sm:grid-cols-2 md:grid lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {questions.map((question) => (
            <div key={question._title} className="flex flex-col">
              <dt className="text-lg font-semibold text-gray-900">{question._title}</dt>
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

        <div className="mt-8 flex w-full max-w-[420px] flex-col justify-center space-y-6 divide-y divide-gray-900/10 md:hidden">
          {faq.questions.items.map((faq) => (
            <Disclosure as="div" className="flex flex-col" key={faq._title}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="mt-6 flex items-center text-lg font-medium">
                    <QuestionMarkCircleIcon className="mr-1.5 h-6 w-6" />
                    {faq._title}
                    <ChevronUpIcon
                      className={clsx(
                        'ml-auto h-6 w-6 transform transition-transform duration-200 ease-in-out',
                        open ? 'rotate-0' : 'rotate-180'
                      )}
                    />
                  </Disclosure.Button>
                  <Transition
                    show={open}
                    enter="transition duration-200 ease-out"
                    enterFrom="transform opacity-0"
                    enterTo="transform opacity-100"
                    leave="transition duration-100 ease-out"
                    leaveFrom="transform opacity-100"
                    leaveTo="transform opacity-0"
                  >
                    <Disclosure.Panel className="text-gray-500">
                      <p className="mt-1.5">{faq.summary}</p>
                      {faq.logos && (
                        <div className="mt-1 text-gray-600">
                          {
                            <div className="mt-4 flex flex-row items-center">
                              {logos[faq.logos as keyof typeof logos].map((logo, i) => (
                                <div key={i} className="mr-2">
                                  <Image src={logo.image} alt={logo.alt} height={logo.height} />
                                </div>
                              ))}
                            </div>
                          }
                        </div>
                      )}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>

        {!isTablet && !showAll && (
          <Button
            className="mt-12 hidden min-w-[200px] bg-slate-900 text-white hover:bg-slate-800 hover:text-slate-100 md:inline-block"
            onClick={() => setShowAll(!showAll)}
          >
            Show more
          </Button>
        )}
      </div>
    </section>
  )
}

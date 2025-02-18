'use client'

import Image from 'next/image'
import { Eyebrow, Title } from '../primitives/texts'

import { Container } from '~/components/Container'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { Description } from './devtools/Description'
import { getAspectRatio } from '~/lib/images'
import { Button } from '~/components/Button'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { RichText } from 'basehub/react-rich-text'

export function Nut({ nut }: LandingPageFragment) {
  return (
    <section
      id="nut"
      className="relative isolate overflow-hidden  pb-16 pt-8 text-left shadow-2xl md:pb-44 md:pt-20"
    >
      <Container className="relative">
        <div className="flex max-w-2xl flex-col items-center justify-center text-left md:mx-auto xl:max-w-none">
          <Image
            alt={nut.logo.alt || ''}
            width={36}
            height={36 * getAspectRatio(nut.logo.aspectRatio)}
            src={nut.logo.url}
          />
          <Eyebrow>
            <span className="relative inline-flex items-center">{nut.subtitle}</span>
          </Eyebrow>
          <div className="mx-auto"></div>
          <Title className="text-pretty text-center text-gray-900" as="h2">
            {nut.title}
          </Title>
          <div className="mx-auto mt-4 max-w-3xl text-center  text-gray-900  md:text-lg">
            <Description {...nut.description.json} />
          </div>

          <div className="mx-auto mt-8 flex max-w-[480px] flex-col justify-start gap-x-6 gap-y-4 lg:mx-0 lg:flex-row">
            <div className="flex flex-row items-center gap-x-4">
              <Button
                label={nut.cta.label || ''}
                variant={nut.cta.variant || ''}
                href={nut.cta.href || ''}
                target="_blank"
                className="w-full"
              />
            </div>
          </div>
          {Boolean(nut.showExamples) && <NutExamples examples={nut.examples.items} />}
          <NutEarlyAdopters nut={nut} />
        </div>
      </Container>
    </section>
  )
}

function NutEarlyAdopters({ nut }: { nut: LandingPageFragment['nut'] }) {
  return (
    <div className="mt-12 flex flex-row items-start justify-start gap-4 rounded-2xl border-2 border-red-100 bg-red-50 px-6 py-8 sm:px-8 lg:mt-16">
      <div className="flex h-10 w-10 items-center justify-center text-2xl">👋</div>
      <div className="max-w-2xl text-left">
        <h3 className="font-display text-lg font-semibold leading-7 text-gray-900">
          {nut.earlyAdopterTitle}
        </h3>
        <p className="mt-2 text-pretty text-sm leading-6 text-gray-600 [&_a]:underline">
          <RichText>{nut.earlyAdopterDescription!.json.content}</RichText>
        </p>
      </div>
    </div>
  )
}

function NutExamples({ examples }: { examples: LandingPageFragment['nut']['examples']['items'] }) {
  return (
    <>
      <Tab.Group
        as="div"
        className="mt-16 hidden grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-32 lg:grid lg:grid-cols-12 lg:pt-0"
      >
        {({ selectedIndex }) => (
          <>
            <div className="-mx-4 hidden overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5 lg:block">
              <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                {examples.map((example, exampleIndex) => (
                  <div
                    key={example._title}
                    className={clsx(
                      'group relative my-2 rounded-full px-4 font-medium lg:rounded-l-xl lg:rounded-r-none lg:px-6 lg:py-4',
                      selectedIndex === exampleIndex
                        ? 'bg-white lg:bg-gray-100 lg:ring-1 lg:ring-inset lg:ring-gray-200'
                        : 'hover:bg-gray-50 lg:hover:bg-gray-50'
                    )}
                  >
                    <h3>
                      <Tab
                        className={clsx(
                          'font-display text-lg ui-not-focus-visible:outline-none',
                          selectedIndex === exampleIndex
                            ? 'text-blue-600 lg:text-gray-900'
                            : 'text-gray-600 hover:text-gray-900 lg:text-gray-600'
                        )}
                      >
                        <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                        {example._title}
                      </Tab>
                    </h3>
                    <p
                      className={clsx(
                        'mt-2 text-sm ',
                        selectedIndex === exampleIndex
                          ? 'text-gray-900'
                          : 'text-gray-600 group-hover:text-gray-900'
                      )}
                    >
                      <RichText>{example.description!.json.content}</RichText>
                    </p>
                  </div>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels className="hidden lg:col-span-7 lg:block">
              {examples.map((example) => {
                return (
                  <Tab.Panel key={example._title} unmount={false}>
                    <div className="relative text-gray-900 hover:text-gray-900 sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-gray-100 ring-1 ring-inset ring-gray-200 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-gray-900 sm:text-left">
                        <RichText>{example.description!.json.content}</RichText>
                      </p>
                    </div>
                    <div className="mt-10 w-[45rem] overflow-hidden rounded-xl shadow-xl shadow-blue-200/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <Image
                        src={example.screenshot.url}
                        alt=""
                        width={500}
                        height={500 * getAspectRatio(example.screenshot.aspectRatio)}
                      />
                    </div>
                  </Tab.Panel>
                )
              })}
            </Tab.Panels>
          </>
        )}
      </Tab.Group>
      <div className="mt-4 flex overflow-x-hidden pb-4 sm:mx-0 sm:pb-0 lg:hidden">
        <div className="relative z-10 flex flex-col gap-x-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
          {examples.map((example) => {
            return (
              <div
                key={example._title}
                className={'relative my-2 mt-12 flex flex-col rounded-full text-gray-900'}
              >
                <h3 className="font-display text-lg font-semibold ui-not-focus-visible:outline-none">
                  {example._title}
                </h3>
                <p className="mb-8 mt-2">
                  <RichText>{example.description!.json.content}</RichText>
                </p>
                <div className="flex items-center justify-center">
                  <Image
                    src={example.screenshot.url}
                    alt={`${example._title} screenshot`}
                    width={500}
                    height={500 * getAspectRatio(example.screenshot.aspectRatio)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

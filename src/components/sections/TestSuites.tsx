'use client'

import Image, { type ImageProps } from 'next/image'
import { Tab, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { LandingPageFragment } from '~/lib/basehub-queries'

import { Container } from '~/components/Container'
import screenshotDashboard from '~/images/screenshots/dashboard-view.png'
import screenshotTests from '~/images/screenshots/tests-view.png'
import screenshotRuns from '~/images/screenshots/runs-view.png'
import screenshotPRComments from '~/images/screenshots/pr-comments.png'
import { getImageSizes } from '~/lib/utils/image'
import { Eyebrow, Title } from '../primitives/texts'
import { Button } from '../Button'
import { useState } from 'react'

interface Feature {
  children: React.ReactNode
}

const images = {
  dashboard: screenshotDashboard,
  tests: screenshotTests,
  runs: screenshotRuns,
  pr: screenshotPRComments
}

function TabHeading({
  children,
  isActive,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'div'> & { isActive: boolean }) {
  return (
    <div
      className={clsx(
        className,
        'relative z-10 rounded-t-[20px] transition-opacity duration-200 ease-in-out',
        !isActive && 'opacity-75 hover:opacity-100'
      )}
      {...rest}
    >
      <p
        className={clsx(
          'text-sm font-semibold transition-colors duration-200 ease-in-out lg:mt-4 lg:text-center',
          isActive ? 'text-accent' : 'text-slate-600'
        )}
      >
        {children}
      </p>
    </div>
  )
}

function FeaturesMobile({
  features
}: {
  features: LandingPageFragment['testSuites']['features']['items']
}) {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-6 overflow-hidden px-4 pb-20 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div
          className="rounded-[20px] bg-white px-5 py-4"
          key={feature._title}
          style={{ filter: 'drop-shadow(0px 2px 18px rgba(5, 73, 30, 0.08))' }}
        >
          <TabHeading className="ml-2 max-w-2xl" isActive>
            {feature._title}
          </TabHeading>

          <h3 className="mt-4 text-center text-2xl font-semibold leading-[1.75]">
            {feature.subtitle}
          </h3>
          <p className="mx-auto max-w-[620px] text-center text-[14px] leading-[1.3] text-[#6D6D6D] ">
            {feature.description}
          </p>
          <div className="relative mt-10">
            <div className="relative mx-auto mb-4 aspect-[299/176] overflow-hidden rounded-xl">
              <Image
                className="h-full w-auto max-w-none"
                src={images[feature.image as keyof typeof images]}
                alt=""
                sizes={getImageSizes(50, 90, 90)}
                placeholder="blur"
                quality={100}
              />
            </div>
          </div>
          <Button
            className="mx-auto w-full"
            variant="outline"
            href="https://blog.replay.io/"
            target="_blank"
          >
            Learn More {'->'}
          </Button>
        </div>
      ))}
    </div>
  )
}

function FeaturesDesktop({
  features
}: {
  features: LandingPageFragment['testSuites']['features']['items']
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <div className="relative hidden lg:block">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={clsx(
            'pointer-events-none absolute left-1/2 top-0 h-full w-[100%] -translate-x-1/2 bg-contain bg-center bg-no-repeat transition-opacity duration-200 ease-in-out',
            {
              ['opacity-0']: selectedIndex !== index
            }
          )}
          style={{
            backgroundImage: `url(/images/tabs/tab-${index + 1}.png)`,
            filter: 'drop-shadow(0px 2px 18px rgba(5, 73, 30, 0.08))'
          }}
          aria-hidden
        />
      ))}
      <Tab.Group
        as="div"
        className="relative hidden aspect-[1216/712] w-full lg:mt-20 lg:block"
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <Tab.List className="flex justify-center gap-x-5 xl:gap-x-12">
          {features.map((feature, featureIndex) => (
            <TabHeading
              key={feature.description}
              isActive={featureIndex === selectedIndex}
              className="relative w-[180px] pb-5"
            >
              <Tab className="z-1 relative ui-not-focus-visible:outline-none">{feature._title}</Tab>
            </TabHeading>
          ))}
        </Tab.List>
        <Tab.Panels className="relative overflow-hidden rounded-xl px-2 py-8 xl:px-8">
          <div className="-mx-5 mt-2 flex">
            {features.map((feature, featureIndex) => (
              <Tab.Panel
                static
                key={feature._title}
                className={clsx(
                  'flex-1 px-32 ui-not-focus-visible:outline-none',
                  featureIndex !== selectedIndex && 'pointer-events-none absolute opacity-0'
                )}
                aria-hidden={featureIndex !== selectedIndex}
              >
                <h3 className="text-center text-3xl font-semibold leading-[1.75]">
                  {feature.subtitle}
                </h3>
                <p className="mx-auto max-w-[620px] text-center leading-[1.3] text-[#6D6D6D] ">
                  {feature.description}
                </p>
                <Transition
                  show={featureIndex === selectedIndex}
                  enter="transition-opacity ease-ease-in-out duration-500"
                  enterFrom="opacity-20"
                  enterTo="opacity-100"
                >
                  <div className="mt-6 w-full overflow-hidden rounded-md bg-[#4b5563] shadow-xl">
                    <Image
                      className="w-full"
                      src={images[feature.image as keyof typeof images]}
                      alt=""
                      sizes={getImageSizes(50, 90, 90)}
                      placeholder="blur"
                      quality={100}
                    />
                  </div>
                </Transition>
                <div className="flex justify-center">
                  <Button
                    className="mx-auto mt-8 min-w-[330px]"
                    variant="outline"
                    href="https://blog.replay.io/"
                    target="_blank"
                  >
                    Learn More {'->'}
                  </Button>
                </div>
              </Tab.Panel>
            ))}
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export function TestSuites({ testSuites }: LandingPageFragment) {
  return (
    <section id="test-suites" className="pt-20 sm:pb-20 sm:pt-32 lg:pb-32">
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <Eyebrow>{testSuites.superTitle}</Eyebrow>
          <Title as="h2">{testSuites.superTitle}</Title>
          <p className="mt-4 text-lg tracking-tight text-slate-700">{testSuites.subTitle}</p>
        </div>
        <FeaturesMobile features={testSuites.features.items} />
        <FeaturesDesktop features={testSuites.features.items} />
      </Container>
    </section>
  )
}

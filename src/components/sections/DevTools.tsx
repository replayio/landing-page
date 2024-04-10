'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import MuxPlayer from '@mux/mux-player-react'
import clsx from 'clsx'

import { Container } from '~/components/Container'
import console from '~/images/screenshots/add-console-logs.png'
import react from '~/images/screenshots/inspect-react-components.png'
import testSteps from '~/images/screenshots/jump-to-test-steps.png'
import network from '~/images/screenshots/view-network-requests.png'
import { LandingPageFragment } from '~/lib/basehub-queries'

const images = {
  console: {
    type: 'image',
    src: console
  },
  react: {
    type: 'image',
    src: react
  },
  testSteps: {
    type: 'mux-video',
    src: '3OZMn3uq3dlTfHO19bGjaBO8JXXbPduqCx2RqDG5jIg'
  },
  network: {
    type: 'image',
    src: network
  }
}

export function DevTools({ devTools }: LandingPageFragment) {
  let [tabOrientation, setTabOrientation] = useState<'horizontal' | 'vertical'>('horizontal')

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <section
      id="devtools"
      className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-left shadow-2xl"
    >
      <Container className="relative">
        <div className="flex max-w-2xl flex-col items-center justify-center md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-2xl tracking-tight text-white sm:text-3xl md:text-4xl">
            {devTools.title}
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100 md:max-w-3xl">
            {devTools.subTitle}
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 hidden overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5 lg:block">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {devTools.features.items.map((feature, featureIndex) => (
                    <div
                      key={feature._title}
                      className={clsx(
                        'group relative my-2 rounded-full px-4 lg:rounded-l-xl lg:rounded-r-none lg:px-6 lg:py-4',
                        selectedIndex === featureIndex
                          ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                          : 'hover:bg-white/10 lg:hover:bg-white/5'
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            'font-display text-lg ui-not-focus-visible:outline-none',
                            selectedIndex === featureIndex
                              ? 'text-blue-600 lg:text-white'
                              : 'text-blue-100 hover:text-white lg:text-white'
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                          {feature._title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          'mt-2 text-sm ',
                          selectedIndex === featureIndex
                            ? 'text-white'
                            : 'text-blue-100 group-hover:text-white'
                        )}
                      >
                        {feature.subTitle}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="hidden lg:col-span-7 lg:block">
                {devTools.features.items.map((feature) => {
                  const featureImage = images[(feature.image as keyof typeof images) || 'console']
                  return (
                    <Tab.Panel key={feature._title} unmount={false}>
                      <div className="relative text-white hover:text-white sm:px-6 lg:hidden">
                        <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                        <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                          {feature.subTitle}
                        </p>
                      </div>
                      <div className="mt-10 w-[45rem] overflow-hidden rounded-xl shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                        {featureImage.type === 'image' && (
                          <Image
                            className="w-full"
                            src={featureImage.src}
                            alt=""
                            priority
                            sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                          />
                        )}

                        {featureImage.type === 'mux-video' && (
                          <MuxPlayer
                            streamType="on-demand"
                            playbackId="3OZMn3uq3dlTfHO19bGjaBO8JXXbPduqCx2RqDG5jIg"
                            primaryColor="#FFFFFF"
                            secondaryColor="#000000"
                            muted={true}
                            autoPlay={true}
                            style={
                              {
                                display: 'block',
                                '--controls': 'none',
                                '--media-object-fit': 'cover',
                                '--media-object-position': 'center'
                              } as React.CSSProperties
                            }
                          />
                        )}
                      </div>
                    </Tab.Panel>
                  )
                })}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>

        <>
          <div className="-mx-4 flex  overflow-x-hidden pb-4 sm:mx-0  sm:pb-0  lg:hidden">
            <div className="relative z-10 flex flex-col gap-x-4  px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
              {devTools.features.items.map((feature) => {
                const featureImage = images[(feature.image as keyof typeof images) || 'console']
                return (
                  <div
                    key={feature._title}
                    className={clsx(
                      'relative my-2 mt-16 flex flex-col rounded-full px-4 text-white'
                    )}
                  >
                    <h3>
                      <div
                        className={clsx(
                          'font-display text-lg font-semibold ui-not-focus-visible:outline-none'
                        )}
                      >
                        {feature._title}
                      </div>
                    </h3>
                    <p className={clsx('mb-8 mt-2 text-sm')}>{feature.subTitle}</p>
                    {featureImage.type === 'image' && (
                      <Image
                        className="w-full"
                        src={featureImage.src}
                        alt=""
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 500px) 100vw, 30rem"
                      />
                    )}
                    {featureImage.type === 'mux-video' && (
                      <MuxPlayer
                        streamType="on-demand"
                        playbackId="3OZMn3uq3dlTfHO19bGjaBO8JXXbPduqCx2RqDG5jIg"
                        primaryColor="#FFFFFF"
                        secondaryColor="#000000"
                        muted={true}
                        autoPlay={true}
                        style={
                          {
                            display: 'block',
                            '--controls': 'none',
                            '--media-object-fit': 'cover',
                            '--media-object-position': 'center'
                          } as React.CSSProperties
                        }
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </>
      </Container>
      <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
        <div
          className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)'
          }}
        />
      </div>
    </section>
  )
}

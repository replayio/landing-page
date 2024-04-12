'use client'

import Image from 'next/image'
import { Tab } from '@headlessui/react'
import MuxPlayer from '@mux/mux-player-react/lazy'
import clsx from 'clsx'

import { Container } from '~/components/Container'
import react from '~/images/screenshots/inspect-react-components.png'
import testSteps from '~/images/screenshots/jump-to-test-steps.png'
import network from '~/images/screenshots/view-network-requests.png'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { getImageSizes } from '~/lib/utils/image'
import { Title } from '../primitives/texts'

const images = {
  testSteps: {
    type: 'image',
    src: testSteps
  },
  console: {
    type: 'mux-video',
    src: '9ERwx5ymPqmmqMeRIhVqCvnhyy009017y00mtdvISQF6fI'
  },
  react: {
    type: 'image',
    src: react
  },
  network: {
    type: 'image',
    src: network
  }
}

export function DevTools({ devTools }: LandingPageFragment) {
  return (
    <section
      id="devtools"
      className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-8 text-left shadow-2xl md:pb-44 md:pt-20"
    >
      <Container className="relative">
        <div className="flex max-w-2xl flex-col justify-center text-center md:mx-auto xl:max-w-none">
          <div className="mx-auto">
            <svg
              width="77"
              height="75"
              viewBox="0 0 77 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#fff" fillOpacity=".28">
                <path d="m39.3959 22.7608-5.6608-3.2744-5.6608-3.2743c-.2455-.1419-.524-.2165-.8074-.2165-.2834.0001-.5619.0748-.8073.2168-.2455.142-.4493.3462-.5911.592-.1417.2459-.2164.5249-.2165.8088v13.0972c.0001.284.0747.5629.2165.8088.1418.2459.3456.4501.5911.5921.2454.142.5238.2167.8073.2168.2834.0001.5619-.0746.8074-.2165l5.6608-3.2743 5.6608-3.2743c.2455-.142.4494-.3462.5911-.5922.1418-.2459.2164-.5249.2164-.8089 0-.284-.0746-.563-.2164-.809-.1417-.2459-.3456-.4501-.5911-.5921ZM39.3959 41l-5.6608-3.2743-5.6608-3.2743c-.2455-.1419-.524-.2166-.8074-.2165-.2835 0-.5619.0748-.8073.2168-.2455.142-.4494.3462-.5911.592-.1418.2459-.2164.5249-.2165.8088v13.0972c.0001.2839.0747.5629.2165.8088.1417.2459.3456.4501.5911.592.2454.142.5238.2168.8073.2169.2834 0 .5619-.0746.8074-.2165l5.6608-3.2743 5.6608-3.2743c.2455-.142.4494-.3463.5912-.5922.1417-.246.2163-.525.2163-.809 0-.284-.0746-.563-.2163-.809-.1418-.2459-.3457-.4501-.5912-.5921ZM55.5411 31.8828l-5.6608-3.2744-5.6608-3.2742c-.2455-.1419-.524-.2166-.8074-.2165-.2834 0-.5619.0748-.8073.2168-.2455.142-.4493.3461-.5911.592-.1418.2459-.2164.5248-.2166.8088v13.0972c.0002.284.0748.5629.2166.8088.1418.2458.3456.45.5911.592.2454.142.5239.2168.8073.2168.2834.0001.5619-.0746.8074-.2165l5.6608-3.2743 5.6608-3.2743c.2455-.142.4494-.3462.5911-.5922.1418-.2459.2164-.5249.2164-.8089 0-.284-.0746-.563-.2164-.809-.1417-.2459-.3456-.4501-.5911-.5921Z" />
              </g>
            </svg>
          </div>
          <Title className="text-pretty" as="h2" white>
            {devTools.title}
          </Title>
          <p className="mx-auto mt-4 max-w-3xl tracking-tight text-[#C1C3C7] md:text-lg">
            {devTools.subTitle}
          </p>
        </div>

        <Tab.Group
          as="div"
          className="mt-16 hidden grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-32 lg:grid lg:grid-cols-12 lg:pt-0"
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
                        {feature.type === 'image' ? (
                          <Image
                            className="w-full"
                            src={featureImage.src}
                            alt=""
                            priority
                            sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                          />
                        ) : (
                          <MuxPlayer
                            loading="viewport"
                            streamType="on-demand"
                            playbackId={featureImage.src as string}
                            primaryColor="#FFFFFF"
                            secondaryColor="#000000"
                            muted={true}
                            autoPlay={true}
                            loop={true}
                            style={
                              {
                                aspectRatio: '554/327',
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

        <div className="mt-4 flex overflow-x-hidden pb-4 sm:mx-0 sm:pb-0 lg:hidden">
          <div className="relative z-10 flex flex-col gap-x-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
            {devTools.features.items.map((feature) => {
              const featureImage = images[(feature.image as keyof typeof images) || 'console']
              return (
                <div
                  key={feature._title}
                  className={'relative my-2 mt-12 flex flex-col rounded-full text-white'}
                >
                  <h3 className="font-display text-lg font-semibold ui-not-focus-visible:outline-none">
                    {feature._title}
                  </h3>
                  <p className="mb-8 mt-2">{feature.subTitle}</p>
                  {featureImage.type === 'image' && (
                    <Image
                      className="w-full"
                      src={featureImage.src}
                      alt={`${feature._title} screenshot`}
                      placeholder="blur"
                      sizes={getImageSizes(67, 100, 100)}
                    />
                  )}
                  {featureImage.type === 'mux-video' && (
                    <div className="overflow-hidden rounded-[8px]">
                      <MuxPlayer
                        loading="viewport"
                        streamType="on-demand"
                        playbackId={featureImage.src as string}
                        primaryColor="#FFFFFF"
                        secondaryColor="#ff00ff"
                        muted={true}
                        autoPlay={true}
                        loop={true}
                        style={
                          {
                            aspectRatio: '554/327',
                            display: 'block',
                            '--controls': 'none',
                            '--media-object-fit': 'cover',
                            '--media-object-position': 'center'
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
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

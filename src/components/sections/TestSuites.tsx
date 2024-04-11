'use client'

import { useId } from 'react'
import Image, { type ImageProps } from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { LandingPageFragment } from '~/lib/basehub-queries'
import styles from '../../styles/Landingpage.module.css'

import { Container } from '~/components/Container'
import screenshotDashboard from '~/images/screenshots/dashboard-view.png'
import screenshotTests from '~/images/screenshots/tests-view.png'
import screenshotRuns from '~/images/screenshots/runs-view.png'
import screenshotPRComments from '~/images/screenshots/pr-comments.png'
import { getImageSizes } from '~/lib/utils/image'

interface Feature {
  title: React.ReactNode
  subTitle: string | null
  description: string | null
  image: ImageProps['src']
  icon: React.ComponentType
}

const images = {
  dashboard: screenshotDashboard,
  tests: screenshotTests,
  runs: screenshotRuns,
  pr: screenshotPRComments
}
const icons = {
  tests: function TestsIcon() {
    let id = useId()
    return (
      <>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id={id}
              x1="11.5"
              y1={18}
              x2={36}
              y2="15.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".194" stopColor="#fff" />
              <stop offset={1} stopColor="#6692F1" />
            </linearGradient>
          </defs>
          <path
            d="m30 15-4 5-4-11-4 18-4-11-4 7-4-5"
            stroke={`url(#${id})`}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </>
    )
  },
  dashboard: function DashboardIcon() {
    let id = useId()
    return (
      <>
        <svg
          width="36"
          height="36"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.4514 18.2492C11.2867 18.2957 11.1199 18.3377 10.9514 18.375V4.85074C10.9514 4.38089 10.5706 4 10.1007 4C9.63086 4 9.24997 4.38089 9.24997 4.85074V18.5837C9.16692 18.586 9.08359 18.5871 9 18.5871C8.91639 18.5871 8.83304 18.586 8.74997 18.5837V8.87381C8.74997 8.40396 8.36908 8.02307 7.89923 8.02307C7.42938 8.02307 7.04849 8.40396 7.04849 8.87381V18.3749C6.88 18.3377 6.71329 18.2957 6.54849 18.2492V8.181C6.54849 7.71115 6.1676 7.33026 5.69775 7.33026C5.2279 7.33026 4.84702 7.71115 4.84702 8.181V17.5737C4.6771 17.4852 4.51036 17.3914 4.34702 17.2925V10.9966C4.34702 10.5267 3.96613 10.1458 3.49628 10.1458C3.02643 10.1458 2.64554 10.5267 2.64554 10.9966V15.9605C2.47166 15.7872 2.30484 15.6068 2.14554 15.4197V10.4763C2.14554 10.0064 1.76465 9.62552 1.2948 9.62552C0.82495 9.62552 0.444061 10.0064 0.444061 10.4763V12.387C0.155851 11.5058 0 10.5646 0 9.5871C0 4.61653 4.02944 0.587097 9 0.587097C13.9706 0.587097 18 4.61653 18 9.5871C18 10.5647 17.8441 11.5059 17.5559 12.3872V9.73914C17.5559 9.26929 17.175 8.8884 16.7051 8.8884C16.2353 8.8884 15.8544 9.26929 15.8544 9.73914V15.4198C15.6951 15.6068 15.5283 15.7872 15.3544 15.9606V12.4012C15.3544 11.9314 14.9735 11.5505 14.5037 11.5505C14.0338 11.5505 13.6529 11.9314 13.6529 12.4012V17.2926C13.4896 17.3914 13.3228 17.4852 13.1529 17.5737V11.034C13.1529 10.5642 12.772 10.1833 12.3022 10.1833C11.8323 10.1833 11.4514 10.5642 11.4514 11.034V18.2492Z"
            fill="white"
          />
        </svg>
      </>
    )
  },
  runs: function RunsIcon() {
    return (
      <>
        <svg
          width="36"
          height="36"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.44714 18.5871C8.21637 18.5871 7.05818 18.3519 5.97255 17.8814C4.88692 17.4167 3.92901 16.769 3.09881 15.9384C2.27444 15.1078 1.62712 14.1495 1.15688 13.0634C0.68663 11.9772 0.451508 10.8184 0.451508 9.58708C0.451508 8.35572 0.68663 7.19696 1.15688 6.1108C1.62712 5.02464 2.27444 4.06919 3.09881 3.2444C3.92901 2.41381 4.88402 1.76327 5.96384 1.29281C7.04947 0.822331 8.20766 0.587097 9.43843 0.587097C10.675 0.587097 11.8361 0.822331 12.9217 1.29281C14.0074 1.76327 14.9653 2.41381 15.7955 3.2444C16.6257 4.06919 17.2759 5.02464 17.7462 6.1108C18.2164 7.19696 18.4515 8.35572 18.4515 9.58708C18.4515 10.8184 18.2164 11.9772 17.7462 13.0634C17.2759 14.1495 16.6257 15.1078 15.7955 15.9384C14.9653 16.769 14.0074 17.4167 12.9217 17.8814C11.8361 18.3519 10.6779 18.5871 9.44714 18.5871ZM8.48053 13.8823C8.64307 13.8823 8.79112 13.8446 8.92465 13.7691C9.06398 13.6936 9.1859 13.5803 9.29039 13.4293L13.3659 7.06917C13.4239 6.97624 13.4762 6.87751 13.5226 6.77296C13.5691 6.6626 13.5923 6.55804 13.5923 6.45931C13.5923 6.23277 13.5052 6.04982 13.331 5.91042C13.1627 5.77102 12.9711 5.70132 12.7563 5.70132C12.4718 5.70132 12.2367 5.85233 12.0509 6.15437L8.44569 11.922L6.7737 9.79618C6.6576 9.65097 6.54438 9.54932 6.43408 9.49124C6.32378 9.43316 6.19896 9.40412 6.05962 9.40412C5.83901 9.40412 5.65034 9.48543 5.49359 9.64807C5.34265 9.8049 5.26718 9.99366 5.26718 10.2144C5.26718 10.3247 5.28749 10.4322 5.32813 10.5367C5.36878 10.6413 5.42683 10.7429 5.5023 10.8417L7.63583 13.438C7.76355 13.5948 7.89417 13.7081 8.02769 13.7778C8.16122 13.8475 8.31217 13.8823 8.48053 13.8823Z"
            fill="white"
          />
        </svg>
      </>
    )
  },
  pr: function PRIcon() {
    return (
      <>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity=".5"
            d="M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z"
            fill="#fff"
          />
          <path
            d="M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z"
            fill="#fff"
          />
        </svg>
      </>
    )
  }
}

function Feature({
  feature,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  feature: Feature
  isActive: boolean
}) {
  return (
    <div className={clsx(className, !isActive && 'opacity-75 hover:opacity-100')} {...props}>
      <div
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-100 ease-in-out',
          isActive ? 'bg-[#f02d5e]' : 'bg-slate-500'
        )}
      >
        <div className="h-9 w-9">
          <feature.icon />
        </div>
      </div>
      <h3
        className={clsx('mt-4 text-sm font-medium', isActive ? 'text-[#f02d5e]' : 'text-slate-600')}
      >
        {feature.title}
      </h3>
      <p className="mt-1 font-display text-xl text-slate-900">{feature.subTitle}</p>
      <p className="mt-4 text-sm text-slate-600">{feature.description}</p>
    </div>
  )
}

function FeaturesMobile({
  features
}: {
  features: LandingPageFragment['testSuites']['features']['items']
}) {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-6 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature._title}>
          <Feature
            feature={{
              title: feature._title,
              subTitle: feature.subtitle,
              description: feature.description,
              image: images[feature.image as keyof typeof images],
              icon: icons[feature.image as keyof typeof icons]
            }}
            className="ml-2 max-w-2xl"
            isActive
          />
          <div className="relative mt-10 pb-10">
            <div className={`absolute -inset-x-4 bottom-0 top-8  sm:-inset-x-6`} />

            <div className="relative mx-auto min-w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
              <Image
                className="w-full"
                src={images[feature.image as keyof typeof images]}
                alt=""
                sizes={getImageSizes(70, 70, 100)}
              />
            </div>
          </div>
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
  return (
    <Tab.Group as="div" className="hidden lg:mt-20 lg:block">
      {({ selectedIndex }) => (
        <>
          <Tab.List className="grid grid-cols-4 gap-x-8">
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.description}
                feature={{
                  subTitle: feature.subtitle,
                  description: feature.description,
                  image: images[feature.image as keyof typeof images],
                  icon: icons[feature.image as keyof typeof icons],
                  title: (
                    <Tab className="ui-not-focus-visible:outline-none">
                      <span className="absolute inset-0" />
                      {feature._title}
                    </Tab>
                  )
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </Tab.List>
          <Tab.Panels
            className={`${styles.slate} relative mt-12 overflow-hidden rounded-xl px-2 py-8 xl:px-8`}
          >
            <div className="-mx-5 flex">
              {features.map((feature, featureIndex) => (
                <Tab.Panel
                  static
                  key={feature._title}
                  className={clsx(
                    'px-5 transition duration-500 ease-in-out ui-not-focus-visible:outline-none',
                    featureIndex !== selectedIndex && 'opacity-60'
                  )}
                  style={{
                    transform: `translateX(-${selectedIndex * 100}%)`
                  }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className="w-[66.5rem] overflow-hidden rounded-md shadow-xl">
                    <Image
                      className="w-full"
                      src={images[feature.image as keyof typeof images]}
                      alt=""
                      sizes="52.75rem"
                    />
                  </div>
                </Tab.Panel>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
          </Tab.Panels>
        </>
      )}
    </Tab.Group>
  )
}

export function TestSuites({ testSuites }: LandingPageFragment) {
  return (
    <section id="test-suites" className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32">
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className={styles.sectionSubhead}>{testSuites.superTitle}</h2>

          <h3 className="font-display text-3xl tracking-tight text-slate-900 sm:text-3xl">
            {testSuites.title}
          </h3>
          <p className="mt-4 text-lg tracking-tight text-slate-700">{testSuites.subTitle}</p>
        </div>
        <FeaturesMobile features={testSuites.features.items} />
        <FeaturesDesktop features={testSuites.features.items} />
      </Container>
    </section>
  )
}

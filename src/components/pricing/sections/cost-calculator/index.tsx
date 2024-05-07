'use client'
import React, { useState } from 'react'
import InfoIcon from '~/components/icons/info'
import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import s from './cost-calculator.module.scss'
import CreditCardIcon from '~/components/icons/credit-card'
import { Button } from '~/components/Button'

export const Calculator = () => {
  const [mobileSwitch, setMobileSwitch] = useState(false)

  return (
    <section id="cost-calculator" className="mt-10 bg-white px-6 py-32">
      <div className=" mx-auto max-w-5xl">
        <div className="mx-auto mb-[72px] text-center md:mb-16">
          <p className="text-base font-semibold leading-7 text-accent">Cost Model</p>
          <h2 className="mb-6 mt-2 text-pretty text-3xl font-semibold text-gray-900 md:mt-3 md:text-5xl">
            See hoy Replay compares to other tools.
          </h2>
          <p className="mx-auto max-w-2xl text-balance text-base leading-6 text-gray-600">
            Your dashboard should not be more expensive than your CI infrastructure
          </p>
        </div>
        <div className="mt-[72px] border-b border-gray-300 pb-6 md:mt-16">
          <h2 className="mb-2 text-pretty text-xl font-semibold text-black">
            Test results add up quickly
          </h2>
          <p className="max-w-4xl text-balance text-base leading-5 text-gray-600">
            The typical team generates millions of test results per month because each time a PR is
            updated, the tests run, and each test spec has multiple test cases, and failures are
            retried multiple times.
          </p>
          <p className="mt-4 text-balance text-base font-semibold leading-6 text-accent underline underline-offset-2 md:mt-6">
            View the cost model
          </p>
        </div>

        <div className="flex flex-col gap-[14px] pt-6 md:flex-row md:gap-10">
          {inputs.map((input) => (
            <div
              key={input.id}
              className="flex w-full grow justify-between gap-4 md:max-w-[107px] md:flex-col"
            >
              <div className="flex items-center">
                <label
                  htmlFor={input.id}
                  className="whitespace-nowrap text-lg font-semibold text-gray-700 md:text-base md:leading-5"
                >
                  {input.title}
                </label>
                <Tooltip.Provider>
                  <Tooltip.Root delayDuration={0.02}>
                    <Tooltip.Trigger asChild>
                      <button className="">
                        <InfoIcon className="ml-2 inline size-5 text-gray-400 md:size-[15px]" />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className={clsx(
                          s['tooltip-content'],
                          'flex max-w-56 flex-col gap-2 rounded-lg bg-gray-600 p-4 text-white'
                        )}
                        sideOffset={5}
                      >
                        <p className="text-base font-semibold leading-5">{input.title}</p>
                        <p className="text-sm leading-[18px]">{input.description}</p>
                        <Tooltip.Arrow className="fill-gray-600" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
              <div className="flex w-full max-w-[110px] gap-2 md:max-w-none">
                <input
                  type="number"
                  id={input.id}
                  value={input.value}
                  min={input.min}
                  max={input.max}
                  className="h-9 flex-1 rounded-md border border-gray-200 bg-gray-50 px-4 text-base font-medium text-gray-500 focus:border-accent focus:ring-accent"
                />
                {input.symbol && (
                  <span className="flex items-center text-base font-semibold text-gray-500">
                    {input.symbol}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setMobileSwitch((prev) => !prev)}
          className="relative mt-14 grid w-full grid-cols-2 rounded-full border border-gray-300 bg-gray-50 p-1.5 md:hidden"
        >
          <span
            style={{
              transitionProperty: 'transform filter'
            }}
            className={`absolute left-1.5 top-1.5 flex h-[calc(100%-12px)] w-[calc(50%-6px)] rounded-full bg-gradient-to-br from-accent to-accent/[.12] p-px duration-300 ease-in-out
            ${mobileSwitch ? 'translate-x-full grayscale-0' : 'translate-x-0 grayscale'}`}
          >
            <span className="h-full w-full rounded-full bg-white" />
          </span>
          <div className="z-10 flex flex-col items-center px-3.5 py-2 text-center">
            <p className="text-sm font-medium leading-5 text-black">Cypress</p>
            <p className="text-lg font-semibold leading-[1.3] text-gray-600">$58,320</p>
          </div>
          <div
            className={`z-10 flex flex-col items-center px-3.5 py-2 text-center transition-transform delay-200 duration-200 ease-linear
          ${mobileSwitch ? 'scale-105' : 'scale-100'}`}
          >
            <p className="text-sm font-medium leading-5 text-accent">Replay</p>
            <p className="text-lg font-semibold leading-[1.3] text-accent">$520</p>
          </div>
        </button>
        <div className="max-w-full overflow-hidden">
          <div
            className={`flex transform flex-nowrap gap-6 py-6 transition-transform duration-300 ease-in-out md:gap-4 md:py-12
          ${mobileSwitch ? '-translate-x-[calc(100%+24px)] md:translate-x-0' : ''}`}
          >
            <Panel
              title="Cypress"
              theme="secondary"
              description="Cypress and other dashboards change per test run which becomes expensive quickly."
              fields={[
                { title: 'Test results per run', value: '300' },
                { title: 'Test results per day', value: '60,000' },
                { title: 'Test results per month', value: '1,260,000' }
              ]}
              monthlyCost={6350}
            />
            <Panel
              title="Replay"
              description="You get unlimited test results in our dashboard and only pay for the recordings you upload and we process."
              fields={[
                { title: 'Uploaded recordings', value: '11,000' },
                { title: 'Processed recordings', value: '800' }
              ]}
              monthlyCost={520}
              savedCost={5832}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <Button
            href="/"
            className="h-[44px] w-full md:mx-auto md:h-[54px] md:w-auto md:font-semibold"
            variant="primary"
            size="base"
          >
            {`Choose your plan ->`}
          </Button>
        </div>
      </div>
    </section>
  )
}

type CalculatorInput = {
  id: string
  title: string
  description: string
  value: number
  min: number
  max: number
  symbol?: string
}

const inputs: CalculatorInput[] = [
  {
    title: 'Test specs',
    id: 'specs',
    description: 'The number of test specs you have in your suite',
    value: 10,
    min: 1,
    max: 100
  },
  {
    title: 'Developers',
    id: 'developers',
    description: 'The number of test specs you have in your suite',
    value: 10,
    min: 1,
    max: 100
  },
  {
    title: 'Retry limit',
    id: 'retry',
    description: 'The number of test specs you have in your suite',
    value: 10,
    min: 1,
    max: 100
  },
  {
    title: 'Flake rate',
    id: 'flake-rate',
    description: 'The number of test specs you have in your suite',
    value: 10,
    min: 1,
    max: 100,
    symbol: '%'
  },
  {
    title: 'Failure rate',
    id: 'failure-rate',
    description: 'The number of test specs you have in your suite',
    value: 10,
    min: 1,
    max: 100,
    symbol: '%'
  }
]

export const Panel = ({
  theme = 'primary',
  title,
  description,
  fields,
  monthlyCost,
  savedCost
}: {
  theme?: 'primary' | 'secondary'
  title: string
  description: string
  fields: {
    title: string
    value: string
  }[]
  monthlyCost: number
  savedCost?: number
}) => {
  return (
    <div
      className={`w-full shrink-0 rounded-[20px] md:shrink
      ${theme === 'primary' ? 'from bg-gradient-to-br from-accent to-accent/[.12] p-px' : 'border border-gray-200'}`}
    >
      <div
        className={`flex h-full flex-col gap-4 rounded-[19px] px-6 py-8 md:gap-6 md:px-10
      ${theme === 'primary' ? 'bg-white' : s['cypress-card-gr']}`}
      >
        <div>
          <h4
            className={`mb-1 text-lg font-semibold leading-[1.1] md:text-xl
          ${theme === 'primary' ? 'text-accent' : 'text-black'}`}
          >
            {title}
          </h4>
          <p className="text-base leading-5 text-gray-500">{description}</p>
        </div>
        <div
          className={`flex flex-1 flex-col gap-4 border-b border-t border-b-gray-200 py-4 md:py-6
        ${
          theme === 'primary'
            ? 'border-t-accent'
            : 'border-gradient-to-br from-gray-200 to-gray-300/[.5]'
        }`}
        >
          {fields.map((field) => (
            <div key={field.title} className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-base leading-[1.2] md:gap-4">
                <span className="inline-block">
                  <CreditCardIcon className="size-[18px] text-gray-400" />
                </span>
                <p className="text-gray-500">{field.title}</p>
              </div>
              <p className="font-medium text-gray-500">{field.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center pt-4 md:pt-6">
          <p className="mr-2 text-lg font-medium leading-[1] md:mr-auto md:text-2xl">
            Monthly Cost
          </p>
          <p className="mr-auto rounded-[4px] border border-green-300 bg-gradient-to-tr from-green-100 to-green-200 px-2 py-1 text-base font-semibold leading-[1] text-green-600 md:mr-0 md:text-xl md:leading-[1]">
            ${monthlyCost}
          </p>
          {savedCost && (
            <p className="ml-3 text-base leading-[1] text-accent underline underline-offset-2">
              Save ${savedCost}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

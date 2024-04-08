'use client'
import { useState } from 'react'
import { CreditCardIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

const daysInTheMonth = 20

const copy = {
  suite: 'Your test suite',
  description: 'Thirty thousand foot perspective.',
  cypressDescription: 'Paying for test runs becomes expensive quickly.',
  replayDescription: 'We charge you for the replays you want to debug. '
}

const costs = {
  cypressTeamPerRun: 0.006,
  plans: {
    team: {
      cost: {
        plan: 75,
        processed: 0.4,
        uploaded: 0.02
      },
      included: {
        uploaded: 100,
        processed: 20
      }
    },
    pro: {
      cost: {
        plan: 350,
        processed: 0.2,
        uploaded: 0.01
      },
      included: {
        uploaded: 1000,
        processed: 100
      }
    }
  }
}

type FieldType = {
  label: string
  defaultValue: number
  calculated?: boolean
}

const fields: Record<string, FieldType> = {
  specs: { label: 'Specs in the suite', defaultValue: 50 },
  testsPerSpec: { label: 'Tests per spec', defaultValue: 3 },
  devs: { label: 'Developers on the team', defaultValue: 16 },
  pushes: { label: 'Pushes per day', defaultValue: 15 },
  retries: { label: 'Retry limit', defaultValue: 3 },
  flakyTests: { label: 'How many tests are flaky?', defaultValue: 10 },
  failingTests: { label: 'How many tests are failing?', defaultValue: 5 },
  uploaded: { label: 'Additional uploaded recordings', defaultValue: 0 },
  processed: { label: 'Additional processed recordings', defaultValue: 0 },
  numTests: { label: 'Number of tests in the suite', calculated: true, defaultValue: 0 },
  numRuns: { label: 'Number of test runs', calculated: true, defaultValue: 0 },
  autoUploaded: { label: 'Automatically uploaded recordings', calculated: true, defaultValue: 0 },
  autoProcessed: { label: 'Automatically processed recordings', calculated: true, defaultValue: 0 }
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Emphasis = ({
  children,
  color = 'indigo'
}: {
  color?: 'indigo' | 'green'
  children: React.ReactNode
}) => (
  <span
    className={classNames(
      'mx-1 whitespace-nowrap rounded border font-semibold ',
      color === 'indigo'
        ? 'border-indigo-200 bg-indigo-100 text-indigo-700'
        : 'border-green-200 bg-green-100 text-green-700'
    )}
  >
    {' '}
    {children}{' '}
  </span>
)

const Field = ({
  className,
  calculated,
  label,
  value,
  onEdit
}: {
  className?: string
  label: string
  calculated?: boolean
  value: number | string
  onEdit: (value: number) => void
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit(parseInt(e.target.value) ?? 0)
  }

  return (
    <div className="mt-2 flex w-full gap-x-4 px-6 text-sm">
      <dt className={clsx('flex', className)}>
        <span className="sr-only">Status</span>
        {label && <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />}
      </dt>
      <dd className="flex-grow  text-gray-500">{label}</dd>
      <dd className="shrink  text-gray-500">
        {calculated ? (
          value
        ) : (
          <input
            size={5}
            type="number"
            name="value"
            min={0}
            className="my-0 max-w-16 appearance-none border-none bg-transparent py-0 text-right outline-none [font-family:inherit] [font-size:inherit] focus:appearance-none focus:rounded-md focus:bg-slate-200 focus:ring-slate-300 "
            value={value}
            onChange={handleChange}
          />
        )}
      </dd>
    </div>
  )
}

function Panel({
  title,
  subtitle,
  fields,
  values,
  calculatedValues = {},
  summary,
  onFieldEdit,
  className,
  containerClassName
}: {
  title: string
  subtitle: string
  fields: Record<string, FieldType>
  values: Record<string, number>
  calculatedValues?: Record<string, number>
  summary?: React.ReactNode
  onFieldEdit: (label: string, newValue: number) => void
  className?: string
  containerClassName?: string
}) {
  return (
    <div className={`flex max-w-lg flex-col ${className}`}>
      <div
        className={`rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 ${containerClassName}`}
      >
        <dl className="flex flex-wrap">
          <div className="mb-3 flex-auto border-b border-gray-900/5 pb-3 pl-6 pt-6 ">
            <dt className="text-lg font-semibold leading-6 text-gray-900">{title}</dt>
            <dt className="font text-sm leading-6 text-gray-900">{subtitle}</dt>
          </div>
          {Object.entries(fields).map(([key, field]) => (
            <Field
              key={key}
              label={field.label}
              value={(values[key] || calculatedValues[key] || 0).toLocaleString()}
              calculated={field.calculated}
              onEdit={(newValue) => onFieldEdit(key, newValue)}
            />
          ))}
        </dl>
        {summary ? (
          <div className="mt-6 border-t border-gray-900/5 px-6 py-3">{summary}</div>
        ) : (
          <div className="py-3" />
        )}
      </div>
    </div>
  )
}

export function CostCalculator() {
  const [costDrivers, setCostDrivers] = useState({
    specs: fields.specs.defaultValue,
    testsPerSpec: fields.testsPerSpec.defaultValue,
    devs: fields.devs.defaultValue,
    pushes: fields.pushes.defaultValue,
    retries: fields.retries.defaultValue,
    flakyTests: fields.flakyTests.defaultValue,
    failingTests: fields.failingTests.defaultValue,
    uploaded: fields.uploaded.defaultValue,
    processed: fields.processed.defaultValue
  })

  const testRunsPerDay =
    (costDrivers.specs +
      (costDrivers.retries - 1) * (costDrivers.failingTests + costDrivers.flakyTests)) *
    costDrivers.testsPerSpec *
    costDrivers.devs *
    costDrivers.pushes
  const testRunsPerMonth = testRunsPerDay * daysInTheMonth
  const cypressCost = testRunsPerMonth * costs.cypressTeamPerRun
  const numTests = costDrivers.specs * costDrivers.testsPerSpec

  const recordingsUploadedPerDay =
    costDrivers.specs +
    (costDrivers.flakyTests * (costDrivers.retries - 1) +
      costDrivers.failingTests * costDrivers.retries)

  const recordingsUploadedPerMonth = recordingsUploadedPerDay * daysInTheMonth
  const recordingsProcessedPerDay =
    (costDrivers.failingTests + costDrivers.flakyTests) * (costDrivers.retries - 1)

  const recordingsProcessedPerMonth = recordingsProcessedPerDay * daysInTheMonth

  const replayCost =
    costs.plans.team.cost.plan +
    recordingsUploadedPerMonth * costs.plans.team.cost.uploaded +
    recordingsProcessedPerMonth * costs.plans.team.cost.processed

  const calculatedValues = {
    numTests: numTests,
    numRuns: testRunsPerMonth,
    autoUploaded: recordingsUploadedPerMonth,
    autoProcessed: recordingsProcessedPerMonth
  }

  const handleCostDriverUpdate = (fieldName: string, newValue: number) => {
    setCostDrivers((prevFields) => ({
      ...prevFields,
      [fieldName]: newValue
    }))
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <div>
        <div className="mx-auto mt-32 max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Cost Model</h2>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            How Replay compares with other tools.
          </h2>
          <p className="mx-auto mb-12 mt-3 max-w-2xl text-base leading-6 text-gray-600">
            Most testing tools charge per test run which discourages you from growing the test suite
            and scales with the cost of CI. With Replay, you only pay for the recordings you need to
            debug failures after the fact.
          </p>
        </div>

        <div className="row-gap-8 grid max-w-4xl justify-center gap-x-8 gap-y-8 lg:grid-cols-2">
          <Panel
            title={copy.suite}
            subtitle={copy.description}
            className="lg:col-start-1 lg:row-start-1"
            containerClassName="grow"
            fields={{
              specs: fields.specs,
              testsPerSpec: fields.testsPerSpec,
              devs: fields.devs,
              pushes: fields.pushes,
              retries: fields.retries,
              flakyTests: fields.flakyTests,
              failingTests: fields.failingTests
            }}
            values={costDrivers}
            onFieldEdit={handleCostDriverUpdate}
          />

          <div className="lg:col-start-2 lg:row-start-1">
            <Panel
              title="Cypress"
              subtitle={copy.cypressDescription}
              className=""
              fields={{
                numTests: fields.numTests,
                numRuns: fields.numRuns
              }}
              values={costDrivers}
              calculatedValues={calculatedValues}
              onFieldEdit={handleCostDriverUpdate}
              summary={
                <div className="text-sm font-medium  text-gray-900">
                  Monthly cost
                  <Emphasis color="green">${cypressCost.toLocaleString()}</Emphasis>
                </div>
              }
            />
            <Panel
              title="Replay"
              subtitle={copy.replayDescription}
              className="mt-8"
              fields={{
                autoUploaded: fields.autoUploaded,
                autoProcessed: fields.autoProcessed,
                uploaded: fields.uploaded,
                processed: fields.processed
              }}
              values={costDrivers}
              calculatedValues={calculatedValues}
              onFieldEdit={handleCostDriverUpdate}
              summary={
                <div className="text-sm font-medium leading-6 text-gray-900">
                  Monthly cost
                  <Emphasis color="green">${replayCost.toLocaleString()}</Emphasis>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

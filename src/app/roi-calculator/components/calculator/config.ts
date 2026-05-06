import type { RoiInputs, SliderField } from './types'

export const REPLAY_MONTHLY_COST = 299

// Replay reduces time-to-root-cause by ~85% based on 76% vs 61% benchmark + customer reports
export const TIME_REDUCTION = 0.85

export const WEEKS_PER_MONTH = 4.33

export const DEFAULT_INPUTS: RoiInputs = {
  engineers: 8,
  prsPerWeek: 20,
  failureRatePercent: 30,
  debugHoursPerFailure: 2,
  engineerHourlyCost: 100
}

export const SLIDER_FIELDS: SliderField[] = [
  {
    key: 'engineers',
    label: 'Engineers on the team',
    hint: 'Including anyone who touches the test suite or reviews PRs.',
    min: 1,
    max: 50,
    step: 1,
    format: (v) => `${v}`
  },
  {
    key: 'prsPerWeek',
    label: 'PRs opened per week',
    hint: 'Across the whole team.',
    min: 1,
    max: 100,
    step: 1,
    format: (v) => `${v}`
  },
  {
    key: 'failureRatePercent',
    label: 'Test failure rate',
    hint: 'Percentage of PRs that have at least one test failure.',
    min: 5,
    max: 80,
    step: 5,
    format: (v) => `${v}%`
  },
  {
    key: 'debugHoursPerFailure',
    label: 'Avg. hours debugging a failure',
    hint: 'Time from "test failed" to knowing the root cause and fix. Includes reproduction, investigation, and fix verification.',
    min: 0.5,
    max: 8,
    step: 0.5,
    format: (v) => `${v}h`
  },
  {
    key: 'engineerHourlyCost',
    label: 'Avg. fully-loaded engineer cost',
    hint: 'Salary + benefits + overhead, divided by working hours. $75–$150/hr is typical for US engineers.',
    min: 50,
    max: 250,
    step: 10,
    format: (v) => `$${v}/hr`
  }
]

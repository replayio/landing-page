export type RoiInputs = {
  engineers: number
  prsPerWeek: number
  failureRatePercent: number
  debugHoursPerFailure: number
  engineerHourlyCost: number
}

export type SliderField = {
  key: keyof RoiInputs
  label: string
  hint: string
  min: number
  max: number
  step: number
  format: (v: number) => string
}

export type RoiResults = {
  failuresPerMonth: number
  totalDebugHoursPerMonth: number
  totalDebugCostPerMonth: number
  hoursSavedPerMonth: number
  costSavedPerMonth: number
  netSavingsPerMonth: number
  roi: number
  paybackDays: number
  annualSavings: number
}

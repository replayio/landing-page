import { REPLAY_MONTHLY_COST, TIME_REDUCTION, WEEKS_PER_MONTH } from './config'
import type { RoiInputs, RoiResults } from './types'

export function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`
  return `$${Math.round(n)}`
}

export function formatHours(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k hrs`
  return `${Math.round(n)} hrs`
}

export function computeRoiResults(inputs: RoiInputs): RoiResults {
  const failuresPerWeek = (inputs.prsPerWeek * inputs.failureRatePercent) / 100
  const failuresPerMonth = failuresPerWeek * WEEKS_PER_MONTH

  const totalDebugHoursPerMonth = failuresPerMonth * inputs.debugHoursPerFailure
  const totalDebugCostPerMonth = totalDebugHoursPerMonth * inputs.engineerHourlyCost

  const hoursSavedPerMonth = totalDebugHoursPerMonth * TIME_REDUCTION
  const costSavedPerMonth = hoursSavedPerMonth * inputs.engineerHourlyCost

  const netSavingsPerMonth = costSavedPerMonth - REPLAY_MONTHLY_COST
  const roi = costSavedPerMonth / REPLAY_MONTHLY_COST
  const paybackDays = REPLAY_MONTHLY_COST / (costSavedPerMonth / 30)

  return {
    failuresPerMonth: Math.round(failuresPerMonth),
    totalDebugHoursPerMonth,
    totalDebugCostPerMonth,
    hoursSavedPerMonth,
    costSavedPerMonth,
    netSavingsPerMonth,
    roi,
    paybackDays: Math.round(paybackDays),
    annualSavings: costSavedPerMonth * 12
  }
}

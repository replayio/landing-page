'use client'

import Link from 'next/link'
import { Button } from '~/components/Button'
import { REPLAY_MONTHLY_COST } from './config'
import { StatCard } from './StatCard'
import type { RoiInputs, RoiResults } from './types'
import { formatCurrency, formatHours } from './utils'

type ResultsPanelProps = {
  inputs: RoiInputs
  results: RoiResults
}

export function ResultsPanel({ inputs, results }: ResultsPanelProps) {
  const replayBarPct = Math.min(
    100,
    (REPLAY_MONTHLY_COST / Math.max(results.costSavedPerMonth, 1)) * 100
  )

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Assumptions callout */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-xs leading-relaxed text-slate-500">
        <span className="font-semibold text-gray-900">How we calculate this: </span>
        Based on your inputs, your team deals with{' '}
        <span className="font-medium text-gray-900">
          ~{results.failuresPerMonth} test failures/month
        </span>
        , consuming{' '}
        <span className="font-medium text-gray-900">
          {formatHours(results.totalDebugHoursPerMonth)}
        </span>{' '}
        and{' '}
        <span className="font-medium text-gray-900">
          {formatCurrency(results.totalDebugCostPerMonth)}
        </span>{' '}
        in engineering time. Replay eliminates ~85% of that investigation time by delivering root
        cause and a suggested fix directly on the PR.
      </div>

      {/* Key stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          label="Hours saved / month"
          value={formatHours(results.hoursSavedPerMonth)}
          sub={`${
            Math.round((results.hoursSavedPerMonth / inputs.engineers) * 10) / 10
          } hrs per engineer`}
        />
        <StatCard
          label="Cost saved / month"
          value={formatCurrency(results.costSavedPerMonth)}
          sub={`vs. $${REPLAY_MONTHLY_COST}/mo for Replay`}
        />
        <StatCard
          label="Annual savings"
          value={formatCurrency(results.annualSavings)}
          sub="At current team size and failure rate"
        />
        <StatCard
          label="ROI"
          value={`${Math.round(results.roi)}×`}
          sub={`Replay pays for itself in ~${results.paybackDays} days`}
          highlight
        />
      </div>

      {/* Net savings bar */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Monthly cost vs. savings
          </p>
          <p className="text-sm font-semibold text-gray-900">
            Net: {formatCurrency(results.netSavingsPerMonth)}/mo
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gray-300" />
            <span className="text-xs text-slate-500">Replay cost</span>
            <span className="ml-auto text-xs font-medium text-gray-900">
              ${REPLAY_MONTHLY_COST}/mo
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gray-300"
              style={{ width: `${replayBarPct}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-accent" />
            <span className="text-xs text-slate-500">Engineering time saved</span>
            <span className="ml-auto text-xs font-medium text-gray-900">
              {formatCurrency(results.costSavedPerMonth)}/mo
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-accent/15">
            <div className="h-full rounded-full bg-accent" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

      {/* Benchmark anchor */}
      <div className="rounded-xl border border-accent/15 bg-accent/[0.04] px-5 py-4 text-xs leading-relaxed text-slate-500">
        <span className="font-semibold text-gray-900">Backed by data: </span>
        On the{' '}
        <a
          href="https://blog.replay.io/web-debug-bench"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition hover:decoration-accent"
        >
          Web Debug Bench
        </a>{' '}
        (177 real bugs), Claude Code + Replay MCP scored 76% vs. 61% without &mdash; a 15-point lift
        from time-travel debugging alone. Teams using Replay report reducing reproducibility time
        from 1&ndash;2 hours per engineer per day to near zero.
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="solid"
          color="default"
          size="base"
          href="https://docs.replay.io/basics/getting-started/record-your-playwright-tests"
          target="_blank"
          className="flex-1 px-6"
        >
          Install the CI Agent
        </Button>
        <Button
          variant="outline"
          color="blue"
          href="https://docs.replay.io/basics/replay-mcp/quickstart"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-6"
        >
          Add Replay MCP
        </Button>
      </div>
    </div>
  )
}

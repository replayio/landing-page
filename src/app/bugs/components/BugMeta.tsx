import clsx from 'clsx'
import type { Bug } from '../data/bugs'

const severityClass = (severity: string) =>
  severity === 'critical' || severity === 'high'
    ? 'border-accent/30 bg-accent/5 text-accent'
    : 'border-amber-200 bg-amber-50 text-amber-700'

export function BugMeta({ bug }: { bug: Pick<Bug, 'severity' | 'categoryName'> }) {
  return (
    <span className="flex flex-wrap gap-1.5 text-[11px] font-semibold">
      <span
        className={clsx('rounded-full border px-2 py-0.5 capitalize', severityClass(bug.severity))}
      >
        {bug.severity}
      </span>
      <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-gray-700">
        {bug.categoryName}
      </span>
    </span>
  )
}

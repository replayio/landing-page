import clsx from 'clsx'

type StatCardProps = {
  label: string
  value: string
  sub?: string
  highlight?: boolean
}

export function StatCard({ label, value, sub, highlight = false }: StatCardProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-1 rounded-xl p-6',
        highlight
          ? 'border border-accent/[0.25] bg-accent/[0.07]'
          : 'border border-gray-200 bg-white'
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
      <p
        className={clsx(
          'text-3xl font-bold leading-none tracking-tight',
          highlight ? 'text-accent' : 'text-gray-900'
        )}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </div>
  )
}

import Link from 'next/link'
import clsx from 'clsx'
import { Check, Minus, X } from 'lucide-react'
import { DIMENSIONS, type Cell, type DimensionKey } from './content'

export type ComparisonColumn = {
  name: string
  href?: string
  cells: Record<DimensionKey, Cell>
  highlight?: boolean
}

function Verdict({ verdict }: { verdict: Cell['verdict'] }) {
  if (!verdict) return null
  const Icon = verdict === 'yes' ? Check : verdict === 'partial' ? Minus : X

  return (
    <Icon
      aria-hidden
      className={clsx(
        'mt-0.5 h-4 w-4 flex-shrink-0',
        verdict === 'yes' && 'text-accent',
        verdict === 'partial' && 'text-amber-500',
        verdict === 'no' && 'text-gray-400'
      )}
    />
  )
}

// A real <table> so it reads correctly to screen readers and converts cleanly to agent markdown.
// The first column stays pinned while the rest scroll horizontally on narrow screens.
export function ComparisonTable({
  columns,
  caption
}: {
  columns: ComparisonColumn[]
  caption: string
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th
              scope="col"
              className="sticky left-0 z-10 w-28 bg-gray-50 px-3 py-3 font-semibold text-gray-500 sm:w-40 sm:px-4"
            >
              <span className="sr-only">Dimension</span>
            </th>
            {columns.map((col) => (
              <th
                key={col.name}
                scope="col"
                className={clsx(
                  'min-w-[160px] px-4 py-3 font-semibold sm:min-w-[180px]',
                  col.highlight ? 'bg-accent/5 text-accent' : 'text-gray-900'
                )}
              >
                {col.href ? (
                  <Link href={col.href} className="transition hover:text-accent">
                    {col.name}
                  </Link>
                ) : (
                  col.name
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DIMENSIONS.map((dim) => (
            <tr key={dim.key} className="border-b border-gray-100 last:border-0">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-white px-3 py-3 align-top font-medium text-gray-900 sm:px-4"
              >
                {dim.label}
              </th>
              {columns.map((col) => {
                const cell = col.cells[dim.key]
                return (
                  <td
                    key={col.name}
                    className={clsx(
                      'px-4 py-3 align-top leading-relaxed text-gray-600',
                      col.highlight && 'bg-accent/5'
                    )}
                  >
                    <div className="flex gap-2">
                      <Verdict verdict={cell.verdict} />
                      <span>{cell.text}</span>
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

'use client'

import { useState } from 'react'
import clsx from 'clsx'
import type { BugSummary } from '../data/bugs'
import { BugCard } from './BugCard'

export function BugGallery({ bugs }: { bugs: BugSummary[] }) {
  const [category, setCategory] = useState<string | null>(null)
  const categories = [...new Map(bugs.map((bug) => [bug.category, bug.categoryName]))]
  const shown = category ? bugs.filter((bug) => bug.category === category) : bugs

  const filter = (key: string | null, label: string, count: number) => (
    <button
      key={key ?? 'all'}
      type="button"
      aria-pressed={category === key}
      onClick={() => setCategory(key)}
      className={clsx(
        'rounded-full border px-3.5 py-1.5 text-sm font-medium transition',
        category === key
          ? 'border-accent bg-accent text-white'
          : 'border-gray-200 bg-white text-gray-700 hover:border-accent/40 hover:text-accent'
      )}
    >
      {label} <span className="opacity-60">{count}</span>
    </button>
  )

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {filter(null, 'All', bugs.length)}
        {categories.map(([key, name]) =>
          filter(key, name, bugs.filter((bug) => bug.category === key).length)
        )}
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((bug) => (
          <BugCard key={bug.slug} bug={bug} />
        ))}
      </div>
    </>
  )
}

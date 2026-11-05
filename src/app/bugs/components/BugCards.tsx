'use client'

import { useState } from 'react'
import type { BugPreview } from '../data/bugs'
import { BugCard } from './BugCard'
import { BugModal } from './BugModal'

/** A grid of bug cards; clicking one opens it in a modal. */
export function BugCards({ bugs }: { bugs: BugPreview[] }) {
  const [open, setOpen] = useState<BugPreview | null>(null)
  return (
    <>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bugs.map((bug) => (
          <BugCard key={bug.slug} bug={bug} onOpen={() => setOpen(bug)} />
        ))}
      </div>
      <BugModal bug={open} onClose={() => setOpen(null)} />
    </>
  )
}

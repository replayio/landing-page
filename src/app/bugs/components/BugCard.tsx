import Image from 'next/image'
import Link from 'next/link'
import { Bug as BugIcon } from 'lucide-react'
import type { BugSummary } from '../data/bugs'
import { BugMeta } from './BugMeta'

/**
 * A bug in the gallery. It links to the full report, so crawlers and modified clicks (new tab, new window) still
 * reach it; with `onOpen`, a plain click opens the bug in a modal instead.
 */
export function BugCard({ bug, onOpen }: { bug: BugSummary; onOpen?: () => void }) {
  return (
    <Link
      href={`/bugs/${bug.slug}`}
      onClick={(e) => {
        if (!onOpen || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        onOpen()
      }}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg focus-visible:border-accent focus-visible:outline-none"
    >
      <span className="relative block aspect-[16/10] w-full overflow-hidden border-b border-gray-200 bg-gray-50">
        {bug.thumbnail ? (
          <Image
            src={bug.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <span className="flex h-full items-center justify-center text-gray-300">
            <BugIcon className="h-10 w-10" />
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col gap-2 p-5">
        <BugMeta bug={bug} />
        <span className="font-semibold leading-snug text-gray-900 group-hover:text-accent">
          {bug.title}
        </span>
        <span className="line-clamp-3 text-sm leading-relaxed text-gray-600">{bug.why}</span>
        <span className="mt-auto pt-1 text-xs text-gray-500">{bug.project}</span>
      </span>
    </Link>
  )
}

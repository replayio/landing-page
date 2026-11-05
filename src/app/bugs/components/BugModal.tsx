'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { ArrowRight, X } from 'lucide-react'
import { Button } from '~/components/Button'
import type { BugPreview } from '../data/bugs'
import { BugMeta } from './BugMeta'
import '../bugs.css'

const BugReplay = dynamic(() => import('./BugReplay').then((m) => m.BugReplay), {
  ssr: false,
  loading: () => <div className="aspect-video w-full animate-pulse rounded-xl bg-gray-100" />
})

const Html = ({ html, className }: { html: string; className?: string }) => (
  <div className={`bug-prose ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: html }} />
)

/** A bug's summary, session replay and finding, over the page, with a link to its full report. */
export function BugModal({ bug, onClose }: { bug: BugPreview | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (bug && !dialog.open) {
      dialog.showModal()
      dialog.scrollTop = 0
    } else if (!bug && dialog.open) {
      dialog.close()
    }
  }, [bug])

  // Replayed focus events pull keyboard focus into the replay frame, which would swallow Escape.
  useEffect(() => {
    const onBlur = () =>
      window.setTimeout(() => {
        if (dialogRef.current?.open && document.activeElement?.closest('.bug-replay'))
          closeRef.current?.focus({ preventScroll: true })
      })
    window.addEventListener('blur', onBlur)
    return () => window.removeEventListener('blur', onBlur)
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="bug-modal-title"
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
      className="bug-modal"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={() => dialogRef.current?.close()}
        aria-label="Close"
        className="sticky top-3 z-10 float-right mr-3 mt-3 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition hover:border-accent hover:text-accent"
      >
        <X className="h-4 w-4" />
      </button>
      {bug && (
        <div className="px-5 pb-8 pt-7 sm:px-9">
          <header className="border-b border-gray-200 pb-6">
            <BugMeta bug={bug} />
            <h2
              id="bug-modal-title"
              className="mt-3 text-balance text-2xl font-bold leading-tight text-gray-900"
            >
              {bug.title}
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">{bug.why}</p>
            <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
              <span>{bug.project}</span>
              <span aria-hidden>·</span>
              <span>Found {bug.discovered}</span>
            </p>
          </header>

          {bug.replay && (
            <section className="mt-7">
              <h3 className="text-sm font-bold text-gray-900">Session replay</h3>
              <div className="bug-replay replay-host mt-3">
                <BugReplay key={bug.slug} {...bug.replay} />
              </div>
            </section>
          )}

          {bug.findingHtml && (
            <div className="mt-7 rounded-r-xl border-l-4 border-accent bg-accent/5 px-5 py-4">
              <p className="text-sm font-bold text-gray-900">What the recording showed</p>
              <Html html={bug.findingHtml} className="mt-1" />
            </div>
          )}

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-red-700">Actual</p>
              <Html html={bug.actualHtml} className="mt-2" />
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50/50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-green-700">Expected</p>
              <Html html={bug.expectedHtml} className="mt-2" />
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button href={`/bugs/${bug.slug}`} size="sm">
              View full report <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </dialog>
  )
}

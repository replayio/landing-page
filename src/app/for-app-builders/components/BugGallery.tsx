'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import clsx from 'clsx'
import 'rrweb-player/dist/style.css'
import bugs from '../data/bugs.json'

// Ticket content is rendered verbatim from the Replay QA bugs hall of fame (see data/bugs.json).
type Bug = (typeof bugs)[number]
type ReplayPlayer = { pause?: () => void; $destroy?: () => void }

const severityClass = (severity: string) =>
  severity === 'critical' || severity === 'high'
    ? 'border-accent/30 bg-accent/5 text-accent'
    : 'border-amber-200 bg-amber-50 text-amber-700'

function BugMeta({ bug }: { bug: Bug }) {
  return (
    <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold">
      <span
        className={clsx('rounded-full border px-2 py-0.5 capitalize', severityClass(bug.severity))}
      >
        {bug.severity}
      </span>
      <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-gray-700">
        {bug.category}
      </span>
    </div>
  )
}

// Recordings ship gzipped; inflate them in the browser unless the host already decoded them.
async function loadRecording(slug: string) {
  const res = await fetch(`/for-app-builders/recordings/${slug}.rrweb.gz`)
  if (!res.ok) throw new Error(`recording ${res.status}`)
  const bytes = new Uint8Array(await res.arrayBuffer())
  if (bytes[0] !== 0x1f || bytes[1] !== 0x8b) return JSON.parse(new TextDecoder().decode(bytes))
  return new Response(
    new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))
  ).json()
}

export function BugGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const playerRef = useRef<ReplayPlayer | null>(null)
  const [openBug, setOpenBug] = useState<Bug | null>(null)

  const stopReplay = useCallback(() => {
    playerRef.current?.pause?.()
    playerRef.current?.$destroy?.()
    playerRef.current = null
  }, [])

  const close = useCallback(() => dialogRef.current?.close(), [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!openBug || !dialog) return
    if (!dialog.open) dialog.showModal()
    dialog.scrollTop = 0
    bodyRef.current?.querySelectorAll<HTMLAnchorElement>('a[href^="http"]').forEach((a) => {
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
    })
    const el = bodyRef.current?.querySelector<HTMLElement>('.bug-replay')
    if (!el) return
    let cancelled = false
    Promise.all([import('rrweb-player'), loadRecording(openBug.slug)])
      .then(([{ default: Player }, events]) => {
        if (cancelled || !el.isConnected) return
        const width = el.clientWidth
        el.replaceChildren()
        playerRef.current = new Player({
          target: el,
          props: {
            events,
            width,
            height: Math.round((width * 9) / 16),
            autoPlay: true,
            showController: true,
            skipInactive: false
          }
        }) as unknown as ReplayPlayer
      })
      .catch(() => {
        const status = el.querySelector('.bug-replay-status')
        if (status) status.textContent = 'The session replay could not be loaded.'
      })
    return () => {
      cancelled = true
      stopReplay()
    }
  }, [openBug, stopReplay])

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
    <>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bugs.map((bug) => (
          <button
            key={bug.slug}
            type="button"
            onClick={() => setOpenBug(bug)}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-left transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg focus-visible:border-accent focus-visible:outline-none"
          >
            {bug.shot && (
              <span className="relative block aspect-[16/10] w-full overflow-hidden border-b border-gray-200 bg-gray-50">
                <Image
                  src={bug.shot}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </span>
            )}
            <span className="flex flex-1 flex-col gap-2 p-5">
              <BugMeta bug={bug} />
              <span className="font-semibold leading-snug text-gray-900">{bug.title}</span>
              <span className="line-clamp-3 text-sm leading-relaxed text-gray-600">{bug.why}</span>
              <span className="mt-auto pt-1 text-xs text-gray-500">{bug.project}</span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Bug report"
        onClose={() => setOpenBug(null)}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="ab-bug-modal"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="sticky top-3 z-10 float-right mr-3 mt-3 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition hover:border-accent hover:text-accent"
        >
          <X className="h-4 w-4" />
        </button>
        {openBug && (
          <div className="px-5 pb-9 pt-7 sm:px-9">
            <header className="border-b border-gray-200 pb-5">
              <BugMeta bug={openBug} />
              <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900">
                {openBug.title}
              </h2>
              <p className="mt-1 text-xs text-gray-500">{openBug.project}</p>
            </header>
            <div
              ref={bodyRef}
              className="ab-bug-body"
              dangerouslySetInnerHTML={{ __html: openBug.html }}
            />
          </div>
        )}
      </dialog>
    </>
  )
}

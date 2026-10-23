'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

// Each step plays the first STEP_SECONDS of its /how-it-works clip, then the next step takes over, on a loop.
const STEP_SECONDS = 5

const steps = [
  {
    title: 'Explores',
    body: 'Opens the app in a real browser and discovers its user journeys, including ones nobody specified.',
    src: '/02-Exploration-v2-Light.mp4',
    label:
      'Replay QA agents exploring an app, mapping pages and user journeys as a growing web of connections'
  },
  {
    title: 'Tests',
    body: 'Writes and runs its own tests against those journeys in our instrumented Chromium browser.',
    src: '/03-Testing-Light.mp4',
    label:
      'Parallel agent sessions running user journeys while every DOM mutation, network call, and JavaScript frame is recorded'
  },
  {
    title: 'Records',
    body: 'Captures every run as a deterministic recording of the whole runtime.',
    src: '/04-Analysis-Light.mp4',
    label:
      'An agent scrubbing a Replay Recording timeline, flagging a broken button, a slow network call, and a contrast warning'
  },
  {
    title: 'Reports',
    body: 'Returns each bug with its root cause, a suggested fix, and the recording, ready for your build loop.',
    src: '/05-Reports-Light.mp4',
    label:
      'A bug report card assembling itself: video thumbnail, annotated screenshot, severity badge, and root-cause text'
  }
]

export function StepVideoPlayer() {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const visible = useRef(false)
  const reduced = useRef(false)

  const play = useCallback((i: number) => {
    const video = videoRefs.current[i]
    if (video && visible.current && !reduced.current) video.play().catch(() => {})
  }, [])

  const show = useCallback(
    (i: number) => {
      videoRefs.current.forEach((video, k) => {
        if (!video) return
        if (k !== i) video.pause()
        else video.currentTime = 0
      })
      setActive(i)
      setProgress(0)
      play(i)
    },
    [play]
  )

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting
        const video = videoRefs.current[active]
        if (!video) return
        if (entry.isIntersecting && !reduced.current) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.35 }
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [active])

  const next = (i: number) => (i + 1) % steps.length

  return (
    <div ref={rootRef} className="mt-10">
      <div className="grid overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
        {steps.map((step, i) => (
          <video
            key={step.src}
            ref={(el) => {
              videoRefs.current[i] = el
            }}
            src={step.src}
            muted
            playsInline
            preload={i === active || i === next(active) ? 'auto' : 'metadata'}
            aria-label={step.label}
            className={clsx(
              'col-start-1 row-start-1 block h-auto w-full transition-opacity duration-300',
              i === active ? 'opacity-100' : 'opacity-0'
            )}
            onTimeUpdate={(e) => {
              if (i !== active) return
              const video = e.currentTarget
              const length = Math.min(STEP_SECONDS, video.duration || STEP_SECONDS)
              setProgress(Math.min(video.currentTime / length, 1))
              if (video.currentTime >= STEP_SECONDS) show(next(i))
            }}
            onEnded={() => i === active && show(next(i))}
            // A clip that fails to load hands off to the next one instead of stalling the loop.
            onError={() => i === active && window.setTimeout(() => show(next(i)), 1500)}
          />
        ))}
      </div>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const isActive = i === active
          return (
            <li key={step.title} className="flex">
              <button
                type="button"
                onClick={() => show(i)}
                aria-pressed={isActive}
                className={clsx(
                  'relative flex w-full flex-col gap-1 overflow-hidden rounded-xl border bg-white p-5 text-left transition duration-200',
                  isActive
                    ? 'border-accent shadow-[0_6px_18px_rgba(240,45,94,0.12)]'
                    : 'border-gray-200 opacity-70 hover:border-gray-300 hover:opacity-100'
                )}
              >
                <span className="flex items-center gap-2 font-semibold text-gray-900">
                  <span
                    className={clsx(
                      'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors',
                      isActive
                        ? 'bg-accent text-white'
                        : 'border border-accent/30 bg-accent/10 text-accent'
                    )}
                  >
                    {i + 1}
                  </span>
                  {step.title}
                </span>
                <span className="text-sm leading-relaxed text-gray-600">{step.body}</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-accent"
                  style={{ transform: `scaleX(${isActive ? progress : 0})` }}
                />
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

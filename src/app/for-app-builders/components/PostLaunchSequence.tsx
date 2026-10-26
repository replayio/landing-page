'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

// Each step lights in turn, then a pulse rides the rail from step 4 back to step 1.
const STEP_MS = 1700
const LOOP_MS = 1500

const steps = [
  { title: 'User sessions on your site/app', body: 'Real users click through the live app.' },
  {
    title: 'Fullstory detects frustration signals',
    body: "Fullstory's Subtext snippet watches each session and flags when something goes wrong.",
    logo: true
  },
  {
    title: 'Replay QA generates bug reports',
    body: 'Reproduces the problem, finds the root cause from the recording, and files an agent-ready bug report.',
    us: true
  },
  {
    title: 'Builder fixes and lands changes',
    body: 'Your build loop fixes the bug, Replay QA verifies the fix, and the change ships automatically.'
  }
]

export function PostLaunchSequence() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(-1)

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer = 0
    let current = -1
    const next = () => {
      current = (current + 1) % (steps.length + 1)
      setPhase(current)
      timer = window.setTimeout(next, current === steps.length ? LOOP_MS : STEP_MS)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) next()
        if (!entry.isIntersecting && timer) {
          window.clearTimeout(timer)
          timer = 0
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(root)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="The post-launch sequence: user sessions on your site or app, Fullstory detects frustration signals, Replay QA generates bug reports, and your builder fixes and lands changes. It runs continuously."
      className={clsx('ab-seq relative mt-10 pl-9', phase === steps.length && 'looping')}
    >
      <ol className="flex flex-col gap-[22px]">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className={clsx(
              'relative flex items-start gap-3.5 rounded-xl border px-5 py-4 transition duration-300',
              step.us ? 'border-gray-900 bg-gray-900' : 'border-gray-200 bg-white',
              phase === i &&
                'active translate-x-1 !border-accent shadow-[0_8px_22px_rgba(240,45,94,0.14)]'
            )}
          >
            <span
              className={clsx(
                'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors',
                phase === i
                  ? 'bg-accent text-white'
                  : step.us
                    ? 'bg-white/15 text-white'
                    : 'border border-accent/30 bg-accent/10 text-accent'
              )}
            >
              {i + 1}
            </span>
            <div className="flex flex-col gap-0.5">
              <span
                className={clsx(
                  'inline-flex flex-wrap items-center gap-2 font-semibold',
                  step.us ? 'text-white' : 'text-gray-900'
                )}
              >
                {step.title}
                {step.logo && (
                  <Image
                    src="/for-app-builders/fullstory.svg"
                    alt="Fullstory"
                    width={74}
                    height={14}
                    className="h-3.5 w-auto opacity-80"
                  />
                )}
              </span>
              <span
                className={clsx(
                  'text-sm leading-relaxed',
                  step.us ? 'text-gray-300' : 'text-gray-600'
                )}
              >
                {step.body}
              </span>
            </div>
            {i < steps.length - 1 && <i className="ab-seq-flow" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <div className="ab-seq-rail" aria-hidden="true">
        <i />
      </div>
      <p className="mt-4 text-sm font-semibold text-accent">
        ↺ Always on: the next sessions run on the improved app.
      </p>
    </div>
  )
}

'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import clsx from 'clsx'
import { MOBILE_MEDIA } from '~/app/components/AutoplayVideo'

// Each step plays the first STEP_SECONDS of its /how-it-works clip, then the next step takes over, on a loop.
const STEP_SECONDS = 5

const steps: Array<{
  title: string
  body: string
  src: string
  mobileSrc: string
  label: string
}> = [
  {
    title: 'Explores',
    body: 'Opens the app in a real browser and discovers its user journeys, including ones nobody specified.',
    src: '/02-Exploration-v2-Light.mp4',
    mobileSrc: '/02-Exploration-v2-Light_mobile.mp4',
    label:
      'Replay QA agents exploring an app, mapping pages and user journeys as a growing web of connections'
  },
  {
    title: 'Tests',
    body: 'Writes and runs its own tests against those journeys in our instrumented Chromium browser.',
    src: '/03-Testing-Light.mp4',
    mobileSrc: '/03-Testing-Light_mobile.mp4',
    label:
      'Parallel agent sessions running user journeys while every DOM mutation, network call, and JavaScript frame is recorded'
  },
  {
    title: 'Records',
    body: 'Captures every run as a deterministic recording of the whole runtime.',
    src: '/04-Analysis-Light.mp4',
    mobileSrc: '/04-Analysis-Light_mobile.mp4',
    label:
      'An agent scrubbing a Replay Recording timeline, flagging a broken button, a slow network call, and a contrast warning'
  },
  {
    title: 'Reports',
    body: 'Returns each bug with its root cause, a suggested fix, and the recording, ready for your build loop.',
    src: '/05-Reports-Light.mp4',
    mobileSrc: '/05-Reports-Light_mobile.mp4',
    label:
      'A bug report card assembling itself: video thumbnail, annotated screenshot, severity badge, and root-cause text'
  }
]

// Below `md` the cards and videos become a swipeable carousel, one video + card per slide.
const mobileQuery = '(max-width: 767px)'
const subscribeMobile = (onChange: () => void) => {
  const mql = window.matchMedia(mobileQuery)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}
const getMobile = () => window.matchMedia(mobileQuery).matches

export function StepVideoPlayer() {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const settleTimer = useRef<number | undefined>(undefined)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const activeRef = useRef(0)
  const visible = useRef(false)
  const reduced = useRef(false)
  const isMobile = useSyncExternalStore(subscribeMobile, getMobile, () => false)

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
      activeRef.current = i
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
  }, [active, isMobile])

  // Scroll position that snaps slide i into place, clamped so the last slide still resolves.
  const slideLeft = (track: HTMLDivElement, i: number) => {
    const first = track.children[0] as HTMLElement
    const slide = track.children[i] as HTMLElement
    return Math.min(slide.offsetLeft - first.offsetLeft, track.scrollWidth - track.clientWidth)
  }

  // Keep the carousel on the active slide as the loop advances.
  useEffect(() => {
    const track = trackRef.current
    if (!isMobile || !track) return
    const left = slideLeft(track, active)
    if (Math.abs(track.scrollLeft - left) > 2) {
      track.scrollTo({ left, behavior: reduced.current ? 'auto' : 'smooth' })
    }
  }, [active, isMobile])

  // Once a swipe settles, make the slide it landed on the active step.
  const onTrackScroll = () => {
    window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(() => {
      const track = trackRef.current
      if (!track) return
      let nearest = 0
      steps.forEach((_, i) => {
        if (
          Math.abs(slideLeft(track, i) - track.scrollLeft) <
          Math.abs(slideLeft(track, nearest) - track.scrollLeft)
        )
          nearest = i
      })
      if (nearest !== activeRef.current) show(nearest)
    }, 120)
  }

  const next = (i: number) => (i + 1) % steps.length

  const card = (step: (typeof steps)[number], i: number) => {
    const isActive = i === active
    return (
      <button
        type="button"
        onClick={() => show(i)}
        aria-pressed={isActive}
        className={clsx(
          'relative flex w-full flex-1 flex-col gap-1 overflow-hidden rounded-xl border bg-white p-5 text-left transition duration-200',
          isActive
            ? 'border-accent shadow-[0_6px_18px_rgba(240,45,94,0.12)]'
            : 'border-gray-200 opacity-70 hover:border-gray-300 hover:opacity-100'
        )}
      >
        <span className="flex items-center gap-2 font-semibold text-gray-900">
          <span
            className={clsx(
              'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors',
              isActive ? 'bg-accent text-white' : 'border border-accent/30 bg-accent/10 text-accent'
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
    )
  }

  const video = (step: (typeof steps)[number], i: number, className: string) => (
    <video
      ref={(el) => {
        videoRefs.current[i] = el
      }}
      muted
      playsInline
      preload={i === active || i === next(active) ? 'auto' : 'metadata'}
      aria-label={step.label}
      className={className}
      onTimeUpdate={(e) => {
        if (i !== active) return
        const video = e.currentTarget
        const length = Math.min(STEP_SECONDS, video.duration || STEP_SECONDS)
        setProgress(Math.min(video.currentTime / length, 1))
        if (video.currentTime >= STEP_SECONDS) show(next(i))
      }}
      onEnded={() => i === active && show(next(i))}
    >
      <source src={step.mobileSrc} type="video/mp4" media={MOBILE_MEDIA} />
      {/* With <source> children, a failed load fires error on the last source rather than the
          video. A clip that fails hands off to the next one instead of stalling the loop. */}
      <source
        src={step.src}
        type="video/mp4"
        onError={() => i === active && window.setTimeout(() => show(next(i)), 1500)}
      />
    </video>
  )

  if (isMobile) {
    return (
      <div ref={rootRef} className="mt-10">
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          aria-roledescription="carousel"
          className="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
        >
          {steps.map((step, i) => (
            <div
              key={step.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${steps.length}: ${step.title}`}
              className="flex w-[85%] shrink-0 snap-start snap-always flex-col gap-3"
            >
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                {video(step, i, 'block h-auto w-full')}
              </div>
              {card(step, i)}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {steps.map((step, i) => (
            <button
              key={step.src}
              type="button"
              onClick={() => show(i)}
              aria-label={`Show step ${i + 1}: ${step.title}`}
              aria-current={i === active}
              className={clsx(
                'h-2 rounded-full transition-all duration-300',
                i === active ? 'w-6 bg-accent' : 'w-2 bg-gray-300'
              )}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={rootRef} className="mt-10">
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="flex">
            {card(step, i)}
          </li>
        ))}
      </ol>
      <div className="mt-4 grid overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
        {steps.map((step, i) => (
          <div key={step.src} className="col-start-1 row-start-1">
            {video(
              step,
              i,
              clsx(
                'block h-auto w-full transition-opacity duration-300',
                i === active ? 'opacity-100' : 'opacity-0'
              )
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

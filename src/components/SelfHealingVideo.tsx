'use client'

import { useCallback, useRef, useState, type Ref } from 'react'
import clsx from 'clsx'
import { Play } from 'lucide-react'

const SRC = '/self-healing-mode-overview.mp4'
const POSTER = '/posters/self-healing-mode-overview.webp'

/**
 * The Self-healing Mode overview video, self-hosted so there's no YouTube branding, suggested
 * videos or end screens. It shows the poster and our own play button until it starts, then
 * the browser's native controls. Nothing beyond the poster downloads until someone presses play.
 * Pass `ref` to reach the <video> element, for example to pause it.
 */
export function SelfHealingVideo({
  ref,
  className
}: {
  ref?: Ref<HTMLVideoElement | null>
  className?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  // Keep our own handle on the element while also passing it to the caller's ref.
  const setVideo = useCallback(
    (el: HTMLVideoElement | null) => {
      videoRef.current = el
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    },
    [ref]
  )

  return (
    <div className={clsx('relative aspect-video overflow-hidden bg-black', className)}>
      <video
        ref={setVideo}
        src={SRC}
        poster={POSTER}
        preload="none"
        playsInline
        controls={started}
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        onPlay={() => setStarted(true)}
        className="h-full w-full"
        aria-label="Replay QA: Introducing Self-healing Mode"
      />
      {!started && (
        <button
          type="button"
          // play() rejects if a pause() lands first, e.g. the banner closing mid-start. That's fine.
          onClick={() => videoRef.current?.play().catch(() => {})}
          className="group absolute inset-0 flex items-center justify-center"
          aria-label="Play the Self-healing Mode overview video"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-[0_8px_30px_rgba(240,45,94,0.45)] transition group-hover:scale-105 group-hover:bg-accent-light sm:h-16 sm:w-16">
            <Play className="ml-1 h-6 w-6 fill-white text-white sm:h-7 sm:w-7" />
          </span>
        </button>
      )}
    </div>
  )
}

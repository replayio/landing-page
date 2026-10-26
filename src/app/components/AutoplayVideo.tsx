'use client'

import { useEffect, useRef } from 'react'

// Matches Tailwind's below-`md` range; browsers pick the first <source> whose media matches.
export const MOBILE_MEDIA = '(max-width: 767px)'

export function AutoplayVideo({
  src,
  mobileSrc,
  label,
  poster,
  className = 'w-full h-auto block'
}: {
  src: string
  mobileSrc?: string
  label: string
  poster?: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )

    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      loop
      muted
      playsInline
      preload="none"
      aria-label={label}
      poster={poster}
    >
      {mobileSrc && <source src={mobileSrc} type="video/mp4" media={MOBILE_MEDIA} />}
      <source src={src} type="video/mp4" />
    </video>
  )
}

'use client'

import { useEffect, useRef } from 'react'

export function AutoplayVideo({
  src,
  label,
  poster,
  className = 'w-full h-auto block'
}: {
  src: string
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
      aria-label={label}
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

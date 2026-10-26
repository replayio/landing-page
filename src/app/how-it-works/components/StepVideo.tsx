'use client'

import { useEffect, useRef } from 'react'
import { MOBILE_MEDIA } from '~/app/components/AutoplayVideo'

export function StepVideo({
  webmSrc,
  mp4Src,
  mobileMp4Src,
  poster,
  label
}: {
  webmSrc?: string
  mp4Src: string
  mobileMp4Src?: string
  poster?: string
  label: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    // Nothing downloads on page load (preload="none"); start buffering once the video is
    // within a screen of the viewport so it's ready by the time it scrolls into view.
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        video.preload = 'auto'
        loader.disconnect()
      },
      { rootMargin: '100% 0px' }
    )

    const player = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )

    loader.observe(video)
    player.observe(video)
    return () => {
      loader.disconnect()
      player.disconnect()
    }
  }, [])

  return (
    <video
      ref={ref}
      // aspect-video reserves the 16:9 box before any video data has loaded, so nothing shifts.
      className="aspect-video w-full rounded-xl border border-gray-200"
      loop
      muted
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
    >
      {mobileMp4Src && <source src={mobileMp4Src} type="video/mp4" media={MOBILE_MEDIA} />}
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      <source src={mp4Src} type="video/mp4" />
    </video>
  )
}

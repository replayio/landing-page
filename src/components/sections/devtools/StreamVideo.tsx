'use client'

import { useEffect, useRef, useState } from 'react'
import type Hls from 'hls.js'

type StreamVideoProps = {
  playbackId: string
  className?: string
  style?: React.CSSProperties
}

// Mux serves every asset as HLS. min_resolution matches the 720p floor the Mux
// player used to request.
const streamUrl = (playbackId: string) =>
  `https://stream.mux.com/${playbackId}.m3u8?min_resolution=720p`

const posterUrl = (playbackId: string) => `https://image.mux.com/${playbackId}/thumbnail.webp`

/**
 * Muted, looping, autoplaying Mux video without the Mux player. Safari plays HLS
 * natively; everywhere else hls.js is loaded on demand, so it only ships to visitors
 * who actually scroll to a video.
 */
export function StreamVideo({ playbackId, className, style }: StreamVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)

  // Same as the Mux player's loading="viewport": fetch nothing, not even the poster,
  // until the video is close to the screen.
  useEffect(() => {
    const video = videoRef.current
    if (!video || inView) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [inView])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !inView) return

    const src = streamUrl(playbackId)
    let hls: Hls | undefined
    let cancelled = false

    // React does not reliably reflect `muted` as an attribute, and browsers only
    // allow autoplay for muted media, so set the property before loading.
    video.muted = true

    const play = () => {
      video.play().catch(() => {})
    }

    // Prefer hls.js wherever Media Source Extensions exist, like the Mux player did.
    // Native HLS is only the fallback (older iOS): recent Chrome also claims native
    // HLS support but did not reliably start playback with it.
    import('hls.js').then(({ default: HlsJs }) => {
      if (cancelled) return
      if (HlsJs.isSupported()) {
        hls = new HlsJs()
        hls.on(HlsJs.Events.MANIFEST_PARSED, play)
        hls.loadSource(src)
        hls.attachMedia(video)
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src
        play()
      }
    })

    return () => {
      cancelled = true
      hls?.destroy()
      video.removeAttribute('src')
      video.load()
    }
  }, [playbackId, inView])

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      poster={inView ? posterUrl(playbackId) : undefined}
      muted
      autoPlay
      loop
      playsInline
    />
  )
}

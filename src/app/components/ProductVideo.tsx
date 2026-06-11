'use client'

import { useEffect, useRef } from 'react'
import { Container } from '~/components/Container'

export function ProductVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative isolate overflow-hidden bg-white py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="aspect-video overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
            <video
              ref={ref}
              src="/ReplayQA-Edit.mp4"
              className="h-full w-full object-cover"
              muted
              playsInline
              loop
              controls
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

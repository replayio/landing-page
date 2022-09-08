// import dynamic from 'next/dynamic'

import { gsap } from 'lib/gsap'
import { useEffect, useRef } from 'react'

import { Container } from '~/components/layout/container'
import { useDeviceDetect } from '~/hooks/use-device-detect'

import { Code } from './code'
import { Debugger } from './debugger'
import { DevTools } from './devtools'
import { OverboardStore } from './overboard-store'
import ReplayApplication from './scrollytelling'

// const ReplayApplication = dynamic(() => import('./scrollytelling'), {
//   ssr: false
// })

export function OverboardStory() {
  const { isDesktop } = useDeviceDetect()
  const containerRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   let int

  //   gsap.delayedCall(3, () => {
  //     int = setInterval(() => {
  //       console.log('Hi')
  //       window.scroll({ top: window.scrollY + 2.5 })
  //     }, 1)
  //   })

  //   return () => {
  //     if (int) {
  //       clearInterval(int)
  //     }
  //   }
  // }, [])

  useEffect(() => {
    if (isDesktop === undefined) return
    const tween = gsap.to(containerRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      delay: 0.5,
      duration: 0.5,
      ease: 'ease-out'
    })

    return () => {
      tween.kill()
    }
  }, [isDesktop])

  return (
    <Container
      size="lg"
      ref={containerRef}
      style={{ opacity: 0, transform: 'translateY(30px)' }}
    >
      {isDesktop ? (
        <ReplayApplication />
      ) : (
        <video
          style={{ borderRadius: 12, zIndex: 10 }}
          muted
          playsInline
          src="/video/hero-video.mp4"
          controls
          poster="/video/hero-video-thumbnail.png"
        />
      )}
    </Container>
  )
}

export { Code, Debugger, DevTools, OverboardStore }

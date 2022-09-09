// import dynamic from 'next/dynamic'

// import { gsap } from 'lib/gsap'
// import { useEffect } from 'react'

import { Container } from '~/components/layout/container'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { useViewportSize } from '~/hooks/use-viewport-size'

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
  const { height } = useViewportSize()
  const SCROLLYTELLING_MIN_HEIGHT = 650

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

  const canFitScrollytelling = height >= SCROLLYTELLING_MIN_HEIGHT

  return (
    <Container size="lg">
      {isDesktop && canFitScrollytelling ? (
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

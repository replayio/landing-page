import { useRef } from 'react'

import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { gsap } from '~/lib/gsap'

export const Burger = ({ isOpen }: { isOpen: boolean }) => {
  const tl = useRef<GSAPTimeline>()
  const topRef = useRef(null)
  const middleRef = useRef(null)
  const bottomRef = useRef(null)

  useIsomorphicLayoutEffect(() => {
    tl.current = gsap.timeline({
      paused: true,
      smoothChildTiming: true
    })

    tl.current
      .to(topRef.current, {
        y: -3,
        transformOrigin: '50% 50%'
      })
      .to(
        bottomRef.current,
        {
          y: 3,
          transformOrigin: '50% 50%'
        },
        '<'
      )
      .to(middleRef.current, { xPercent: -25, autoAlpha: 0 }, '<')
      .add('rotate')
      .to(topRef.current, { y: 6 }, 'rotate')
      .to(bottomRef.current, { y: -6 }, 'rotate')
      .to(topRef.current, { rotationZ: 45, transformOrigin: '50% 50%' }, 'rotate')
      .to(bottomRef.current, { rotationZ: -45, transformOrigin: '50% 50%' }, 'rotate')
      .timeScale(2.6)

    return () => {
      tl.current?.kill()
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      tl.current?.play()
    } else {
      tl.current?.reverse()
    }
  }, [isOpen])

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 18H21"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
        ref={bottomRef}
      />
      <path
        d="M3 12H21"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
        ref={middleRef}
      />
      <path
        d="M3 6H21"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
        ref={topRef}
      />
    </svg>
  )
}

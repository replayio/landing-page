import * as React from 'react'

import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { gsap } from '~/lib/gsap'

const Burger = ({
  className,
  fill,
  isOpen
}: {
  className?: string
  fill?: string
  isOpen: boolean
}) => {
  const timelineRef = React.useRef<GSAPTimeline>()
  const topRef = React.useRef(null)
  const middleRef = React.useRef(null)
  const bottomRef = React.useRef(null)

  useIsomorphicLayoutEffect(() => {
    timelineRef.current = gsap.timeline({
      paused: true,
      reversed: true,
      smoothChildTiming: true
    })

    timelineRef.current.to(topRef.current, {
      y: -4,
      transformOrigin: '50% 50%'
    })
    timelineRef.current.to(
      bottomRef.current,
      {
        y: 4,
        transformOrigin: '50% 50%'
      },
      '<'
    )
    timelineRef.current.to(
      middleRef.current,
      {
        scale: 0.1,
        transformOrigin: '50% 50%'
      },
      '<'
    )
    timelineRef.current.add('rotate')
    timelineRef.current.to(topRef.current, { y: 6 }, 'rotate')
    timelineRef.current.to(bottomRef.current, { y: -6 }, 'rotate')
    timelineRef.current.to(topRef.current, { rotationZ: 45, transformOrigin: '50% 50%' }, 'rotate')
    timelineRef.current.to(
      bottomRef.current,
      { rotationZ: -45, transformOrigin: '50% 50%' },
      'rotate'
    )

    timelineRef.current.timeScale(2.23)

    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      timelineRef.current?.play()
    } else {
      timelineRef.current?.reverse()
    }
  }, [isOpen])

  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 18H21"
        stroke={fill || '#000'}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
        ref={bottomRef}
      />
      <path
        d="M3 12H21"
        stroke={fill || '#000'}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
        ref={middleRef}
      />
      <path
        d="M3 6H21"
        stroke={fill || '#000'}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
        ref={topRef}
      />
    </svg>
  )
}

export default Burger

import React, { useRef } from 'react'

import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { useViewportSize } from '~/hooks/use-viewport-size'
import { gsap, SplitText } from '~/lib/gsap'

import s from './text-reveal.module.scss'

export const TextReveal = () => {
  const { height } = useViewportSize()
  const textRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)

  const tl = useRef<GSAPTimeline>()

  useIsomorphicLayoutEffect(() => {
    const txt = textRef.current
    const section = sectionRef.current
    const pin = spacerRef.current

    if (!txt || !section || !pin) return

    const words = new SplitText(txt, {
      type: 'words'
    })

    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: pin,
            start: 'top-=50px top',
            end: 'bottom top',
            scrub: true
          }
        })
        .fromTo(
          words.words,
          {
            opacity: 0.2
          },
          {
            duration: 2,
            opacity: 1,
            stagger: 1.5
          }
        )
        .to(
          txt,
          {
            duration: 20,
            rotateX: 15
          },
          '<+10'
        )
        .to(
          txt,
          {
            duration: 25,
            translateZ: '-100'
          },
          '<+10'
        )
    }, sectionRef)

    return () => {
      words.revert()
      ctx.revert()
      ctx.kill()
    }
  }, [height])

  return (
    <div
      ref={spacerRef}
      style={{
        height: '250vh',
        position: 'relative'
      }}
    >
      <div ref={sectionRef} className={s['section']}>
        <div ref={containerRef} className={s['textContainer']}>
          <h4 ref={textRef} className={s['text']}>
            More fundamentally, time travel changes the way we see our software
            and collaborate with our teams.
          </h4>
        </div>
      </div>
    </div>
  )
}

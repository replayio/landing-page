import dynamic, { LoaderComponent } from 'next/dynamic'
import React, { useRef } from 'react'

import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { useViewportSize } from '~/hooks/use-viewport-size'
import { gsap, SplitText } from '~/lib/gsap'

import s from './text-reveal.module.scss'

const Sky = dynamic(
  () => import('~/components/common/sky').then((m) => m.Sky) as LoaderComponent,
  {
    ssr: false
  }
)
export const TextReveal = () => {
  const { height } = useViewportSize()
  const textRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  const tl = useRef<GSAPTimeline>()

  useIsomorphicLayoutEffect(() => {
    const txt = textRef.current
    const section = sectionRef.current
    const bg = backgroundRef.current
    if (!txt || !section || !bg) return
    const words = new SplitText(txt, {
      type: 'words'
    })

    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+${height * 1.5}`,
            scrub: true,
            pin: true
          }
        })
        .from(
          words.words,
          {
            duration: 2,
            opacity: 0.2,
            stagger: 1.5,

            delay: 5
          },
          5
        )
        .to(txt, {
          duration: 20,
          delay: 10,
          rotateX: 25
        })
        .to(
          bg,
          {
            duration: 20,
            autoAlpha: 0
          },
          '<'
        )
        .to(
          txt,
          {
            duration: 40,
            translateZ: '-100',
            translateY: '-70vh'
          },
          '<+10'
        )
    }, sectionRef)

    return () => {
      words.revert()
      ctx.revert()
      ctx.clear()
      ctx.kill()
    }
  }, [height])
  return (
    <div ref={sectionRef} className={s['section']}>
      <div ref={backgroundRef} className={s['bg-container']}>
        <Sky />
        <span className={s['groundLight']} />
        <div className={s['lights']}>
          <span className={s['light-1']} />
          <span className={s['light-2']} />
          <span className={s['light-3']} />
        </div>
      </div>
      <div ref={containerRef} className={s['textContainer']}>
        <h4 ref={textRef} className={s['text']}>
          Recording and replaying software has the ability to change the way we
          see and understand our systems.
        </h4>
      </div>
    </div>
  )
}

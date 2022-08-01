import type { Colorway, HoverboardControls } from '@replayio/overboard'
import { Color, Colors, colorways, Hoverboard, Logo } from '@replayio/overboard'
import { gsap, ScrollTrigger } from 'lib/gsap'
import React, { useRef, useState } from 'react'

import { Logo as ReplayLogo } from '~/components/primitives/logo'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import avatarOne from '~/public/images/home/avatar-1.webp'
import avatarTwo from '~/public/images/home/avatar-2.webp'
import avatarThree from '~/public/images/home/avatar-3.webp'

import { Code } from './code'
import { DevTools } from './devtools'
import { OverboardStore as NewOverboardStore } from './overboard-store'
import s from './overboard-story.module.scss'
import { Story } from './story'

function ViewToggle() {
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref.current?.closest('section'),
          start: '+=100vh',
          end: '+=400vh',
          scrub: true
        }
      })
      .fromTo(
        ref.current,
        { clipPath: 'inset(4px 50% 4px 4px round 4px)' },
        { clipPath: 'inset(4px 4px 4px 50% round 4px)' }
      )
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        backgroundColor: '#F5F5F5',
        color: '#464646',
        padding: 4,
        borderRadius: 8,
        fontSize: 14,
        textAlign: 'center'
      }}
    >
      <div
        ref={ref}
        aria-hidden={true}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'inline-grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          padding: 4,
          borderRadius: 8,
          backgroundColor: '#464646',
          color: '#FFFFFF',
          transition: 'clip-path 0.16s ease-out'
        }}
      >
        <span
          style={{
            gridArea: '1 / 1',
            padding: '4px 16px'
          }}
        >
          Viewer
        </span>
        <span
          style={{
            gridArea: '1 / 2',
            padding: '4px 16px'
          }}
        >
          DevTools
        </span>
      </div>

      <button
        onClick={() =>
          window.scrollTo({
            top: document.getElementById('overboard-story')?.offsetTop,
            behavior: 'smooth'
          })
        }
        style={{
          all: 'unset',
          gridColumn: 1,
          gridRow: 1,
          padding: '4px 16px'
        }}
      >
        Viewer
      </button>

      <button
        onClick={() =>
          window.scrollTo({
            top:
              (document.getElementById('overboard-story')?.offsetTop ?? 0) +
              window.innerHeight,
            behavior: 'smooth'
          })
        }
        style={{
          all: 'unset',
          gridColumn: 2,
          gridRow: 1,
          padding: '4px 16px'
        }}
      >
        DevTools
      </button>
    </div>
  )
}

export function ReplayApplication() {
  const applicationRef = useRef<HTMLDivElement>(null)
  const padding = 16
  const frameHeight = `calc(100vh - ${padding * 2}px)`

  useIsomorphicLayoutEffect(() => {
    if (applicationRef.current) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: applicationRef.current.closest('section'),
            start: 0,
            end: '+=100vh',
            scrub: true
          }
        })
        .from(applicationRef.current, {
          opacity: 0,
          yPercent: 10,
          scale: 0.98
        })
    }
  }, [])

  return (
    <div
      ref={applicationRef}
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        height: frameHeight,
        overflow: 'hidden',
        borderRadius: 16,
        border: '1px solid #DCDCDC'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 32px',
          backgroundColor: 'white',
          borderBottom: '1px solid #DCDCDC'
        }}
      >
        <div style={{ width: 96 }}>
          <ReplayLogo />
        </div>
        <div
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: 32,
            gap: 8,
            marginLeft: 'auto',
            marginRight: 24
          }}
        >
          <img src={avatarOne.src} style={{ borderRadius: '100%' }} />
          <img src={avatarTwo.src} style={{ borderRadius: '100%' }} />
          <img src={avatarThree.src} style={{ borderRadius: '100%' }} />
        </div>
        <ViewToggle />
      </div>

      <DevTools panel="react" />
    </div>
  )
}

export function OverboardStore() {
  const ref = useRef<HTMLImageElement>(null)
  const hoverboardRef = useRef<HoverboardControls>(null)
  const [color, setColor] = useState<Colorway>('red')
  // const padding = 16
  // const frameHeight = `calc(100vh - ${padding * 2}px)`

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      // gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ref.current.closest('section'),
      //       start: 0,
      //       end: '+=100vh',
      //       scrub: true
      //     }
      //   })
      //   .to(ref.current, {
      //     y: '4vh',
      //     scale: 0.85
      //   })

      // gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ref.current.closest('section'),
      //       start: '+=100vh',
      //       end: '+=200vh',
      //       scrub: true
      //     }
      //   })
      //   .to(ref.current, {
      //     x: '26vh',
      //     y: '-6vh',
      //     scale: 0.6
      //   })

      ScrollTrigger.create({
        trigger: ref.current.closest('section'),
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onLeaveBack: () => {
          hoverboardRef.current?.reset()
        },
        onUpdate: ({ progress }) => {
          const rotateValue = gsap.utils.mapRange(0, 1, 0, 360, progress)

          hoverboardRef.current?.rotate?.(rotateValue)

          const rotateText = document.getElementById('hoverboard-rotate')

          if (rotateText) {
            rotateText.innerText = rotateValue.toFixed(2)
          }
        }
      })
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateRows: '12vw 24vw auto',
        justifyItems: 'center',
        // gridArea: '1 / 1 / 1 / 1',
        // height: frameHeight,
        // width: '100%',
        padding: 64,
        borderRadius: 20,
        backgroundColor: '#1E076C'
      }}
    >
      <Logo />
      <Hoverboard ref={hoverboardRef} color={color} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Colors
          onColorChange={(color) => {
            // TODO: need to fix type in overboard design system
            // @ts-ignore
            setColor(color)
          }}
        >
          {Object.entries(colorways).map(([name, [start, end]]) => (
            <Color
              key={name}
              label={name}
              value={name.toLowerCase()}
              startColor={start}
              endColor={end}
            />
          ))}
        </Colors>
      </div>
    </div>
  )
}

export function OverboardStory() {
  const padding = 16
  const frameCount = 4

  return <Story />
  // return <ReplayApplication />

  return (
    <section
      id="overboard-story"
      style={{
        height: `max(calc(${frameCount * 100}vh - ${padding}px), 600px)`,
        padding: 80
      }}
    >
      <div style={{ position: 'sticky', top: padding }} className={s.grid}>
        <ReplayApplication />
      </div>
    </section>
  )
}

export { Code, DevTools, NewOverboardStore }

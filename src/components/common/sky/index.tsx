import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useViewportSize } from '~/hooks/use-viewport-size'

import s from './sky.module.scss'

type SkyElement =
  | {
      type: 'star'
      x: number
      y: number
      delayFactor: number
      isSmall: boolean
    }
  | {
      type: 'asteroid'
      x1: number
      x2: number
    }

export const Sky = () => {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize()
  const skyRef = useRef<HTMLDivElement>(null)
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (!skyRef.current) return

    const asteroids = skyRef.current.querySelectorAll(
      `.${s['asteroid-wrapper']}`
    )

    const tl = gsap.timeline({
      repeat: -1,
      delay: 2,
      repeatDelay: 10,
      defaults: { ease: 'none', duration: 1.25 }
    })

    asteroids.forEach((a) => {
      tl.fromTo(
        a,
        { ['--progress']: 0, ['--brightness-factor']: 0 },
        {
          ['--progress']: 1,
          ['--brightness-factor']: 1,
          modifiers: {
            ['--brightness-factor']: (v) => Math.sin(v * Math.PI)
          }
        },
        `>+=${gsap.utils.random(0, 1)}`
      )
    })

    return () => {
      tl.kill()
    }
  }, [])

  const generated = useMemo(() => {
    const gen: SkyElement[] = [...Array(40)].map((_) => {
      const isAsteroid = gsap.utils.random(0, 1) > 0.95 // 5% chance of being an asteroid

      if (isAsteroid) {
        const x1 = gsap.utils.random(-1, 1)
        const x2 = gsap.utils.random(
          ...(x1 < 0
            ? ([0, 1] as [number, number])
            : ([-1, 0] as [number, number]))
        )

        return {
          type: 'asteroid',
          x1,
          x2
        }
      }

      const isSmall = gsap.utils.random(0, 1) > 0.6 // 40% chance of being small

      return {
        type: 'star',
        x: gsap.utils.random(-1, 1),
        y: gsap.utils.random(-1, 1),
        delayFactor: gsap.utils.random(0, 1),
        isSmall
      }
    })

    return gen
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      setRender(true)
    }, 300)

    return () => {
      clearTimeout(t)
    }
  }, [])

  if (!render) return null
  return (
    <div className={s['sky']} ref={skyRef}>
      {generated.map((g, i) => {
        if (g.type === 'asteroid') {
          const vpw = viewportWidth || window.innerWidth
          const vph = viewportHeight || window.innerHeight
          const hvpw = vpw / 2
          const x1px = hvpw + g.x1 * hvpw
          const x2px = hvpw + g.x2 * hvpw
          const angle = (Math.atan2(x1px - x2px, vph) * 180) / Math.PI

          return (
            <div
              key={i}
              className={s['asteroid-wrapper']}
              style={{
                ['--x1' as string]: g.x1,
                ['--x2' as string]: g.x2,
                ['--angle' as string]: `${angle}deg`
              }}
            >
              <span className={s['asteroid']}>
                <div className={s['head']} />
                <div className={s['tail']} />
              </span>
            </div>
          )
        }

        return (
          <span
            key={i}
            className={clsx(s['star'], {
              [s['small'] as string]: g.isSmall
            })}
            style={{
              ['--x' as string]: g.x,
              ['--y' as string]: g.y,
              ['--delay-factor' as string]: g.delayFactor
            }}
          />
        )
      })}
    </div>
  )
}
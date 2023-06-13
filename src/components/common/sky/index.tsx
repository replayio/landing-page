import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import { useEffect, useMemo, useRef, useState } from 'react'
import mergeRefs from 'react-merge-refs'

import { useMeasure } from '~/hooks/use-measure'

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

export const Sky = ({
  withGradient = true,
  count = 40,
  withAsteroids = true
}) => {
  const skyRef = useRef<HTMLDivElement>(null)
  const [measureRef, bounds] = useMeasure()
  const [render, setRender] = useState(false)

  const generated = useMemo(() => {
    const gen: SkyElement[] = [...Array(count)].map((_) => {
      const isAsteroid = withAsteroids ? gsap.utils.random(0, 1) > 0.95 : false // 5% chance of being an asteroid

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
  }, [count, withAsteroids])

  useEffect(() => {
    if (!skyRef.current || !render || generated === null) return

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
  }, [render, generated])

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
    <div
      className={clsx(s['sky'], {
        [s['with-gradient'] as string]: withGradient
      })}
      ref={mergeRefs([skyRef, measureRef])}
    >
      {generated?.map((g, i) => {
        if (g.type === 'asteroid') {
          const vpw = bounds.width
          const vph = bounds.height
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
              <span className={s['asteroid'] as string}>
                <div className={s['head'] as string} />
                <div className={s['tail'] as string} />
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

import { MutableRefObject, useEffect, useRef } from 'react'

import { DURATION, gsap } from '~/lib/gsap'

export type AnimationFunction = () => gsap.core.Tween[]

export type AnimationCompRef = {
  enter: AnimationFunction
  exit: AnimationFunction
}

export const animateWaves = (container: SVGSVGElement) => {
  const selector = gsap.utils.selector(container)
  const waves = selector('.wave')

  gsap.set(waves, { transformOrigin: '50% 50%' })

  return gsap.fromTo(
    waves,
    {
      opacity: 1,
      scale: 0.6
    },
    {
      stagger: -0.1,
      opacity: 0,
      scale: 1.2,
      repeat: -1,
      duration: DURATION * 4
    }
  )
}

export const animateScale = (container: SVGSVGElement) => {
  const selector = gsap.utils.selector(container)
  const containers = selector('.scale')

  gsap.set(containers, { transformOrigin: '50% 50%' })

  return gsap.fromTo(
    containers,
    {
      opacity: 0,
      scale: 0
    },
    {
      stagger: 0.1,
      opacity: 1,
      scale: 1,
      duration: DURATION * 2,
      ease: 'power2.out'
    }
  )
}

export const animateUnscale = (
  container: SVGSVGElement,
  selectorArg = '.scale'
) => {
  const selector = gsap.utils.selector(container)
  const containers = selector(selectorArg || '.scale')

  gsap.set(containers, { transformOrigin: '50% 50%' })

  return gsap.to(containers, {
    opacity: 0,
    scale: 0.65,
    ease: 'power2.out',
    duration: DURATION
  })
}

export const clearProps = (elms: HTMLElement[]) => {
  return gsap.set(elms, {
    clearProps: 'all'
  })
}

export const useEnterExit = (
  ref: MutableRefObject<HTMLElement | null>,
  {
    enter,
    exit
  }: {
    enter: AnimationFunction
    exit: AnimationFunction
  },
  active: boolean
) => {
  const entranceTimelines = useRef<gsap.core.Tween[]>()
  const exitTimelines = useRef<gsap.core.Tween[]>()

  useEffect(() => {
    if (active) {
      exitTimelines.current?.forEach((tl) => {
        clearProps(tl.targets())
        tl.kill()
      })

      gsap.set(ref.current, { opacity: 1 })

      entranceTimelines.current = enter()
    } else {
      entranceTimelines.current?.forEach((tl) => {
        tl.kill()
      })

      exitTimelines.current = exit()
    }
  }, [active])

  useEffect(() => {
    if (ref.current) {
      gsap.set(ref.current, { opacity: 0 })
    }

    return () => {
      entranceTimelines.current?.forEach((tl) => {
        clearProps(tl.targets())
        tl.kill()
      })

      exitTimelines.current?.forEach((tl) => {
        clearProps(tl.targets())
        tl.kill()
      })
    }
  }, [])
}

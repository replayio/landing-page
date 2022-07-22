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

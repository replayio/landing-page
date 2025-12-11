import { useEffect, useRef, RefObject } from 'react'
import { gsap } from '~/lib/gsap'

/**
 * Hook to animate hero elements (title, subtitle) on page load
 * Creates a subtle fade-in animation with easing
 */
export function usePageLoadAnimation<T extends HTMLElement = HTMLElement, S extends HTMLElement = HTMLElement>() {
  const titleRef = useRef<T>(null)
  const subtitleRef = useRef<S>(null)

  useEffect(() => {
    const elements: HTMLElement[] = []
    
    if (titleRef.current) {
      elements.push(titleRef.current)
    }
    if (subtitleRef.current) {
      elements.push(subtitleRef.current)
    }

    if (elements.length === 0) return

    // Set initial state
    gsap.set(elements, {
      opacity: 0,
      y: 15
    })

    // Animate in with stagger - smoother easing and timing
    const tl = gsap.timeline({
      defaults: {
        ease: 'power1.out',
        duration: 1
      }
    })

    tl.to(elements, {
      opacity: 1,
      y: 0,
      stagger: 0.12
    })

    return () => {
      tl.kill()
    }
  }, [])

  return { titleRef: titleRef as RefObject<T>, subtitleRef: subtitleRef as RefObject<S> }
}

/**
 * Hook to animate all direct children of a container element on page load
 * Useful for animating entire sections with multiple elements
 */
export function usePageSectionAnimation<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const children = Array.from(container.children) as HTMLElement[]

    if (children.length === 0) return

    // Set initial state for all children
    gsap.set(children, {
      opacity: 0,
      y: 15
    })

    // Animate in with stagger - smoother easing and timing
    const tl = gsap.timeline({
      defaults: {
        ease: 'power1.out',
        duration: 0.9
      }
    })

    tl.to(children, {
      opacity: 1,
      y: 0,
      stagger: 0.1
    })

    return () => {
      tl.kill()
    }
  }, [])

  return containerRef as RefObject<T>
}

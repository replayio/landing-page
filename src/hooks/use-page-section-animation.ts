import { useEffect, useRef, RefObject } from 'react'

/**
 * Hook to animate all direct children of a container element on page load.
 * Uses CSS transitions instead of GSAP to avoid pulling a heavy animation
 * library into the critical path.
 */
export function usePageSectionAnimation<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const children = Array.from(container.children) as HTMLElement[]

    if (children.length === 0) return

    children.forEach((child, i) => {
      child.style.opacity = '0'
      child.style.transform = 'translateY(15px)'
      child.style.transition = 'opacity 0.9s ease-out, transform 0.9s ease-out'
      child.style.transitionDelay = `${i * 0.1}s`
    })

    requestAnimationFrame(() => {
      children.forEach((child) => {
        child.style.opacity = '1'
        child.style.transform = 'translateY(0)'
      })
    })

    return () => {
      children.forEach((child) => {
        child.style.opacity = ''
        child.style.transform = ''
        child.style.transition = ''
        child.style.transitionDelay = ''
      })
    }
  }, [])

  return containerRef as RefObject<T>
}

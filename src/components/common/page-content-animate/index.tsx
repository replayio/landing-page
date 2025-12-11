'use client'

import { ReactNode, useRef, useEffect } from 'react'
import { gsap } from '~/lib/gsap'

type PageContentAnimateProps = {
  children: ReactNode
  className?: string
}

/**
 * Client component wrapper that animates all direct children (sections) on page load
 * Use this to wrap the main content area to animate all sections
 */
export function PageContentAnimate({ children, className }: PageContentAnimateProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const sections = Array.from(container.children) as HTMLElement[]

    if (sections.length === 0) return

    // Set initial state for all sections (except first one which is already animated by hero)
    // Start from index 1 to skip the hero section
    const sectionsToAnimate = sections.slice(1)

    if (sectionsToAnimate.length === 0) return

    gsap.set(sectionsToAnimate, {
      opacity: 0,
      y: 20
    })

    // Animate in with stagger after a short delay - smoother easing
    const tl = gsap.timeline({
      delay: 0.4, // Slightly longer delay for smoother transition
      defaults: {
        ease: 'power1.out',
        duration: 0.9
      }
    })

    tl.to(sectionsToAnimate, {
      opacity: 1,
      y: 0,
      stagger: 0.12
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <main ref={containerRef as React.RefObject<HTMLElement>} className={className}>
      {children}
    </main>
  )
}

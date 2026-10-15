'use client'

import clsx from 'clsx'
import { ReactNode, useRef, useEffect } from 'react'

type PageContentAnimateProps = {
  children: ReactNode
  className?: string
}

/**
 * Client component wrapper that animates all direct children (sections) on page load.
 * Uses CSS transitions instead of GSAP to keep the animation library out of the
 * critical path.
 */
export function PageContentAnimate({ children, className }: PageContentAnimateProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const sections = Array.from(container.children) as HTMLElement[]

    if (sections.length === 0) return

    // Skip the hero section (index 0) — it has its own animation
    const sectionsToAnimate = sections.slice(1)
    if (sectionsToAnimate.length === 0) return

    // Set initial hidden state and configure staggered transitions
    sectionsToAnimate.forEach((section, i) => {
      section.style.opacity = '0'
      section.style.transform = 'translateY(20px)'
      section.style.transition = 'opacity 0.9s ease-out, transform 0.9s ease-out'
      section.style.transitionDelay = `${0.4 + i * 0.12}s`
    })

    // Trigger the transition on the next frame so the browser paints the hidden state first
    requestAnimationFrame(() => {
      sectionsToAnimate.forEach((section) => {
        section.style.opacity = '1'
        section.style.transform = 'translateY(0)'
      })
    })

    return () => {
      sectionsToAnimate.forEach((section) => {
        section.style.opacity = ''
        section.style.transform = ''
        section.style.transition = ''
        section.style.transitionDelay = ''
      })
    }
  }, [])

  return (
    <main
      ref={containerRef as React.RefObject<HTMLElement>}
      className={clsx('pt-[var(--site-header-offset)]', className)}
    >
      {children}
    </main>
  )
}

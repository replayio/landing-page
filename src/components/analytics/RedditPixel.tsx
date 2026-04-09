'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

const REDDIT_PIXEL_ID = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID ?? 'a2_irrbb7hibeno'

declare global {
  interface Window {
    rdt?: (...args: unknown[]) => void
  }
}

/**
 * Reddit Pixel (browser). No advanced matching — no logged-in users.
 * Fires PageVisit on first paint (snippet) and on client-side navigations (App Router).
 */
export function RedditPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastTrackedKey = useRef<string | null>(null)

  useEffect(() => {
    const qs = searchParams.toString()
    const pathKey = `${pathname}${qs ? `?${qs}` : ''}`

    let cancelled = false
    let tries = 0
    const maxTries = 60

    const id = setInterval(() => {
      if (cancelled) {
        clearInterval(id)
        return
      }
      tries++
      if (tries > maxTries) {
        clearInterval(id)
        return
      }
      if (typeof window === 'undefined' || !window.rdt) return

      clearInterval(id)
      if (lastTrackedKey.current === null) {
        lastTrackedKey.current = pathKey
        return
      }
      if (lastTrackedKey.current === pathKey) return
      lastTrackedKey.current = pathKey
      window.rdt('track', 'PageVisit')
    }, 50)

    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [pathname, searchParams])

  const snippet = `!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','${REDDIT_PIXEL_ID}');rdt('track', 'PageVisit');`

  return (
    <Script
      id="reddit-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: snippet }}
    />
  )
}

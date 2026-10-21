'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export const META_PIXEL_ID = '976686401546032'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Meta Pixel (browser).
 * Fires PageView on first load (snippet) and on client-side navigations (App Router).
 */
export function MetaPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastTrackedKey = useRef<string | null>(null)

  useEffect(() => {
    const qs = searchParams.toString()
    const pathKey = `${pathname}${qs ? `?${qs}` : ''}`

    // The snippet's own PageView covers the initial page (and any page navigated
    // to before the lazily-loaded snippet runs), so only track subsequent changes.
    if (lastTrackedKey.current === null) {
      lastTrackedKey.current = pathKey
      return
    }
    if (lastTrackedKey.current === pathKey) return
    lastTrackedKey.current = pathKey
    window.fbq?.('track', 'PageView')
  }, [pathname, searchParams])

  const snippet = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`

  return (
    <Script id="meta-pixel" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: snippet }} />
  )
}

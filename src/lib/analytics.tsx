'use client'

import { useEffect } from 'react'
import Script from 'next/script'

const GA_MEASUREMENT_ID = 'G-244NMJ9B93'

/**
 * Schedule a callback for when the browser is idle. Falls back to a 1s
 * setTimeout on Safari and older browsers that lack requestIdleCallback.
 */
function whenIdle(fn: () => void) {
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(fn)
  } else {
    setTimeout(fn, 1_000)
  }
}

export default function Analytics() {
  useEffect(() => {
    whenIdle(async () => {
      const [{ default: mixpanel }, { initPostHog }] = await Promise.all([
        import('mixpanel-browser'),
        import('~/lib/posthog')
      ])

      mixpanel.init('ffaeda9ef8fb976a520ca3a65bba5014', {
        track_pageview: 'url-with-path'
      })
      mixpanel.track('Loaded www.replay.io')
      initPostHog()
    })
  }, [])

  return (
    <>
      {/* Google Analytics — lazyOnload so it doesn't compete with first paint */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>

      {/* Umami Analytics */}
      <Script
        async
        src="https://analytics.umami.is/script.js"
        data-website-id="ded9f3fb-cc9d-4c80-844a-742787b8b9db"
        strategy="lazyOnload"
      />
    </>
  )
}

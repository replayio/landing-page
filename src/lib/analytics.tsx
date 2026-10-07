'use client'

import { useEffect } from 'react'
import Script from 'next/script'

const GA_MEASUREMENT_ID = 'G-244NMJ9B93'

export default function Analytics() {
  useEffect(() => {
    import('mixpanel-browser')
      .then(({ default: mixpanel }) => {
        mixpanel.init('ffaeda9ef8fb976a520ca3a65bba5014', {
          track_pageview: 'url-with-path'
        })
        mixpanel.track('Loaded www.replay.io')
      })
      .catch(() => {})

    import('~/lib/posthog')
      .then(({ initPostHog }) => initPostHog())
      .catch(() => {})
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

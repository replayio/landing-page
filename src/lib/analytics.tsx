'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import LogRocket from 'logrocket'
import mixpanel from 'mixpanel-browser'

const GA_MEASUREMENT_ID = 'G-244NMJ9B93'

export default function Analytics() {
  useEffect(() => {
    LogRocket.init('4sdo4i/replay-landing-page')
    mixpanel.init('ffaeda9ef8fb976a520ca3a65bba5014', {
      track_pageview: 'url-with-path'
    })
    mixpanel.track('Loaded www.replay.io')
  }, [])

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>

      {/* Umami Analytics */}
      <script
        async
        src="https://analytics.umami.is/script.js"
        data-website-id="ded9f3fb-cc9d-4c80-844a-742787b8b9db"
      ></script>

      {/* Mixpanel */}
      <script async src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"></script>
    </>
  )
}

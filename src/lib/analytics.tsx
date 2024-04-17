'use client'

import { useEffect } from 'react'
import LogRocket from 'logrocket'
import mixpanel from 'mixpanel-browser'

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
      <script
        async
        src="https://analytics.umami.is/script.js"
        data-website-id="ded9f3fb-cc9d-4c80-844a-742787b8b9db"
      ></script>
      <script async src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"></script>
    </>
  )
}

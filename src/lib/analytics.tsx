'use client'

import { useEffect } from 'react'
import LogRocket from 'logrocket'
import mixpanel from 'mixpanel-browser'

export default function Analytics() {
  useEffect(() => {
    LogRocket.init('4sdo4i/replay-docs')
    mixpanel.init('ffaeda9ef8fb976a520ca3a65bba5014')
    mixpanel.track('Loaded www.replay.io')
  }, [])

  return (
    <>
      <script
        async
        src="https://analytics.umami.is/script.js"
        data-website-id="9dab9357-6fa2-48ab-966a-82c4e1bb67fe"
      ></script>
      <script async src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"></script>
    </>
  )
}

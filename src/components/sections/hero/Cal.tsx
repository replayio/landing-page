'use client'

import { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'
import { Button } from '~/components/Button'

export default function MyApp({ link }: { link: any }) {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi()
      cal('ui', {
        theme: 'light',
        styles: { branding: { brandColor: '#F02D5E' } },
        hideEventTypeDetails: false,
        layout: 'month_view'
      })
    })()
  }, [])
  return (
    <Button
      data-cal-namespace=""
      data-cal-link="jason-laster/30min"
      data-cal-config='{"layout":"month_view"}'
      {...link}
    />
  )
}

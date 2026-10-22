import { Viewport } from 'next/types'
import { buildMetadata } from '~/components/seo-landing/SeoLandingPage'
import { CompareHub } from '~/components/compare/CompareHub'
import { compareHub } from '~/components/compare/content'

export const metadata = buildMetadata(compareHub)

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function Page() {
  return <CompareHub />
}

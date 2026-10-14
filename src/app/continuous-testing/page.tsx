import { Viewport } from 'next/types'
import { SeoLandingPage, seoLandingMetadata } from '~/components/seo-landing/SeoLandingPage'

export const metadata = seoLandingMetadata('continuous-testing')

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function ContinuousTestingPage() {
  return <SeoLandingPage variantKey="continuous-testing" />
}

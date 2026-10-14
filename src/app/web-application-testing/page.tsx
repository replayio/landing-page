import { Viewport } from 'next/types'
import { SeoLandingPage, seoLandingMetadata } from '~/components/seo-landing/SeoLandingPage'

export const metadata = seoLandingMetadata('web-application-testing')

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function WebApplicationTestingPage() {
  return <SeoLandingPage variantKey="web-application-testing" />
}

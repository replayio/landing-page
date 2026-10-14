import { Viewport } from 'next/types'
import { SeoLandingPage, seoLandingMetadata } from '~/components/seo-landing/SeoLandingPage'

export const metadata = seoLandingMetadata('automated-qa-testing')

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function AutomatedQATestingPage() {
  return <SeoLandingPage variantKey="automated-qa-testing" />
}

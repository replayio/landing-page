import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'

import { TermsOfService } from '~/components/sections/legal/terms'

export const metadata: Metadata = {
  title: 'Terms of Use: Replay Services Agreement',
  description:
    'The rules and restrictions that govern your use of the Replay website, products, services and applications. Read the full terms of use here.',
  alternates: {
    canonical: `${siteOrigin}/terms-of-service`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/terms-of-service`,
    title: 'Terms of Use: Replay Services Agreement',
    description:
      'The rules and restrictions that govern your use of the Replay website, products, services and applications. Read the full terms of use here.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'Terms of Use: Replay Services Agreement',
    description:
      'The rules and restrictions that govern your use of the Replay website, products, services and applications. Read the full terms of use here.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

const Terms = () => {
  return (
    <>
      <Header />
      <main>
        <div className="px-4">
          <TermsOfService />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Terms

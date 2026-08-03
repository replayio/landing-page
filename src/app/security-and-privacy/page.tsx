import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { Security } from '~/components/sections/legal/security'
import { defaultMeta, siteOrigin } from '~/lib/constants'

export const metadata: Metadata = {
  title: 'Security and Privacy at Replay',
  description:
    'How Replay secures your data, including our SOC 2 Type 2 monitoring, secure development lifecycle and the controls we apply across our services.',
  alternates: {
    canonical: `${siteOrigin}/security-and-privacy`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/security-and-privacy`,
    title: 'Security and Privacy at Replay',
    description:
      'How Replay secures your data, including our SOC 2 Type 2 monitoring, secure development lifecycle and the controls we apply across our services.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'Security and Privacy at Replay',
    description:
      'How Replay secures your data, including our SOC 2 Type 2 monitoring, secure development lifecycle and the controls we apply across our services.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

const Privacy = () => {
  return (
    <>
      <Header />
      <main>
        <div className="px-4">
          <Security />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Privacy

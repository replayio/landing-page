import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { defaultMeta, siteOrigin } from '~/lib/constants'

import s from '~/components/sections/branding/branding.module.scss'
import LogoDownloadWidget from '~/components/sections/branding/LogoDownloadWidget'
import StyleGuide from '~/components/sections/branding/StyleGuide'

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export const metadata: Metadata = {
  title: 'Replay Brand Assets: Logo and Styleguide',
  description:
    'Download the Replay logo as SVG and see our styleguide, including how we write product names and use sentence case across the brand.',
  alternates: {
    canonical: `${siteOrigin}/branding`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/branding`,
    title: 'Replay Brand Assets: Logo and Styleguide',
    description:
      'Download the Replay logo as SVG and see our styleguide, including how we write product names and use sentence case across the brand.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'Replay Brand Assets: Logo and Styleguide',
    description:
      'Download the Replay logo as SVG and see our styleguide, including how we write product names and use sentence case across the brand.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  }
}

const Branding = () => {
  return (
    <>
      <Header />
      <div className={s.section}>
        <LogoDownloadWidget />
        <StyleGuide />
      </div>
      <Footer />
    </>
  )
}

export default Branding

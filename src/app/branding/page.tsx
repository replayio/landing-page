import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { siteOrigin } from '~/lib/constants'

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

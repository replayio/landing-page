import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'

import s from '~/components/sections/branding/branding.module.scss'
import LogoDownloadWidget from '~/components/sections/branding/LogoDownloadWidget'
import StyleGuide from '~/components/sections/branding/StyleGuide'

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export const metadata: Metadata = {
  title: 'Branding'
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

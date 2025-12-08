import { Suspense } from 'react'
import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'

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
      <Suspense fallback={null}>
      <Header />
      </Suspense>
      <div className={s.section}>
        <LogoDownloadWidget />
        <StyleGuide />
      </div>
      <Footer />
    </>
  )
}

export default Branding

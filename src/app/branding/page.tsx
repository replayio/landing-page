import { Metadata } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'

import { TitleAndSubtitle } from '~/components/primitives/texts'
import s from '~/components/sections/branding/branding.module.scss'
import LogoDownloadWidget from '~/components/sections/branding/LogoDownloadWidget'
import StyleGuide from '~/components/sections/branding/StyleGuide'

export const metadata: Metadata = {
  title: 'Branding'
}

const Branding = () => {
  return (
    <>
      <Header />
      <div className={s.section}>
        <TitleAndSubtitle
          title={{
            className: s.title,
            as: 'h2',
            children: 'Branding Resources'
          }}
          subtitle={{
            children: ''
          }}
        />

        <LogoDownloadWidget />
        <StyleGuide />
      </div>
      <Footer />
    </>
  )
}

export default Branding

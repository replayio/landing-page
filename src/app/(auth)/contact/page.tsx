import { Suspense } from 'react'
import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import Script from 'next/script'

import ContactForm from '~/components/sections/contact/ContactForm'
import { Header } from '~/components/layout/header'

export const metadata: Metadata = {
  title: 'Contact'
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

const Contact = () => {
  return (
    <>
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />

      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <div>
        <ContactForm />
      </div>
      <Footer />
    </>
  )
}

export default Contact

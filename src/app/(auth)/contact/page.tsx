import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import Script from 'next/script'

import ContactForm from '~/components/sections/contact/ContactForm'

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

      <Header />
      <div>
        <ContactForm />
      </div>
      <Footer />
    </>
  )
}

export default Contact

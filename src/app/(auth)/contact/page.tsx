import { Metadata } from 'next'
import { Footer } from '~/components/Footer'
import Script from 'next/script'

import ContactForm from '~/components/sections/contact/ContactForm'
import { Header } from '~/components/layout/header'

export const metadata: Metadata = {
  title: 'Contact'
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

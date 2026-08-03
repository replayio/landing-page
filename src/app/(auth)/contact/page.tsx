import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import Script from 'next/script'

import ContactForm from '~/components/sections/contact/ContactForm'
import { Header } from '~/components/layout/header'
import { siteOrigin } from '~/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Replay: Talk to the Team',
  description:
    'Get in touch with the Replay team. Send us a message with the contact form, or join our Discord to ask questions and share feedback.',
  alternates: {
    canonical: `${siteOrigin}/contact`
  }
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

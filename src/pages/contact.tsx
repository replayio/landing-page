import Script from 'next/script'

import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import ContactForm from '~/components/sections/contact/ContactForm'

const Contact = () => {
  return (
    <>
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.Tally is now available`)
        }
      />

      <PageLayout>
        <Meta title="Contact | Replay" />

        <ContactForm />
      </PageLayout>
    </>
  )
}

export default Contact

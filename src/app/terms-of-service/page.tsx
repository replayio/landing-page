import { Metadata } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'

import { TermsOfService } from '~/components/sections/legal/terms'

export const metadata: Metadata = {
  title: 'Terms of Service'
}

const Terms = () => {
  return (
    <>
      <Header />
      <main>
        <div className="px-4">
          <TermsOfService />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Terms

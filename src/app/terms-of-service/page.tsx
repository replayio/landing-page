import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'

import { TermsOfService } from '~/components/sections/legal/terms'

export const metadata: Metadata = {
  title: 'Terms of Service'
}

export const viewport: Viewport = {
  themeColor: '#FFF'
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

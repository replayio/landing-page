import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import { Security } from '~/components/sections/legal/security'

export const metadata: Metadata = {
  title: 'Security and Privacy'
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

const Privacy = () => {
  return (
    <>
      <Header />
      <main>
        <div className="px-4">
          <Security />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Privacy

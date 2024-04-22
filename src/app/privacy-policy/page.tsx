import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import { Policy } from '~/components/sections/legal/policy'

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
        <Policy />
      </main>
      <Footer />
    </>
  )
}

export default Privacy

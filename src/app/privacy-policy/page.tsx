import { Suspense } from 'react'
import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
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
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main>
        <Policy />
      </main>
      <Footer />
    </>
  )
}

export default Privacy

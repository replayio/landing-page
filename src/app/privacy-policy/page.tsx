import { Metadata } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { Policy } from '~/components/sections/legal/policy'

export const metadata: Metadata = {
  title: 'Security and Privacy'
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

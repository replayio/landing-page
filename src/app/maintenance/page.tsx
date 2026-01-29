import { Suspense } from 'react'
import { Metadata, Viewport } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'

import { MaintenancePage } from '~/components/MaintenancePage'

export const metadata: Metadata = {
  title: 'Maintenance Support - Get Help for Your AI-Built Web App'
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

const Maintenance = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main>
        <MaintenancePage />
      </main>
      <Footer />
    </>
  )
}

export default Maintenance

import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import BuilderHomeMain from '~/components/BuilderLanding/Chat/Chat'
import { HowBuilderWorks } from '~/components/BuilderLanding/HowBuilderWorks/HowBuilderWorks'
import { ShowcaseGallery } from '~/components/BuilderLanding/ShowcaseGallery/ShowcaseGallery'
import { Connectors } from '~/components/BuilderLanding/Connectors/Connectors'
import { Pricing } from '~/components/BuilderLanding/Pricing/Pricing'
import { FAQs } from '~/components/BuilderLanding/Faqs/FAQs'

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main>
        <BuilderHomeMain />
        <ShowcaseGallery />
        <HowBuilderWorks />
        <Connectors />
        <Pricing />
        <FAQs />
      </main>
      <Footer />
    </>
  )
}

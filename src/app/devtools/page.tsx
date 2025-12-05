import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { DevTools } from '~/components/sections/DevTools'
import { Testimonials } from '~/components/Testimonials'
import { Pump } from '.basehub/react-pump'
import { draftMode } from 'next/headers'
import { landingPageFragment } from '~/lib/basehub-queries'
import FAQ from '~/components/sections/FAQ'
import { Hero } from '../components/hero'
import { Viewport } from 'next/types'
import { Header } from '~/components/layout/header'

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function DevToolsPage() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }}
      queries={[{ landingPage: landingPageFragment }]}
    >
      {async ([{ landingPage }]) => {
        'use server'
        console.log(landingPage)
        return (
          <>
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main>
              <Hero {...landingPage} />
              <DevTools {...landingPage} />
              <FAQ {...landingPage} />
              <Testimonials {...landingPage} />
            </main>
            <Footer />
          </>
        )
      }}
    </Pump>
  )
}


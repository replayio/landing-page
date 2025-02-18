import { Footer } from '~/components/Footer'
import { DevTools } from '~/components/sections/DevTools'
import { Testimonials } from '~/components/Testimonials'
import { Pump } from '.basehub/react-pump'
import { draftMode } from 'next/headers'
import { landingPageFragment } from '~/lib/basehub-queries'
import FAQ from '~/components/sections/FAQ'
import { Hero } from './components/hero'
import { Viewport } from 'next/types'
import { Header } from '~/components/layout/header'
import { Nut } from '~/components/sections/Nut'

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function Home() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }} // or { tags: ["basehub"] }
      queries={[{ landingPage: landingPageFragment }]}
    >
      {async ([{ landingPage }]) => {
        'use server'
        return (
          <>
            <Header />
            <main>
              <Hero {...landingPage} />
              <Nut {...landingPage} />
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

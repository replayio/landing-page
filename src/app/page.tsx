import { CallToAction } from '~/components/sections/CallToAction'
import { Footer } from '~/components/Footer'
import { DevTools } from '~/components/sections/DevTools'
import { TestSuites } from '~/components/sections/TestSuites'
import { Testimonials } from '~/components/Testimonials'
import { Pump } from '.basehub/react-pump'
import { draftMode } from 'next/headers'
import { landingPageFragment } from '~/lib/basehub-queries'
import FAQ from '~/components/sections/FAQ'
import DynamicAnalysis from '~/components/sections/DynamicAnalysis'
import { Content } from '~/components/sections/Content'
import { Hero } from './components/hero'
import { Viewport } from 'next/types'
import { Header } from '~/components/layout/header'

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
              <DevTools {...landingPage} />
              <TestSuites {...landingPage} />
              <FAQ {...landingPage} />
              <DynamicAnalysis {...landingPage} />
              <CallToAction {...landingPage} />
              <Testimonials {...landingPage} />
              <Content {...landingPage} />
            </main>
            <Footer />
          </>
        )
      }}
    </Pump>
  )
}

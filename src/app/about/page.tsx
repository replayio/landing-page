import { Pump } from '.basehub/react-pump'
import { draftMode } from 'next/headers'
import { aboutPageFragment } from '~/lib/basehub-queries'
import { Footer } from '~/components/Footer'
import { Hero } from '~/components/about/Hero'
import { Team } from '~/components/about/Team'
import { Values } from '~/components/about/Values'
import { Work } from '~/components/sections/about/work'
import { Metadata, Viewport } from 'next/types'
import { Header } from '~/components/layout/header'

export const metadata: Metadata = {
  title: 'About Us'
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default function Home() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }} // or { tags: ["basehub"] }
      queries={[{ aboutPage: aboutPageFragment }]}
    >
      {async ([{ aboutPage }]) => {
        'use server'
        return (
          <>
            <main>
              <Header />
              <Hero {...aboutPage} />
              <Values />
              <Team />
              <Work />
            </main>
            <Footer />
          </>
        )
      }}
    </Pump>
  )
}

import { Metadata, Viewport } from 'next'
import { Header } from '~/components/layout/header'
import { Hero } from '~/components/sections/404/hero'

export const metadata: Metadata = {
  title: 'Not found 404'
}

export const viewport: Viewport = {
  themeColor: '#0F172A'
}

export default function NotFound() {
  return (
    <>
      <Header variant="dark" className="!bg-transparent" />
      <main className="pt-[var(--header-height)]">
        <Hero />
      </main>
    </>
  )
}

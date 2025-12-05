import { Suspense } from 'react'
import { Metadata, Viewport } from 'next'
import { Header } from '~/components/layout/header'
import { Hero } from '~/components/sections/404/hero'

export const metadata: Metadata = {
  title: 'Not found 404'
}

export const viewport: Viewport = {
  themeColor: '#070a10'
}

export default function NotFound() {
  return (
    <>
      <Suspense fallback={null}>
        <Header variant="dark" className="!border-none !bg-transparent" />
      </Suspense>
      <main className="pt-[var(--header-height)]">
        <Hero />
      </main>
    </>
  )
}

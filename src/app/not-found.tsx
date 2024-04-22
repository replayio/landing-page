import { Header } from '~/components/layout/header'
import { Hero } from '~/components/sections/404/hero'

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

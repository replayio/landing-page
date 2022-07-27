import { ScrollTrigger } from 'lib/gsap'
import { useEffect } from 'react'

import { useViewportSize } from '~/hooks/use-viewport-size'

import { Link } from '../primitives/link'
import { AnnouncementBar } from './announcement-bar'
import { Footer } from './footer'
import { Header } from './header'

type Props = {
  children?: React.ReactNode
}

export const PageLayout = ({ children }: Props) => {
  const viewport = useViewportSize()

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [viewport.height, viewport.width])

  return (
    <>
      <AnnouncementBar
        text={
          <>
            Proudly backed by Andreessen Horowitz.{' '}
            <Link href="https://medium.com/replay-io/launching-replay-the-time-travel-debugger-for-the-web-f886f0897d38">
              Read&nbsp;More
            </Link>
          </>
        }
      />
      <Header />

      <main>{children}</main>
      <Footer />
    </>
  )
}

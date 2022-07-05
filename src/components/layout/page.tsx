import { ScrollTrigger } from 'lib/gsap'
import { useEffect } from 'react'

import { useViewportSize } from '~/hooks/use-viewport-size'

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
      {/* TODO Header */}
      {/* <Header /> */}
      <main>{children}</main>
      {/* TODO Footer */}
      {/* <Footer /> */}
    </>
  )
}

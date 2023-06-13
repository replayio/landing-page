import { useEffect, useState } from 'react'
import FastMarquee from 'react-fast-marquee'

import { useIntersectionObserver } from '~/hooks/use-intersection-observer'

type Marquee = typeof FastMarquee

const Marquee: Marquee = (props) => {
  const [ref, { inView }] = useIntersectionObserver<HTMLDivElement>({
    triggerOnce: false
  })
  const [play, setPlay] = useState<boolean>(true)

  useEffect(() => {
    if (!inView) {
      setPlay(false)
    } else if (inView) {
      setPlay(true)
    }
  }, [ref, inView])

  return (
    <div ref={ref}>
      <FastMarquee
        {...props}
        gradient={props.gradient ?? false}
        speed={props.speed ?? 30}
        play={play}
      >
        {props.children}
      </FastMarquee>
    </div>
  )
}

export default Marquee

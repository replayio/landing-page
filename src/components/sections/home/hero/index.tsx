import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import { FC, useRef } from 'react'

import { Heading } from '~/components/common/heading'
import { ProgressThumb } from '~/components/common/progress-bar'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { Button } from '~/components/primitives/button'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { useMedia } from '~/hooks/use-media'
import { breakpoints } from '~/lib/constants'

import s from './hero.module.scss'

export const Hero: FC = () => {
  const isDesktopSize = useMedia(`(min-width: ${breakpoints.screenLg}px)`)
  const ref = useRef<HTMLDivElement>(null)
  const { isDesktop } = useDeviceDetect()

  useIsomorphicLayoutEffect(() => {
    let tl: gsap.core.Timeline

    if (ref.current && isDesktopSize) {
      tl = gsap
        .timeline({
          scrollTrigger: {
            start: 0,
            end: 300,
            scrub: true
          }
        })
        .to(ref.current, {
          opacity: 0,
          scale: 0.97,
          y: -100
        })
    }

    return () => {
      tl?.scrollTrigger?.kill()
      tl?.kill()
    }
  }, [isDesktopSize])

  return (
    <Section className={s['section']} ref={ref}>
      <Container className={s['container']}>
        <div className={s['illustration']}>
          <span className={s['marker']}>
            <ProgressThumb active />
          </span>
          <svg
            width="1909"
            viewBox="0 0 1909 772"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="b"
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1909"
              height="772"
            >
              <path fill="url(#a)" d="M0 0h1909v772H0z" />
            </mask>
            <g mask="url(#b)">
              <path
                d="M2250.06 65 741.358 936.051"
                stroke="url(#c)"
                strokeDasharray="8 8"
              />
              <path
                d="M2029.13 872.16 354.001-94.9746"
                stroke="url(#d)"
                strokeDasharray="8 8"
              />
              <path
                d="M2250.06 520.051 741.358-351"
                stroke="url(#e)"
                strokeDasharray="8 8"
              />
              <path
                d="M2029.13-287.109 354.001 680.025"
                stroke="url(#f)"
                strokeDasharray="8 8"
              />
              <path
                d="M1440.31 1260V-674"
                stroke="url(#g)"
                strokeDasharray="8 8"
              />
            </g>
            <defs>
              <linearGradient
                id="a"
                x1="1909"
                y1="605.5"
                x2="247.513"
                y2="-484.34"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#D9D9D9" stopOpacity="0" />
                <stop offset=".0344073" stopColor="#D9D9D9" stopOpacity="0" />
                <stop offset=".162578" stopColor="#D9D9D9" />
                <stop offset=".475252" stopColor="#D9D9D9" />
                <stop offset=".553959" stopColor="#D9D9D9" stopOpacity="0" />
                <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="c"
                x1="721.349"
                y1="948.552"
                x2="2211.93"
                y2="85.446"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopOpacity=".1" />
                <stop offset=".480779" stopOpacity=".4" />
                <stop offset=".481095" stopColor="#F41C52" />
                <stop offset="1" stopColor="#F41C52" />
              </linearGradient>
              <linearGradient
                id="d"
                x1="411.314"
                y1="-62"
                x2="1759.31"
                y2="716"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopOpacity=".1" />
                <stop offset=".499484" stopOpacity=".4" />
                <stop offset=".499584" stopColor="#F41C52" />
                <stop offset="1" stopColor="#F41C52" />
              </linearGradient>
              <linearGradient
                id="e"
                x1="721.349"
                y1="-363.501"
                x2="2211.93"
                y2="499.605"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopOpacity=".1" />
                <stop offset=".480779" stopOpacity=".4" />
                <stop offset=".481095" stopColor="#F41C52" />
                <stop offset="1" stopColor="#F41C52" />
              </linearGradient>
              <linearGradient
                id="f"
                x1="411.314"
                y1="647.051"
                x2="1759.31"
                y2="-130.949"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopOpacity=".1" />
                <stop offset=".499484" stopOpacity=".4" />
                <stop offset=".499584" stopColor="#F41C52" />
                <stop offset="1" stopColor="#F41C52" />
              </linearGradient>
              <linearGradient
                id="g"
                x1="1440.31"
                y1="737"
                x2="1966.69"
                y2="243.852"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopOpacity=".1" />
                <stop offset=".101187" stopOpacity=".4" />
                <stop offset=".104169" stopColor="#F41C52" />
                <stop offset=".738113" stopColor="#F41C52" />
                <stop offset=".741695" stopOpacity=".1" />
                <stop offset="1" stopOpacity=".1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={s['hero']}>
          <div className={s['heading']}>
            <Heading className={s['title']} size="lg">
              <span className={s['heading-highlight']}>
                Record, Share, and Debug
              </span>{' '}
              your application with DevTools.
            </Heading>
            <div className={clsx(s['cta'], { [s['hidden']]: !isDesktop })}>
              <Button variant="primary">Download Replay</Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

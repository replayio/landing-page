import { RichText } from 'basehub/react'
import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import dynamic, { LoaderComponent } from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Ref, useEffect, useMemo, useRef } from 'react'
import { useIntercom } from 'react-use-intercom'

import { AspectBox } from '~/components/common/aspect-box'
import Video from '~/components/common/video-modal'
import { Container } from '~/components/layout/container'
import { Section } from '~/components/layout/section'
import { Button } from '~/components/primitives/cta'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { useMedia } from '~/hooks/use-media'
import { useMouseTracker } from '~/hooks/use-mouse-tracker'
import fixImg from '~/images/home/fix.svg'
import recordImg from '~/images/home/record.svg'
import replayImg from '~/images/home/replay.svg'
import heroImage from '~/images/homepage/hero-image.jpg'

import s from './hero.module.scss'

const Sky = dynamic(
  () => import('~/components/common/sky').then((m) => m.Sky),
  { ssr: false }
)

const Grid3D = dynamic(
  () =>
    import('~/components/common/grid-3d').then(
      (m) => m.Grid3D
    ) as LoaderComponent,
  { ssr: false }
)

const outlineSvgSize = {
  width: 1442,
  height: 876
}

type HeroProps = {
  title: {
    one: string
    two: string
    three: string
  }
  subtitleVariants: Array<{ content: unknown; key: string }>
  ctas: Array<{
    label: string
    href: string
    type: 'primary' | 'secondary'
    key: string
  }>
}

export const Hero = ({ title, ctas, subtitleVariants }: HeroProps) => {
  const { boot } = useIntercom()
  const firstRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { isDesktop } = useDeviceDetect()
  const isSm = useMedia('(max-width: 768px)')
  const router = useRouter()

  const subhero = useMemo(() => {
    const variant = router.query.variant
      ? parseInt(router.query.variant as string)
      : 0
    return subtitleVariants[variant]
  }, [router.query, subtitleVariants])

  useEffect(() => {
    if (!isDesktop) return

    const t = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '500px top',
        scrub: true
      }
    })

    t.to([firstRef.current], {
      opacity: 0.0,
      scale: 0.85
    })

    return () => {
      t.revert()
      t.kill()
    }
  }, [isDesktop])

  // hero text steps timeline
  useEffect(() => {
    if (!firstRef.current) return

    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.inOut'
      },
      repeat: -1
    })

    const selector = gsap.utils.selector(firstRef.current)
    const headingIcons = selector(`#heading-container img`)

    const headingTexts = selector(`#heading-container > span > span`)
    const doubleHeadingTexts = selector(
      `#heading-container-double > div > span > span`
    )

    tl.to(
      [headingIcons[0]],
      {
        opacity: 0,
        duration: 0.8
      },
      1.8
    )

    tl.to(
      [headingTexts[0]],
      {
        x: !isSm ? -48 : -24,
        opacity: 0,
        duration: 1.2
      },
      '>-0.5'
    )

    tl.to(
      [doubleHeadingTexts[0]],
      {
        x: !isSm ? -48 : -24,
        duration: 1.2
      },
      '<'
    )

    tl.to(
      [headingIcons[1], headingTexts[1]],
      {
        opacity: 1,
        duration: 1
      },
      '<'
    )

    tl.to(
      [headingIcons[1]],
      {
        opacity: 0,
        duration: 0.8
      },
      '>+1.8'
    )

    tl.to(
      [headingTexts[1]],
      {
        x: !isSm ? -48 : -24,
        opacity: 0,
        duration: 1.2
      },
      '>-0.5'
    )

    tl.to(
      [doubleHeadingTexts[1]],
      {
        x: !isSm ? -48 : -24,
        duration: 1.2
      },
      '<'
    )

    tl.to(
      [headingIcons[2], headingTexts[2]],
      {
        opacity: 1,
        duration: 1
      },
      '<'
    )

    tl.to(
      [headingIcons[2]],
      {
        opacity: 0,
        duration: 0.8
      },
      '>+1.8'
    )

    tl.to(
      [
        headingTexts[0],
        headingTexts[1],
        doubleHeadingTexts[0],
        doubleHeadingTexts[1]
      ],
      {
        x: 0,
        duration: 1.2
      },
      '>-0.5'
    )

    tl.to(
      [headingTexts[2]],
      {
        opacity: 0,
        duration: 1.2
      },
      '<'
    )

    tl.to(
      [headingTexts[0]],
      {
        opacity: 1,
        duration: 1
      },
      '>-0.8'
    )

    tl.to(
      [headingIcons[0]],
      {
        opacity: 1,
        duration: 1
      },
      '<'
    )

    return () => {
      tl.revert()
      tl.kill()
    }
  }, [isSm])

  useEffect(() => {
    boot()
  }, [boot])

  // lantern handler
  const { elementRef } = useMouseTracker({
    onChange: ({ x, y, first }) => {
      const maskElement = elementRef.current?.querySelector(`.${s.mask}`)
      if (!maskElement) return

      gsap.set(maskElement, { opacity: 1 })

      const webkitMaskImage = `radial-gradient(circle var(--radius) at ${x}px ${y}px, var(--bg) 30%, rgba(0,0,0,0.4))`

      if (first) {
        gsap.set(maskElement, { webkitMaskImage })
        gsap.to(maskElement, {
          '--radius': '180px',
          webkitMaskImage,
          duration: 0.45
        })
      } else {
        gsap.to(maskElement, {
          '--radius': '180px',
          webkitMaskImage,
          duration: 0.45
        })
      }
    },
    windowAsProxy: true,
    enableOnlyWhenHovering: false
  })

  return (
    <Section id="homepage-hero" className={s['section']} ref={sectionRef}>
      <div className={s['bg-container']}>
        <div className={s['child']}>
          <Sky />
        </div>
        <div className={clsx(s['child'], s['grid'])}>
          <Grid3D />
        </div>
      </div>
      <div className={s['first']} ref={firstRef}>
        <Container
          className={s['hero-container']}
          ref={elementRef as Ref<HTMLDivElement> | undefined}
        >
          <TitleAndSubtitle
            title={{
              children: (
                <>
                  <div
                    className={s['heading-container']}
                    id="heading-container"
                  >
                    <span className={s['title-section']}>
                      <Image
                        priority
                        alt=""
                        src={recordImg}
                        width={40}
                        height={40}
                      />
                      <span className={s['text-segment']}>{title.one} </span>
                    </span>
                    <span className={s['title-section']}>
                      <Image
                        priority
                        alt=""
                        src={replayImg}
                        width={40}
                        height={40}
                      />
                      <span className={s['text-segment']}>{title.two} </span>
                    </span>
                    <span className={s['title-section']}>
                      <Image
                        priority
                        alt=""
                        src={fixImg}
                        width={40}
                        height={40}
                      />
                      <span className={s['text-segment']}>{title.three}</span>
                    </span>
                  </div>
                  <div className={s.mask} id="heading-container-double">
                    <div
                      className={clsx(
                        s['heading-container'],
                        s['heading-container-double']
                      )}
                    >
                      <span className={s['title-section']}>
                        <span className={s['text-segment']}>{title.one} </span>
                      </span>
                      <span className={s['title-section']}>
                        <span className={s['text-segment']}>{title.two} </span>
                      </span>
                      <span className={s['title-section']}>
                        <span className={s['text-segment']}>{title.three}</span>
                      </span>
                    </div>
                  </div>
                </>
              ),
              hero: true
            }}
            subtitle={{
              className: s.subtitle,
              children: (
                <RichText
                  components={{
                    p: (props) => <span {...props} />,
                    a: (props) => <Link {...props} />
                  }}
                >
                  {subhero?.content}
                </RichText>
              )
            }}
          />

          <div className={s['ctas']}>
            {ctas.map((cta) => {
              return (
                <Link passHref href={cta.href} rel="noopener" key={cta.key}>
                  <Button mode={cta.type} size="big" aria-label={cta.label}>
                    {cta.label}
                  </Button>
                </Link>
              )
            })}
          </div>
        </Container>
      </div>

      <div className={s['last']}>
        {/* This is done like this, to prevent a scroll-x when the svg overflows the width of the "dashboard" image */}
        <div className={s['outline-container']}>
          <Container>
            <AspectBox ratio={2548 / 1348}>
              <svg
                viewBox={`0 0 ${outlineSvgSize.width} ${outlineSvgSize.height}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="paint0_linear_1457_456"
                    x1="721"
                    y1="0.999999"
                    x2="721"
                    y2="875"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#111827" stopOpacity="0" />
                    <stop
                      offset="0.317708"
                      stopColor="#111827"
                      stopOpacity="0.48"
                    />
                    <stop
                      offset="0.682292"
                      stopColor="#111827"
                      stopOpacity="0.86"
                    />
                    <stop offset="1" stopColor="#111827" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </AspectBox>
          </Container>
        </div>

        <Container>
          <div className={s['dashboard']}>
            <Image
              src={heroImage}
              quality={100}
              loading="eager"
              priority
              alt="Replay dashboard"
              draggable={false}
            />
          </div>
          <div className={s['videoLink']}>
            <Video.Modal
              poster="/images/homepage/hero-video-placeholder.png"
              url="https://stream.mux.com/Z00FHys4XTdt01f01yoi9Mr100014dnrwGIHZV502shtvx02tg.m3u8"
            >
              <Video.Trigger asChild>
                <Button mode="primary" size="big" aria-label="Watch video">
                  Watch introductory video
                </Button>
              </Video.Trigger>
            </Video.Modal>
          </div>
        </Container>
      </div>
    </Section>
  )
}

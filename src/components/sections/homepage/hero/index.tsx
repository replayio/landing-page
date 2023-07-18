import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import dynamic, { LoaderComponent } from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Ref, useEffect, useRef } from 'react'

import { AspectBox } from '~/components/common/aspect-box'
import { DownloadButton } from '~/components/common/download-button'
import Video from '~/components/common/video-modal'
import { IconsLibrary } from '~/components/icons'
import { Container } from '~/components/layout/container'
import { Section } from '~/components/layout/section'
import { Button, ButtonLink } from '~/components/primitives/cta'
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
  () => import('~/components/common/sky').then((m) => m.Sky) as LoaderComponent,
  {
    ssr: false
  }
)

const Grid3D = dynamic(
  () =>
    import('~/components/common/grid-3d').then(
      (m) => m.Grid3D
    ) as LoaderComponent,
  {
    ssr: false
  }
)

const Logo = () => (
  <svg
    width="12"
    height="16"
    viewBox="0 0 12 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.37287 3.43565L3.15993 2.01479L0.946985 0.594012C0.851009 0.532413 0.742137 0.499991 0.631323 0.5C0.520509 0.500009 0.411649 0.53245 0.315682 0.594065C0.219714 0.65568 0.140019 0.7443 0.0846051 0.851015C0.0291912 0.957731 1.61022e-05 1.07878 2.02658e-09 1.20201V6.88548C-8.87681e-06 7.00872 0.0291571 7.12979 0.084565 7.23653C0.139973 7.34326 0.219666 7.43189 0.315642 7.49351C0.411618 7.55513 0.52049 7.58757 0.631313 7.58756C0.742137 7.58756 0.851013 7.55511 0.946985 7.49348L3.15993 6.07271L5.37287 4.65184C5.46889 4.59024 5.54862 4.50161 5.60407 4.39487C5.65951 4.28812 5.6887 4.16702 5.6887 4.04375C5.6887 3.92047 5.65951 3.79938 5.60407 3.69263C5.54862 3.58588 5.46889 3.49725 5.37287 3.43565Z"
      fill="white"
    />
    <path
      d="M5.37286 11.3481L3.15992 9.92735L0.946895 8.50657C0.850935 8.44494 0.742078 8.41249 0.631263 8.41248C0.520449 8.41246 0.411581 8.4449 0.315612 8.50651C0.219642 8.56812 0.139959 8.65674 0.0845549 8.76347C0.0291514 8.87019 -1.11089e-05 8.99125 3.17441e-09 9.11448V14.798C-5.47389e-07 14.9212 0.0291613 15.0422 0.084565 15.149C0.139969 15.2557 0.219658 15.3443 0.315622 15.4059C0.411585 15.4675 0.520442 15.5 0.631253 15.5C0.742065 15.5 0.850925 15.4676 0.946895 15.406L3.15992 13.9852L5.37286 12.5644C5.46888 12.5028 5.54862 12.4141 5.60406 12.3074C5.6595 12.2006 5.68869 12.0795 5.68869 11.9563C5.68869 11.833 5.6595 11.7119 5.60406 11.6051C5.54862 11.4984 5.46888 11.4097 5.37286 11.3481Z"
      fill="white"
    />
    <path
      d="M11.6841 7.39202L9.47121 5.97115L7.25826 4.55038C7.16229 4.48875 7.05343 4.4563 6.9426 4.4563C6.83178 4.45629 6.72291 4.48873 6.62693 4.55035C6.53095 4.61197 6.45125 4.7006 6.39584 4.80734C6.34044 4.91407 6.31127 5.03514 6.31128 5.15838V10.8418C6.3113 10.9651 6.34048 11.0861 6.39589 11.1928C6.45131 11.2996 6.531 11.3882 6.62697 11.4498C6.72294 11.5114 6.8318 11.5439 6.94261 11.5439C7.05343 11.5439 7.16229 11.5114 7.25826 11.4499L9.47121 10.029L11.6841 8.60821C11.7802 8.54661 11.8599 8.45798 11.9154 8.35123C11.9708 8.24449 12 8.12339 12 8.00011C12 7.87684 11.9708 7.75574 11.9154 7.64899C11.8599 7.54225 11.7802 7.45362 11.6841 7.39202Z"
      fill="white"
    />
  </svg>
)

const outlineSvgSize = {
  width: 1442,
  height: 876
}

export const Hero = () => {
  const firstRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { isDesktop } = useDeviceDetect()
  const isSm = useMedia('(max-width: 768px)')

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
      opacity: 0.4,
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
        <Link
          passHref
          href="https://blog.replay.io/replay.io-a-new-dimension"
          className={s['announcement']}
          target="_blank"
          rel="noopener"
        >
          <div className={s['announcementInner']}>
            <p className={s['announcementText']}>
              Introducing Replay for Test Suites
            </p>
            <span className={s.arrowIcon}>{IconsLibrary['arrow']}</span>
          </div>
        </Link>
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
                      <span>Record. </span>
                    </span>
                    <span className={s['title-section']}>
                      <Image
                        priority
                        alt=""
                        src={replayImg}
                        width={40}
                        height={40}
                      />
                      <span>Replay. </span>
                    </span>
                    <span className={s['title-section']}>
                      <Image
                        priority
                        alt=""
                        src={fixImg}
                        width={40}
                        height={40}
                      />
                      <span>Fix.</span>
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
                        <span>Record. </span>
                      </span>
                      <span className={s['title-section']}>
                        <span>Replay. </span>
                      </span>
                      <span className={s['title-section']}>
                        <span>Fix.</span>
                      </span>
                    </div>
                  </div>
                </>
              ),
              hero: true
            }}
            subtitle={{
              className: s.subtitle,
              children:
                'Replay lets you inspect your application after the fact with retroactive console logs and Browser DevTools.'
            }}
          />

          <div className={s['ctas']}>
            <Video.Modal
              poster="/images/homepage/hero-video-placeholder.png"
              url="https://stream.mux.com/RfpT026NiAnQTWXP4BKsBBUHjFReABrAO01ltzQxmOVQE.m3u8"
            >
              <Video.Trigger asChild>
                <Button mode="secondary" size="big" aria-label="Watch video">
                  Watch video
                </Button>
              </Video.Trigger>
            </Video.Modal>
            <DownloadButton
              mode="primary"
              size="big"
              aria-label="Download Replay"
            >
              Download Replay
            </DownloadButton>
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
                <path
                  d="M1227 1H215C197.327 1 183 15.3269 183 33V618.449C183 625.302 180.8 631.973 176.725 637.482L1 875H1441L1265.28 637.482C1261.2 631.973 1259 625.302 1259 618.449V33C1259 15.3269 1244.67 1 1227 1Z"
                  fill="url(#paint0_linear_1457_456)"
                />
                <path
                  d="M1441 875L1265.31 638.497C1261.21 632.979 1259 626.288 1259 619.415V33.0149C1259 15.336 1244.66 1.00666 1226.99 1.01488L214.985 1.48514C197.318 1.49335 183 15.8178 183 33.4851V620.38C183 627.275 180.773 633.986 176.65 639.513L1 875"
                  stroke="#111827"
                  strokeDasharray="6 6"
                />
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

            <div className={s['cta']}>
              <ButtonLink
                mode="secondary"
                size="small"
                aria-label="Launch DevTools"
                href="https://app.replay.io/recording/overboard-bugslayer--43b2078d-885d-44dc-94fa-0c9228f33423?point=1622592768352318442299266728722498&time=999"
                target="_blank"
              >
                Launch DevTools
                <Logo />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}

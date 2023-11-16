import MuxPlayer from '@mux/mux-player-react'
import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import dynamic, { LoaderComponent } from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Ref, useEffect, useMemo, useRef, useState } from 'react'
import { useIntercom } from 'react-use-intercom'

import { AspectBox } from '~/components/common/aspect-box'
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

const outlineSvgSize = {
  width: 1442,
  height: 876
}

const subheroes = [
  <span key="variant-4">
    Replay is the only browser that lets you record and retroactively debug your
    application. Fix the hardest issues as a team and take control of your
    support process and test suite.
  </span>,
  <span key="variant-3">
    Replay is the only browser that lets you record and retroactively debug your
    application with <b>print statements</b> and <b>Browser DevTools</b> so that
    you can file the perfect bug report and fix failing flaky tests.
  </span>,

  <span key="variant-2">
    Replay is the only browser that lets you record, retroactively debug, and
    fix the hardest issues as a team with perfect reproducibility.
  </span>,

  <span key="variant-1">
    Replay is the only browser that lets you record and retroactively debug your
    application with <b>print statements</b> and <b>Browser DevTools</b>.
  </span>
]

export const Hero = () => {
  const { boot } = useIntercom()
  const firstRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { isDesktop } = useDeviceDetect()
  const isSm = useMedia('(max-width: 768px)')
  const router = useRouter()

  const [isPlaying, setIsPlaying] = useState(true)

  const subhero = useMemo(() => {
    const variant = router.query.variant
      ? parseInt(router.query.variant as string)
      : 0
    return subheroes[variant]
  }, [router.query])

  const [activeVideo, setActiveVideo] = useState(1) // Default to the first video

  const [videoProgress, setVideoProgress] = useState({
    1: { currentTime: 0, duration: 0 },
    2: { currentTime: 0, duration: 0 }
  })

  const muxPlayerRef = useRef(null)

  const handleTogglePlay = (videoNumber: number) => {
    if (activeVideo === videoNumber) {
      // Toggle play/pause on the current video
      if (isPlaying) {
        muxPlayerRef.current.pause()
        setIsPlaying(false)
      } else {
        muxPlayerRef.current.play()
        setIsPlaying(true)
      }
    } else {
      // Switch to a different video
      switchVideo(videoNumber)
    }
  }

  const CircularProgress = ({ progress }) => {
    const radius = 20
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
      <svg height="50" width="50" className="circular-progress">
        <circle
          stroke="#01ACFD"
          strokeWidth="8"
          fill="transparent"
          r={radius}
          cx="25"
          cy="25"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: strokeDashoffset,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%'
          }}
        />
      </svg>
    )
  }

  const updateVideoProgress = (
    videoNumber: number,
    currentTime: number,
    duration: number
  ) => {
    setVideoProgress((prevState) => ({
      ...prevState,
      [videoNumber]: { currentTime, duration }
    }))
  }

  const videoDetails = {
    1: {
      playbackId: 'pgs02AyA59TfKakQRtoR2pQUTIX1qvR6UTyC63iqj4GI',
      muted: true,
      poster:
        'https://image.mux.com/GvAgJUtjUQ8i2O3fX4J6X8ahjo7ASLOAYrBu01VtP1Hw/thumbnail.png?width=214&height=121&time=0&fit_mode=preserve'
    },
    2: {
      playbackId: 'Z00FHys4XTdt01f01yoi9Mr100014dnrwGIHZV502shtvx02tg',
      muted: false,
      poster:
        'https://image.mux.com/Z00FHys4XTdt01f01yoi9Mr100014dnrwGIHZV502shtvx02tg/thumbnail.png?width=214&height=121&time=0&fit_mode=preserve'
    }
  }

  const [currentVideo, setCurrentVideo] = useState(videoDetails[1])

  const switchVideo = (videoNumber: number) => {
    // Set the new active video and its details
    setActiveVideo(videoNumber)
    setCurrentVideo(videoDetails[videoNumber])

    // Ensure the player is playing the new video
    muxPlayerRef.current.play()
    setIsPlaying(true)
  }

  const handleVideoEnd = () => {
    if (activeVideo === 1) {
      switchVideo(2)
    }
  }

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
                      <span className={s['text-segment']}>Record. </span>
                    </span>
                    <span className={s['title-section']}>
                      <Image
                        priority
                        alt=""
                        src={replayImg}
                        width={40}
                        height={40}
                      />
                      <span className={s['text-segment']}>Replay. </span>
                    </span>
                    <span className={s['title-section']}>
                      <Image
                        priority
                        alt=""
                        src={fixImg}
                        width={40}
                        height={40}
                      />
                      <span className={s['text-segment']}>Fix.</span>
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
                        <span className={s['text-segment']}>Record. </span>
                      </span>
                      <span className={s['title-section']}>
                        <span className={s['text-segment']}>Replay. </span>
                      </span>
                      <span className={s['title-section']}>
                        <span className={s['text-segment']}>Fix.</span>
                      </span>
                    </div>
                  </div>
                </>
              ),
              hero: true
            }}
            subtitle={{
              className: s.subtitle,
              children: subhero
            }}
          />

          <div className={s['ctas']}>
            <Link
              passHref
              href="https://docs.replay.io/getting-started/recording-your-first-replay"
              rel="noopener"
            >
              <Button mode="primary" size="big" aria-label="Get started">
                Get started
              </Button>
            </Link>

            <Link passHref href="contact/" rel="noopener">
              <Button mode="secondary" size="big" aria-label="Contact us">
                Contact us
              </Button>
            </Link>
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
            <MuxPlayer
              ref={muxPlayerRef}
              streamType="on-demand"
              playbackId={currentVideo.playbackId}
              poster={currentVideo.poster}
              primaryColor="#FFFFFF"
              secondaryColor="#000000"
              onTimeUpdate={(event: any) => {
                const target = event.target as HTMLVideoElement
                updateVideoProgress(
                  activeVideo,
                  target.currentTime,
                  target.duration
                )
              }}
              muted={currentVideo.muted}
              autoPlay={true}
              onEnded={handleVideoEnd} // Add this event handler
              style={{ '--controls': 'none' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '24px',
              marginBottom: '24px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '24px',
                marginBottom: '24px'
              }}
            >
              <CircularProgress
                progress={
                  (videoProgress[activeVideo].currentTime /
                    videoProgress[activeVideo].duration) *
                  100
                }
              />
            </div>
          </div>

          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}
          >
            <Button
              mode={activeVideo === 1 ? 'primary' : 'secondary'}
              size="big"
              aria-label="Overview (0:28)"
              onClick={() => handleTogglePlay(1)}
              isPlaying={activeVideo === 1 && isPlaying}
            >
              {activeVideo === 1 && isPlaying ? 'Pause' : 'Play'} Overview
              (0:28)
            </Button>

            <Button
              mode={activeVideo === 2 ? 'primary' : 'secondary'}
              size="big"
              aria-label="Guided tour (2:39)"
              onClick={() => handleTogglePlay(2)}
              isPlaying={activeVideo === 2 && isPlaying}
            >
              {activeVideo === 2 && isPlaying ? 'Pause' : 'Play'} Guided tour
              (2:39)
            </Button>
          </div>
        </Container>
      </div>
    </Section>
  )
}

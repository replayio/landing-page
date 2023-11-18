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

interface VideoProgress {
  [key: number]: {
    currentTime: number
    duration: number
  }
}

const outlineSvgSize = {
  width: 1442,
  height: 876
}

const radius = 18 // Radius of the circle
const strokeWidth = 4 // Width of the circle stroke
const normalizedRadius = radius - strokeWidth * 2
const circumference = normalizedRadius * 2 * Math.PI

// Function to calculate stroke dash offset
const calculateStrokeDashoffset = (progress: number) => {
  return circumference - (progress / 100) * circumference
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

const playIconSVG = (
  <svg
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.8882 17.8013C7.72553 17.8013 6.63076 17.5785 5.60392 17.1327C4.57707 16.6924 3.67247 16.0809 2.89011 15.2982C2.10775 14.5154 1.49381 13.6131 1.0483 12.5913C0.608222 11.5639 0.388184 10.4659 0.388184 9.29722C0.388184 8.13398 0.608222 7.04141 1.0483 6.01951C1.49381 4.99216 2.10503 4.08713 2.88195 3.30439C3.66431 2.52165 4.56892 1.91015 5.59577 1.46986C6.62262 1.02413 7.71737 0.80127 8.88004 0.80127C10.0427 0.80127 11.1375 1.02413 12.1643 1.46986C13.1966 1.91015 14.1013 2.52165 14.8782 3.30439C15.6605 4.08713 16.2745 4.99216 16.72 6.01951C17.1655 7.04141 17.3882 8.13398 17.3882 9.29722C17.3882 10.4659 17.1655 11.5639 16.72 12.5913C16.2745 13.6131 15.6605 14.5154 14.8782 15.2982C14.1013 16.0809 13.1993 16.6924 12.1725 17.1327C11.1456 17.5785 10.0509 17.8013 8.8882 17.8013ZM7.47016 12.6402L12.1155 9.90872C12.273 9.81632 12.3762 9.6913 12.4251 9.53366C12.4794 9.37603 12.4794 9.21839 12.4251 9.06075C12.3708 8.90312 12.2676 8.78082 12.1155 8.69386L7.47016 5.94613C7.30718 5.84828 7.13875 5.80751 6.9649 5.82383C6.79647 5.84013 6.65521 5.90536 6.54112 6.01951C6.42702 6.12821 6.36997 6.2777 6.36997 6.46795V12.1183C6.36997 12.3086 6.42702 12.4608 6.54112 12.5749C6.65521 12.6891 6.79647 12.7543 6.9649 12.7707C7.13332 12.7869 7.30175 12.7435 7.47016 12.6402Z"
      fill="url(#paint0_linear_20552_25949)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_20552_25949"
        x1="8.88818"
        y1="0.80127"
        x2="8.88818"
        y2="17.8013"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0.75" />
      </linearGradient>
    </defs>
  </svg>
)

const pauseIconSVG = (
  <svg
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.92092 17.3608C7.75825 17.3608 6.66348 17.138 5.63664 16.6923C4.60979 16.252 3.70518 15.6404 2.92282 14.8578C2.14046 14.075 1.52653 13.1727 1.08102 12.1507C0.640941 11.1234 0.420898 10.0254 0.420898 8.85676C0.420898 7.69353 0.640941 6.60097 1.08102 5.57907C1.52653 4.55173 2.13774 3.64669 2.91467 2.86396C3.69703 2.08122 4.60164 1.46972 5.62849 1.02942C6.65534 0.583702 7.75009 0.36084 8.91277 0.36084C10.0754 0.36084 11.1702 0.583702 12.1971 1.02942C13.2294 1.46972 14.134 2.08122 14.9109 2.86396C15.6932 3.64669 16.3072 4.55173 16.7527 5.57907C17.1982 6.60097 17.4209 7.69353 17.4209 8.85676C17.4209 10.0254 17.1982 11.1234 16.7527 12.1507C16.3072 13.1727 15.6932 14.075 14.9109 14.8578C14.134 15.6404 13.2321 16.252 12.2052 16.6923C11.1784 17.138 10.0836 17.3608 8.92092 17.3608ZM6.47605 12.2242H7.4051C7.62242 12.2242 7.78542 12.1671 7.89407 12.0529C8.00816 11.9334 8.06522 11.7838 8.06522 11.6044V6.10089C8.06522 5.91064 8.00816 5.75845 7.89407 5.6443C7.78542 5.53014 7.62242 5.47307 7.4051 5.47307H6.47605C6.25329 5.47307 6.08486 5.53014 5.97077 5.6443C5.8621 5.75845 5.80778 5.91064 5.80778 6.10089V11.6044C5.80778 11.7838 5.8621 11.9334 5.97077 12.0529C6.08486 12.1671 6.25329 12.2242 6.47605 12.2242ZM10.4612 12.2242H11.3821C11.6049 12.2242 11.7706 12.1671 11.8792 12.0529C11.9933 11.9334 12.0504 11.7838 12.0504 11.6044V6.10089C12.0504 5.91064 11.9933 5.75845 11.8792 5.6443C11.7706 5.53014 11.6049 5.47307 11.3821 5.47307H10.4612C10.2384 5.47307 10.07 5.53014 9.95592 5.6443C9.84726 5.75845 9.79292 5.91064 9.79292 6.10089V11.6044C9.79292 11.7838 9.84726 11.9334 9.95592 12.0529C10.07 12.1671 10.2384 12.2242 10.4612 12.2242Z"
      fill="url(#paint0_linear_20552_25950)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_20552_25950"
        x1="8.9209"
        y1="0.36084"
        x2="8.9209"
        y2="17.3608"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0.75" />
      </linearGradient>
    </defs>
  </svg>
)

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

  const [videoProgress, setVideoProgress] = useState<VideoProgress>({
    1: { currentTime: 0, duration: 0 },
    2: { currentTime: 0, duration: 0 }
  })

  const muxPlayerRef = useRef<any>(null)

  const handleTogglePlay = (videoNumber: number) => {
    // Check if the clicked video is currently active
    if (activeVideo === videoNumber) {
      // Toggle the playing state
      if (isPlaying) {
        // If the video is playing, pause it
        muxPlayerRef.current.pause()
        setIsPlaying(false)
      } else {
        // If the video is paused, play it
        muxPlayerRef.current.play()
        setIsPlaying(true)
      }
    } else {
      // If a different video is selected, switch to it
      switchVideo(videoNumber as 1 | 2)
    }
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
      poster: ''
    },
    2: {
      playbackId: 'Z00FHys4XTdt01f01yoi9Mr100014dnrwGIHZV502shtvx02tg',
      muted: false,
      poster: ''
    }
  }

  const [currentVideo, setCurrentVideo] = useState(videoDetails[1])
  const [videoEnded, setVideoEnded] = useState({ 1: false, 2: false })

  const switchVideo = (videoNumber: 1 | 2) => {
    // Update the active video
    setActiveVideo(videoNumber)
    // Set the details for the new active video
    setCurrentVideo(videoDetails[videoNumber])
    // A small timeout to ensure state updates have been flushed to the DOM
    setTimeout(() => {
      // Play the new active video
      if (muxPlayerRef.current) {
        muxPlayerRef.current.play()
        setIsPlaying(true)
      }
    }, 0)
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    setVideoEnded({ ...videoEnded, [activeVideo]: true })
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
    <Section id="homepage-hero" className={s.section} ref={sectionRef}>
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
              key={currentVideo.playbackId}
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
              style={{ '--controls': 'none' } as React.CSSProperties}
            />
          </div>

          <div
            style={{
              marginTop: '24px',
              display: 'flex',
              justifyContent: 'center',
              gap: '14px'
            }}
          >
            {[1, 2].map((videoNumber) => {
              const video = videoProgress[videoNumber]
              const progress = video
                ? Math.round((video.currentTime / video.duration) * 100)
                : 0
              const strokeDashoffset = calculateStrokeDashoffset(progress)

              return (
                <div className={s.buttonWithLoader} key={videoNumber}>
                  <Button
                    className={s.big} // Ensure you have button styles defined in your CSS module
                    onClick={() => handleTogglePlay(videoNumber)}
                    mode="secondary"
                    size="big"
                  >
                    {activeVideo === videoNumber && isPlaying
                      ? pauseIconSVG
                      : playIconSVG}
                    <span className={s.buttonText}>
                      {videoNumber === 1
                        ? 'Summary (0:28)'
                        : 'Narrated demo (2:39)'}
                    </span>
                    <svg
                      className={s.radialProgress}
                      height="3.3rem"
                      width="3.3rem"
                      viewBox="0 0 40 40"
                    >
                      <circle
                        cx="20"
                        cy="20"
                        r={normalizedRadius}
                        strokeWidth={strokeWidth}
                        stroke="#374151"
                        fill="none"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r={normalizedRadius}
                        strokeWidth={strokeWidth}
                        stroke="#60A5FA"
                        strokeDasharray={circumference}
                        style={{
                          strokeDashoffset,
                          transition: 'stroke-dashoffset 0.3s linear',
                          transformOrigin: 'center' // Adjust the origin based on new size
                        }}
                        fill="none"
                      />
                    </svg>
                  </Button>
                </div>
              )
            })}
          </div>
        </Container>
      </div>
    </Section>
  )
}

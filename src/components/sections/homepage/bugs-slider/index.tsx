/* eslint-disable */

import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { Timeline } from '~/components/common/progress-bar'
import Video from '~/components/common/video-modal'
import { Section } from '~/components/layout/section'
import { ButtonLink } from '~/components/primitives/cta'
import { NavLink } from '~/components/primitives/nav-link'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { useTabletLgBreakpoint } from '~/hooks/use-media'
import { gsap } from '~/lib/gsap'

import s from './bugs-slider.module.scss'

export const BugsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [emblaRef, embla] = useEmblaCarousel({ align: 'center' })
  const isTablet = useTabletLgBreakpoint()
  const [inViewRef, { inView }] = useIntersectionObserver<HTMLDivElement>({})
  const [interacting, setInteracting] = useState<boolean>(false)

  const onSelect = useCallback(() => {
    if (!embla) return
    setCurrentSlide(embla.selectedScrollSnap())
  }, [embla, setCurrentSlide])

  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla]
  )

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect])

  useEffect(() => {
    embla?.reInit()
  }, [embla])

  return (
    <Section
      id="homepage-bugs-slider"
      className={s.section}
      data-sitemap
      data-sitemap-icon="workflow"
      data-sitemap-short-title="Record"
      data-sitemap-complete-title="Freeze bugs in time."
      ref={inViewRef}
    >
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Travel Back in Time', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Replay is a next generation time travel debugger like nothing you’ve seen before.  With low overhead the chrome based browser records just enough so it can be replayed exactly and inspected down to the finest detail.
              <br></br>
              <br></br>
              <Link href="/overview#travel-back" aria-label="Create a team">
                Learn More
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Stop Reproducing Bugs', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Say goodbye to screenshots, videos, and repro steps.
              Recording a bug with Replay lets anyone debug it
              as if they were there when it happened.
              <br></br>
              <br></br>
              <Link href="/overview#stop-reproducing" aria-label="Create a team">
                Learn More
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Handle QA and User Issues with Ease', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Bugs reported with Replay are fully actionable and quickly
              understood by developers.  Never close issues again for a lack
              of information, or because the problem was transient or user specific.
              <br></br>
              <br></br>
              <Link href="/overview#handle-issues" aria-label="Create a team">
                Learn More
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Fix all your Flaky Tests', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Debugging a flaky test failure with Replay is just as easy as any other bug.
              Stop wasting time looking at failures you can’t figure out,
              or suppressing tests because they don’t pass reliably.
              <br></br>
              <br></br>
              <Link href="/overview#fix-flakes" aria-label="Create a team">
                Learn More
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Deploy with Confidence', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Building a thorough and rock solid test suite is easy with Replay and incredibly hard without it.  This lets you deploy whenever you want and catch more issues before they hit users.
              <br></br>
              <br></br>
              <Link href="/overview#deploy-with-confidence" aria-label="Create a team">
                Learn More
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Debug Test Failures Remotely', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Stop trying to locally reproduce test failures that happened in CI,
              or looking at logs or videos to get a vague idea of what happened.
              With Replay you can directly debug test failures as if they happened
              on your own machine.
              <br></br>
              <br></br>
              <Link href="/overview#debug-remotely" aria-label="Create a team">
                Learn More
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Instantly Modernize your Test Suite', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Replay is easy to integrate with any test suite regardless of its framework.
              Get the best debugging experience in the world without rewriting
              any of your tests.
              <br></br>
              <br></br>
              <Link href="/overview#modernize-suite" aria-label="Create a team">
                Learn More
              </Link>
            </span>
          )
        }}
      />
    </Section>
  )
}

const InfoSide = ({
  isTablet,
  title,
  Asset,
  description,
  cta,
  videoPoster,
  videoHref
}: DataType & { isTablet: boolean }) => {
  return (
    <div className={s.infoSide}>
      <p className={s.title}>{title}</p>

      {isTablet && <Asset />}

      <div>
        <p className={s.description}>{description}</p>
        <div className={s.links}>
          <ButtonLink
            mode="secondary"
            href={cta.href}
            className={s.cta}
            iconSuffix="arrow"
            aria-label={cta.label}
          >
            {cta.label}
          </ButtonLink>
          <Video.Modal poster={videoPoster} url={videoHref}>
            <Video.Trigger asChild>
              <NavLink
                className={s['link']}
                href="#"
                scroll={false}
                invertedHover
              >
                Watch video
              </NavLink>
            </Video.Trigger>
          </Video.Modal>
        </div>
      </div>
    </div>
  )
}

const AssetSideBugs = () => {
  const [play, setPlay] = useState<boolean>(false)
  const [timelineHover, setTimelineHover] = useState<boolean>(false)

  const handleMouseOut = () => {
    setTimelineHover(false)
    setPlay(false)
  }

  return (
    <AssetSideBox caption="Try hovering the replay." className={s.bugsReport}>
      <div className={s.illustration}>
        <Image
          src="/images/bugs-slider/skateboard-shadow.png"
          alt="Skateboard"
          height={75}
          width={186}
          className={clsx(s.skateboardShadow, play && s.pause)}
        />
        <Image
          src="/images/bugs-slider/skateboard.svg"
          alt="Skateboard"
          height={75}
          width={186}
          className={clsx(s.skateboard, play && s.pause)}
        />
        <Warning play={play} text="Rendering too fast" />
        <span className={s.warningLine} />
      </div>
      <AssetSideComment
        username="Elaine Baylor"
        avatar="/images/bugs-slider/elaine-avatar.jpg"
        commentedAt="on Apr 21"
      >
        <p className={s.commentText}>The Hoverboard should not flip twice.</p>
        <div
          onPointerEnter={() => setTimelineHover(true)}
          onPointerLeave={handleMouseOut}
          className={clsx(
            {
              [s.active as string]: timelineHover
            },
            s.replay
          )}
        >
          <div className={s.replayHeader}>
            <span className={s.recordBtn} />
            <p>"board", flip</p>
            <span className={s.commentBtn}>
              <svg
                viewBox="0 0 8 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.3674 6.66686C2.43166 6.66686 2.48949 6.64972 2.54089 6.61545C2.59444 6.58332 2.65977 6.53192 2.73688 6.46124L3.89671 5.401L6.06858 5.40422C6.38772 5.40422 6.65652 5.34746 6.875 5.23394C7.09347 5.11827 7.25839 4.95121 7.36977 4.73274C7.48329 4.51426 7.54005 4.2476 7.54005 3.93274V1.47172C7.54005 1.15686 7.48329 0.890197 7.36977 0.671724C7.25839 0.453252 7.09347 0.287256 6.875 0.173737C6.65652 0.058075 6.38772 0.000244141 6.06858 0.000244141H1.93046C1.61132 0.000244141 1.34251 0.058075 1.12404 0.173737C0.905567 0.287256 0.739571 0.453252 0.626051 0.671724C0.514673 0.890197 0.458984 1.15686 0.458984 1.47172V3.93274C0.458984 4.2476 0.514673 4.51426 0.626051 4.73274C0.739571 4.95121 0.905567 5.1172 1.12404 5.23072C1.34251 5.34424 1.61132 5.401 1.93046 5.401H2.08146V6.33593C2.08146 6.4366 2.10609 6.51692 2.15536 6.5769C2.20462 6.63687 2.2753 6.66686 2.3674 6.66686ZM2.43166 2.70223C2.43166 2.6187 2.45843 2.55123 2.51198 2.49982C2.56553 2.44627 2.63407 2.4195 2.7176 2.4195H3.72321V1.41389C3.72321 1.33035 3.74785 1.26181 3.79711 1.20827C3.84851 1.15472 3.91491 1.12795 3.9963 1.12795C4.07984 1.12795 4.14731 1.15472 4.19871 1.20827C4.25226 1.26181 4.27903 1.33035 4.27903 1.41389V2.4195H5.28786C5.37139 2.4195 5.43886 2.44627 5.49027 2.49982C5.54382 2.55123 5.57059 2.6187 5.57059 2.70223C5.57059 2.78362 5.54382 2.85002 5.49027 2.90142C5.43672 2.95069 5.36925 2.97532 5.28786 2.97532H4.27903V3.98415C4.27903 4.06768 4.25226 4.13622 4.19871 4.18977C4.14731 4.24117 4.07984 4.26688 3.9963 4.26688C3.91491 4.26688 3.84851 4.24117 3.79711 4.18977C3.74785 4.13622 3.72321 4.06768 3.72321 3.98415V2.97532H2.7176C2.63407 2.97532 2.56553 2.95069 2.51198 2.90142C2.45843 2.85002 2.43166 2.78362 2.43166 2.70223Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
          <div className={s.replayControls}>
            <span className={s.prevBtn}>
              <svg
                viewBox="0 0 6 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.699427 2.63368C0.433524 2.79676 0.433524 3.20324 0.699427 3.36632L4.89974 5.94235C5.1663 6.10583 5.5 5.90218 5.5 5.57603L5.5 0.423972C5.5 0.0978175 5.1663 -0.105828 4.89974 0.0576526L0.699427 2.63368Z"
                  fill="white"
                />
              </svg>
            </span>
            <span className={s.nextBtn}>
              <svg
                viewBox="0 0 6 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.30057 2.63368C5.56648 2.79676 5.56648 3.20324 5.30057 3.36632L1.10026 5.94235C0.833696 6.10583 0.5 5.90218 0.5 5.57603L0.5 0.423972C0.5 0.0978175 0.833697 -0.105828 1.10026 0.0576526L5.30057 2.63368Z"
                  fill="white"
                />
              </svg>
            </span>
            <div className={s.progressBar}>
              <Timeline
                thickness={4}
                playing={timelineHover && !play}
                primaryColor="#01acfd"
                markerSize={12}
                markers={[
                  {
                    position: 35,
                    activeColor: '#881337',

                    onActive: () => {
                      setPlay(true)
                    }
                  }
                ]}
                duration={3}
              />
            </div>
            <p className={s.replyCount}>2/3</p>
          </div>
        </div>
      </AssetSideComment>
    </AssetSideBox>
  )
}

const AssetSideBrowser = () => {
  const [playOne, setPlayOne] = useState<boolean>(false)
  const [playTwo, setPlayTwo] = useState<boolean>(false)

  const colors = [
    'linear-gradient(135deg, #FAFF00 47.59%, #797B00 47.59%)',
    'linear-gradient(135deg, #8437E7 47.59%, #BB8AFA 47.59%)',
    'linear-gradient(135deg, #5CA939 47.59%, #AEFF89 47.59%)'
  ]

  return (
    <AssetSideBox caption="Try hovering the errors." className={s.browser}>
      <div className={s.illustration}>
        <Image
          src="/images/bugs-slider/skateboard-shadow.png"
          alt="Skateboard"
          height={75}
          width={186}
          className={s.skateboardShadow}
        />
        <Image
          src="/images/bugs-slider/skateboard.svg"
          alt="Skateboard"
          height={75}
          width={186}
          className={s.skateboard}
        />
        <Warning play={playOne} className={s.warningOne} text="About to flip" />
        <span className={s.warningLineOne} />
        <Warning play={playTwo} className={s.warningTwo} text="Wrong color" />
        <span className={s.warningLineTwo} />
        <div className={s.colorSwatches}>
          {colors.map((color, index) => (
            <span key={index} style={{ background: color }} />
          ))}
        </div>
      </div>
      <AssetSideComment
        username="Replay (bot)"
        avatar="/images/bugs-slider/replay-bot-avatar.png"
        commentedAt="1 hour ago"
      >
        <p className={s.commentText}>
          <span>2 of 50 tests failed </span> for the latest test run.
        </p>
        <div
          onPointerEnter={() => setPlayOne(true)}
          onPointerLeave={() => setPlayOne(false)}
          className={clsx(
            {
              [s.active as string]: playOne
            },
            s.test
          )}
        >
          <p>
            <span>Failed</span> - dashboard-01.spec.ts
          </p>
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.125 1.25L4.875 5L1.125 8.75"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          onPointerEnter={() => setPlayTwo(true)}
          onPointerLeave={() => setPlayTwo(false)}
          className={clsx(
            {
              [s.active as string]: playTwo
            },
            s.test
          )}
        >
          <p>
            <span>Failed</span> - colors-selected.spec.ts
          </p>
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.125 1.25L4.875 5L1.125 8.75"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </AssetSideComment>
    </AssetSideBox>
  )
}

const Warning = ({
  text,
  play,
  className
}: {
  text: string
  play: boolean
  className?: string
}) => {
  const timeline = useRef(
    gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.3,
        ease: 'power3.out'
      }
    })
  )
  const warningRef = useRef<HTMLDivElement>(null)
  const warningText = useRef<HTMLParagraphElement>(null)

  useIsomorphicLayoutEffect(() => {
    const tl = timeline.current
    const warning = warningRef.current
    const text = warningText.current
    const ctx = gsap.context(() => {
      tl.from(warning, {
        width: '24px',
        height: '24px',
        padding: '4px'
      })
        .from(
          text,
          {
            scaleX: 0
          },
          '<'
        )
        .from(text, {
          delay: 0.05,
          rotateX: 15,
          opacity: 0
        })
    })
    return () => {
      ctx.revert()
      ctx.kill()
    }
  }, [])

  useEffect(() => {
    const tl = timeline.current

    if (play) {
      tl.play()
    } else {
      tl.reverse().duration(0.5)
    }
  }, [play])

  return (
    <div ref={warningRef} className={clsx(s.warning, className)}>
      <svg viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.99918 4.50045V6.37545M1.34768 8.06345C0.914678 8.81345 1.45618 9.75045 2.32168 9.75045H9.67668C10.5417 9.75045 11.0832 8.81345 10.6507 8.06345L6.97368 1.68945C6.54068 0.939453 5.45768 0.939453 5.02468 1.68945L1.34768 8.06345ZM5.99918 7.87545H6.00268V7.87945H5.99918V7.87545Z"
          stroke="#FB7185"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p ref={warningText}>{text}</p>
    </div>
  )
}

interface AssetSideCommentProps {
  username: string
  avatar: string
  commentedAt: string
  children: ReactNode
}

const AssetSideBox = ({
  children,
  className,
  caption
}: {
  children: ReactNode
  className?: string
  caption: string
}) => {
  return (
    <div className={s.assetSide}>
      <div className={clsx(s.assetWrapper, className)}>
        {children}
        <span className={s.caption}>
          <svg
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.521 10.836L5.842 8.3M5.842 8.3L4.587 9.4125L4.8715 4.6775L7.485 8.636L5.842 8.3ZM5 1.125V2.25M7.917 2.333L7.1215 3.1285M9.125 5.25H8M2.8785 7.3715L2.0835 8.1665M2 5.25H0.875M2.8785 3.1285L2.0835 2.3335"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>{caption}</p>
        </span>
      </div>
    </div>
  )
}

const AssetSideComment: React.FC<AssetSideCommentProps> = ({
  username,
  avatar,
  commentedAt,
  children
}) => {
  return (
    <div className={s.comment}>
      <header className={s.commentHeader}>
        <div className={s.commentAuthor}>
          <Image
            height={32}
            width={32}
            alt={username}
            src={avatar}
            className={s.avatar}
          />
          <span className={s.commentUserName}>{username}</span>
        </div>
        <span className={s.commentDate}>Commented {commentedAt}</span>
      </header>
      <div className={s.commentContent}> {children}</div>
    </div>
  )
}

type DataType = {
  id: number
  title: ReactNode
  description: ReactNode
  Asset: React.FC
  cta: {
    href: string
    label: string
  }
  videoPoster: string
  videoHref: string
}

const data: DataType[] = [
  {
    id: 0,
    title: (
      <>
        Getting replays in your bug reports is like getting a video{' '}
        <span>
          that you can inspect with Browser DevTools and debug with print
          statements.
        </span>
      </>
    ),
    description: (
      <>
        Want to get bug reports with replays?
        <br />
        <Link href="https://app.replay.io/team/new" aria-label="Create a team">
          Create a team
        </Link>{' '}
        and start a free 30 day trial.
      </>
    ),
    Asset: AssetSideBugs,
    cta: {
      href: 'https://docs.replay.io/bug-reports',
      label: 'Bug reports'
    },
    videoPoster:
      'https://image.mux.com/OirCesKgI2uAA01r9AvrO1Vh6VaJ46sf00tozLJNbAWrY/thumbnail.png?width=1440',
    videoHref:
      'https://stream.mux.com/OirCesKgI2uAA01r9AvrO1Vh6VaJ46sf00tozLJNbAWrY.m3u8'
  },
  {
    id: 1,
    title: (
      <>
        Recording your browser tests in CI{' '}
        <span>
          lets you find and fix the timing issues in your application that are
          causing your tests to be flaky.
        </span>
      </>
    ),
    description: (
      <>
        Want green test runs that finish quickly?{' '}
        <button
          className={s.waitlist}
          data-tf-popup="jTudlerL"
          data-tf-iframe-props="title=Test Suites"
          data-tf-medium="snippet"
          aria-label="Learn more about Test Suites"
        >
          Join our waitlist
        </button>{' '}
        and start fixing your tests.
      </>
    ),
    Asset: AssetSideBrowser,
    cta: {
      href: 'https://docs.replay.io/test-suites',
      label: 'Test suites'
    },
    videoPoster:
      'https://image.mux.com/M8pzl7FMFEocw3LEZ523ylfk3Db8019hNP2yfB018JUmI/thumbnail.png?width=1440',
    videoHref:
      'https://stream.mux.com/M8pzl7FMFEocw3LEZ523ylfk3Db8019hNP2yfB018JUmI.m3u8'
  }
]

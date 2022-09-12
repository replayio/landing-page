import clsx from 'clsx'
import Image from 'next/future/image'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Bubble } from '~/components/common/bubble-popup'
import { DownloadButton } from '~/components/common/download-button'
import { HeadingSet } from '~/components/common/heading-set'
import { Timeline } from '~/components/common/progress-bar'
import { ScrollXGradient } from '~/components/common/scroll-x-gradient'
import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { UseGsapTimeAPI } from '~/hooks/use-gsap-time'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'
import { useMedia } from '~/hooks/use-media'
import { breakpoints } from '~/lib/constants'
import pauseSVG from '~/public/images/home/pause.svg'

import s from './powerful-dev-tools.module.scss'
import { Scene1, Scene2, Scene3, Scene4, Scene5, Scene6 } from './scenes'

type AssetChunkProps = {
  assets: {
    id: string
    title: string
    description: string
    active?: boolean
    onClick?: () => void
  }[]
} & JSX.IntrinsicElements['div']

const AssetChunks: FC<AssetChunkProps> = ({ assets }) => {
  return (
    <div className={s['progress-chunks']}>
      {assets.map((asset) => (
        <button
          onClick={asset.onClick}
          className={clsx(s['asset-chunk'])}
          key={asset.id}
        >
          <HeadingSet
            disabled={!asset.active}
            overtitle={asset.title}
            centered
          />
          <span id={asset.id} className={s['chunk-marker-anchor']} />
        </button>
      ))}
    </div>
  )
}

const VideoAsset: FC<JSX.IntrinsicElements['video'] & { active: boolean }> = ({
  active,
  ...rest
}) => {
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    const videoElm = videoRef.current

    if (active) {
      videoElm.play()
      setShowControls(false)
    } else {
      videoElm.pause()
      videoElm.currentTime = 0
    }
  }, [active])

  return (
    <video
      onClick={() => setShowControls(true)}
      style={{
        opacity: active ? 1 : 0,
        zIndex: active ? 10 : 0,
        pointerEvents: active ? 'all' : 'none',
        position: 'relative'
      }}
      controls={showControls}
      muted
      loop
      playsInline
      autoPlay
      {...rest}
      ref={videoRef}
    />
  )
}

const assets = [
  {
    title: 'Print Statements',

    description:
      'Add print statements and view the logs immediately in the Console.',
    video: '/video/hero-video.mp4',
    component: Scene1
  },
  {
    devtoolsTab: 'console',
    title: 'Console',
    description:
      'Fast forward to console logs and evaluate expressions in the Terminal.',
    video: '/video/hero-video.mp4',
    component: Scene2
  },
  {
    devtoolsTab: 'react',
    title: 'React',
    description:
      'Inspect React components and view their state, props, and hooks.',
    video: '/video/hero-video.mp4',
    component: Scene3
  },
  {
    devtoolsTab: 'elements',
    title: 'Elements',
    description:
      'Inspect DOM elements and view their applied rules and computed properties.',
    video: '/video/hero-video.mp4',
    component: Scene4
  },
  {
    devtoolsTab: 'network',
    title: 'Network',
    description:
      'Inspect Network requests and view their headers, request and response bodies.',
    video: '/video/hero-video.mp4',
    component: Scene5
  },
  {
    title: 'Debugger',
    description: 'Pause at a line of code and view the call stack and scopes.',
    video: '/video/hero-video.mp4',
    component: Scene6
  }
]

const buildAssetId = (asset: typeof assets[number], idx: number) =>
  `asset-chunk-${asset.title}-${idx}`

const AssetPlayer = () => {
  const isDesktopSize = useMedia(`(min-width: ${breakpoints.screenLg}px)`)
  const chunksScrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const prevIdx = useRef(0)
  const timelineRef = useRef<
    UseGsapTimeAPI & { seek: (percentage: string | number) => void }
  >(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [ref, { inView }] = useIntersectionObserver<HTMLDivElement>({
    triggerOnce: false
  })

  const markers = useMemo(
    () =>
      assets.map((asset, idx) => ({
        position: buildAssetId(asset, idx),
        onActive: () => setActiveIdx(idx)
      })),
    []
  )

  const handleDevtoolsTabChange = (panel: string) => {
    const foundIdx = assets.findIndex((asset) => asset.devtoolsTab === panel)

    if (foundIdx != -1) {
      const targetId = buildAssetId(assets[foundIdx], foundIdx)
      timelineRef.current?.seek(targetId)
    }
  }

  const pauseTimeline = useCallback(() => {
    timelineRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const resumeTimeline = useCallback(() => {
    timelineRef.current?.resume()
    setIsPlaying(true)
  }, [])

  useEffect(() => {
    prevIdx.current = activeIdx

    if (chunksScrollRef.current) {
      const targetAsset = document.getElementById(
        buildAssetId(assets[activeIdx], activeIdx)
      )?.parentElement

      if (targetAsset) {
        chunksScrollRef.current.scroll({
          left:
            targetAsset.offsetLeft -
            chunksScrollRef.current.clientWidth / 2 +
            targetAsset.clientWidth / 2,
          behavior: 'smooth'
        })
      }
    }
  }, [activeIdx])

  return (
    <div className={s['asset-player']} ref={ref}>
      <div className={s['head']}>
        <ScrollXGradient offset={32} ref={chunksScrollRef}>
          <Container className={s['container']} size="md">
            <AssetChunks
              assets={assets.map((asset, idx) => {
                const id = buildAssetId(asset, idx)

                return {
                  id,
                  active: idx <= activeIdx,
                  title: asset.title,
                  description: asset.description,
                  onClick: () => timelineRef.current?.seek(id)
                }
              })}
            />

            <div className={s['progress']}>
              <Timeline
                playing={inView}
                markers={markers}
                markerVisible={false}
                markerSize={14}
                duration={60}
                direction="horizontal"
                ref={timelineRef}
              />
            </div>
          </Container>
        </ScrollXGradient>
      </div>
      <Container size="md">
        <div className={s['epigraph-container']}>
          {
            <span className={clsx(s['epigraph'], s['placeholder'])}>
              {assets[4].description}
            </span>
          }
          <span className={s['epigraph']}>{assets[activeIdx].description}</span>
        </div>
        <div className={s['asset']}>
          {isDesktopSize
            ? assets.map(({ component: Scene }, idx) => (
                <Scene
                  hoverTooltipComponent={(text: string) => (
                    <Bubble
                      className={clsx(s['popup'], { [s['open']]: !isPlaying })}
                      variant
                    >
                      <div>
                        <Image src={pauseSVG} />
                        <p>Paused Timeline</p>
                      </div>
                      <p className={s['info']}>{text}</p>
                    </Bubble>
                  )}
                  active={inView && idx === activeIdx}
                  pauseTimeline={pauseTimeline}
                  resumeTimeline={resumeTimeline}
                  devtoolsProps={{
                    onPanelTabChange: handleDevtoolsTabChange
                  }}
                  key={idx}
                />
              ))
            : assets.map(({ video }, idx) => (
                <VideoAsset src={video} active={activeIdx === idx} key={idx} />
              ))}
        </div>
      </Container>
    </div>
  )
}

export const PowerfulDevTools: FC = () => {
  return (
    <Section className={s['section']}>
      <Container size="md">
        <SectionHeading
          title="Developer Tools"
          subtitle={
            <div>
              <p>
                We took browser DevTools and super charged it with time-travel.
                Add Console logs on the fly. Jump to any point in time. With
                time-travel, anything is possible!{' '}
                <a
                  className={s['subtitle-link']}
                  href="https://medium.com/replay-io/how-replay-works-5c9c29580c58"
                >
                  How Replay replays
                </a>
              </p>
              <DownloadButton />
            </div>
          }
          centered
        />
      </Container>
      <AssetPlayer />
    </Section>
  )
}

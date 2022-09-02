import clsx from 'clsx'
import Image from 'next/future/image'
import { FC, useEffect, useMemo, useRef, useState } from 'react'

import { Bubble } from '~/components/common/bubble-popup'
import { HeadingSet } from '~/components/common/heading-set'
import { Timeline } from '~/components/common/progress-bar'
import { ScrollXGradient } from '~/components/common/scroll-x-gradient'
import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { UseGsapTimeAPI } from '~/hooks/use-gsap-time'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'
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

const assets = [
  {
    title: 'Print Statements',
    description: 'Add a print statement and view the logs in the Console.'
  },
  {
    devtoolsTab: 'console',
    title: 'Console',
    description:
      'Fast forward to a console log and evaluate expressions in the Terminal.'
  },
  {
    devtoolsTab: 'react',
    title: 'React',
    description:
      'Inspect a React component and view its state, props, and hooks.'
  },
  {
    devtoolsTab: 'elements',
    title: 'Elements',
    description:
      'Inspect a DOM element and view its applied rules and computed properties.'
  },
  {
    devtoolsTab: 'network',
    title: 'Network',
    description:
      'Inspect a Network request and view its headers, request and response bodies.'
  },
  {
    title: 'Debugger',
    description: 'Pause at a line of code and view the call stack and scopes.'
  }
]

const scenes = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6]

const buildAssetId = (asset: typeof assets[number], idx: number) =>
  `asset-chunk-${asset.title}-${idx}`

const AssetPlayer = () => {
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

  const pauseTimeline = () => {
    timelineRef.current?.pause()
    setIsPlaying(false)
  }

  const resumeTimeline = () => {
    timelineRef.current?.resume()
    setIsPlaying(true)
  }

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
          {scenes.map((Scene, idx) => (
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
            <p>
              Everything that's possible in Chrome DevTools and several things
              that are not. You've never had this much fun debugging before.
            </p>
          }
          centered
        />
      </Container>
      <AssetPlayer />
    </Section>
  )
}

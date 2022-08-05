import clsx from 'clsx'
import { FC, useMemo, useRef, useState } from 'react'

import { HeadingSet } from '~/components/common/heading-set'
import { Timeline } from '~/components/common/progress-bar'
import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { UseGsapTimeAPI } from '~/hooks/use-gsap-time'

import s from './powerful-dev-tools.module.scss'
import { Scene1, Scene2, Scene3, Scene4, Scene5, Scene6 } from './scenes'

type AssetChunkProps = {
  assets: {
    id: string
    title: string
    description: string
    active?: boolean
  }[]
} & JSX.IntrinsicElements['div']

const AssetChunks: FC<AssetChunkProps> = ({ assets }) => {
  return (
    <div className={s['progress-chunks']}>
      {assets.map((asset) => (
        <div className={clsx(s['asset-chunk'])} key={asset.id}>
          <HeadingSet
            disabled={!asset.active}
            overtitle={asset.title}
            centered
          />
          <span id={asset.id} className={s['chunk-marker-anchor']} />
        </div>
      ))}
    </div>
  )
}

const assets = [
  {
    title: 'Print Statements',
    description:
      'Add replays to Bug Reports and Pull Requests and share them in Slack.'
  },
  {
    title: 'Console',
    description:
      'Add replays to Bug Reports and Pull Requests and share them in Slack.'
  },
  {
    title: 'React',
    description:
      'Add replays to Bug Reports and Pull Requests and share them in Slack.'
  },
  {
    title: 'Elements',
    description:
      'Add replays to Bug Reports and Pull Requests and share them in Slack.'
  },
  {
    title: 'Network',
    description:
      'Add replays to Bug Reports and Pull Requests and share them in Slack.'
  },
  {
    title: 'Debugger',
    description:
      'Add replays to Bug Reports and Pull Requests and share them in Slack.'
  }
]

const scenes = [
  <Scene1 key="scene-1" />,
  <Scene2 key="scene-2" />,
  <Scene3 key="scene-3" />,
  <Scene4 key="scene-4" />,
  <Scene5 key="scene-5" />,
  <Scene6 key="scene-6" />
]

const AssetPlayer = () => {
  const timelineRef = useRef<UseGsapTimeAPI>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const markers = useMemo(
    () =>
      assets.map((asset, idx) => ({
        position: `asset-chunk-${asset.title}-${idx}`,
        onActive: () => setActiveIdx(idx)
      })),
    []
  )

  return (
    <div className={s['asset-player']}>
      <div className={s['head']}>
        <Container className={s['container']} size="md">
          <AssetChunks
            assets={assets.map((asset, idx) => ({
              active: idx <= activeIdx,
              title: asset.title,
              id: `asset-chunk-${asset.title}-${idx}`,
              description: asset.description
            }))}
          />

          <div className={s['progress']}>
            <Timeline
              markers={markers}
              markerVisible={false}
              markerSize={14}
              duration={60}
              direction="horizontal"
              ref={timelineRef}
            />
          </div>
        </Container>
      </div>
      <Container size="md">
        <div className={s['asset']}>{scenes[5]}</div>
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
              Time travel debugging lets you replay the browser as it ran
              before, so that you can start debugging immediately and get into
              the flow state quickly.{' '}
              <a
                className={s['subtitle-link']}
                href="https://medium.com/replay-io/how-replay-works-5c9c29580c58"
              >
                How&nbsp;Replay&nbsp;works.
              </a>
            </p>
          }
          centered
        />
      </Container>
      <AssetPlayer />
    </Section>
  )
}

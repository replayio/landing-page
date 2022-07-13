import clsx from 'clsx'
import Image from 'next/future/image'
import { FC, useMemo, useState } from 'react'

import { HeadingSet } from '~/components/common/heading-set'
import { Timeline } from '~/components/common/progress-bar'
import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import s from './powerful-dev-tools.module.scss'

type AssetChunkProps = {
  title: string
  description: string
  active?: boolean
} & JSX.IntrinsicElements['div']

const AssetChunk: FC<AssetChunkProps> = ({ id, active, title }) => {
  return (
    <div className={clsx(s['asset-chunk'], { [s['active']]: active })}>
      <HeadingSet disabled={!active} centered overtitle={title} />
      <span id={id} className={s['chunk-marker-anchor']} />
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
    title: 'Debugger',
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
  }
]

const AssetPlayer = () => {
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
      <div className={s['progress-chunks']}>
        {assets.map((asset, idx) => (
          <AssetChunk
            key={idx}
            active={idx <= activeIdx}
            title={asset.title}
            id={`asset-chunk-${asset.title}-${idx}`}
            description={asset.description}
          />
        ))}
      </div>
      <div className={s['progress']}>
        <Timeline
          markers={markers}
          markerVisible={false}
          markerSize={14}
          duration={20}
          direction="horizontal"
          debug
        />
      </div>
      <div className={s['asset']}>
        <Image
          // @ts-ignore
          layout="raw"
          src="https://dummyimage.com/1286x712/000/fff"
          width={1286}
          height={712}
        />
      </div>
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
        <AssetPlayer />
      </Container>
    </Section>
  )
}

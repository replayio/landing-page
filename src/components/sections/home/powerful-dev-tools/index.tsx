import Image from 'next/future/image'
import { FC } from 'react'

import { HeadingSet } from '~/components/common/heading-set'
import { Timeline } from '~/components/common/progress-bar'
import { Section, SectionHeading } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import s from './powerful-dev-tools.module.scss'

type AssetChunkProps = {
  title: string
  description: string
} & JSX.IntrinsicElements['div']

const AssetChunk: FC<AssetChunkProps> = ({ title }) => {
  return (
    <div className={s['asset-chunk']}>
      <HeadingSet centered overtitle={title} />
    </div>
  )
}

const AssetPlayer = () => {
  return (
    <div className={s['asset-player']}>
      <div className={s['progress-chunks']}>
        <AssetChunk
          title="Print Statements"
          description="Add replays to Bug Reports and Pull Requests and share them in Slack."
        />
        <AssetChunk
          title="Console"
          description="Add replays to Bug Reports and Pull Requests and share them in Slack."
        />
        <AssetChunk
          title="Debugger"
          description="Add replays to Bug Reports and Pull Requests and share them in Slack."
        />
        <AssetChunk
          title="React"
          description="Add replays to Bug Reports and Pull Requests and share them in Slack."
        />
        <AssetChunk
          title="Elements"
          description="Add replays to Bug Reports and Pull Requests and share them in Slack."
        />
        <AssetChunk
          title="Network"
          description="Add replays to Bug Reports and Pull Requests and share them in Slack."
        />
      </div>
      <div className={s['progress']}>
        <Timeline duration={20} direction="horizontal" />
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

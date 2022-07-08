import Image from 'next/future/image'
import { FC, useEffect, useRef } from 'react'

import { HeadingSet } from '~/components/common/heading-set'
import {
  ProgressBar,
  UPDATE_INTERVAL_MS
} from '~/components/common/progress-bar'
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
  const progressRef = useRef<any>(null)
  const currentProgress = useRef<number>(0)

  const updateProgress = () => {
    currentProgress.current = (currentProgress.current + 1) % 101
    progressRef.current.update(currentProgress.current)
  }

  useEffect(() => {
    const interval = setInterval(updateProgress, UPDATE_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [])

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
        <ProgressBar ref={progressRef} direction="horizontal" />
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
          subtitle="Replay is the first Time Travel Debugger for modern web applications. This means you can inspect your application at any point in time and even add a print statement and see the new logs in the Console. Replay should feel both familiar and magical."
          centered
        />
        <AssetPlayer />
      </Container>
    </Section>
  )
}

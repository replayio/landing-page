import Image from 'next/future/image'
import { FC, useEffect, useState } from 'react'

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

const AssetChunk: FC<AssetChunkProps> = ({ title, description }) => {
  return (
    <div className={s['asset-chunk']}>
      <div className={s['asset-chunk__header']}>
        <HeadingSet overtitle={title} description={description} />
      </div>
    </div>
  )
}

const AssetPlayer = () => {
  const [progress, setProgress] = useState(0)

  const updateProgress = () => {
    setProgress((progress) => (progress + 1) % 101)
  }

  useEffect(() => {
    const interval = setInterval(updateProgress, UPDATE_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={s['asset-player']}>
      <div className={s['progress-chunks']}>
        <AssetChunk
          title="Console"
          description="Add replays to Bug Reports and Pull Requests and share them in Slack."
        />
        <AssetChunk
          title="React"
          description="Add replays to Bug Reports and Pull Requests and share them in Slack."
        />
        <AssetChunk
          title="Debugger"
          description="Add replays to Bug Reports and Pull Requests and share them in Slack."
        />
        <AssetChunk
          title="Network"
          description="Add replays to Bug Reports and Pull Requests and share them in Slack."
        />
      </div>
      <div className={s['progress']}>
        <ProgressBar progress={progress} direction="horizontal" thumbless />
      </div>
      <div className={s['asset']}>
        <Image
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

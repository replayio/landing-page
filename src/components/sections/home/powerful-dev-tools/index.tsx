import Image from 'next/image'
import { FC } from 'react'

import { Heading } from '~/components/common/heading'
import { HeadingSet } from '~/components/common/heading-set'
import { Section } from '~/components/common/section'
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
        <div className={s['progress-bar']} />
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
        <Heading centered>Powerful Developer Tools</Heading>

        <AssetPlayer />
      </Container>
    </Section>
  )
}

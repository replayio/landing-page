import Image, { ImageProps } from 'next/image'
import { FC, ReactNode } from 'react'

import { Badge } from '~/components/common/badge'

import s from './card.module.scss'

type CardProps = {
  icon: ImageProps['src']
  title: string | ReactNode
  badge: string
  lanternIndex: number
}

export const Card: FC<CardProps> = ({ icon, title, badge, lanternIndex }) => {
  return (
    <div
      className={s['container']}
      style={{ ['--landern-index' as string]: lanternIndex.toString() }}
    >
      <div className={s['border-bg']} />
      <div className={s['bg']} />
      <div className={s['content']}>
        <div className={s['icon']}>
          <Image src={icon} width={80} height={80} alt="runtime logo" />
        </div>
        <p className={s['title']}>{title}</p>
        <Badge className={s['badge']} text={badge} />
      </div>
    </div>
  )
}

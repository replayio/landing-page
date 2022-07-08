import { FC, ReactChild } from 'react'

import { Container } from '../container'
import s from './announcement-bar.module.scss'

type AnnouncementBarProps = {
  text: string | ReactChild
}

export const AnnouncementBar: FC<AnnouncementBarProps> = ({ text }) => {
  return (
    <div className={s['announcement']}>
      <Container size="md">
        <p className={s['text']}>{text}</p>
      </Container>
    </div>
  )
}

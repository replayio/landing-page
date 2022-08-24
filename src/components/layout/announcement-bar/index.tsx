import clsx from 'clsx'
import Head from 'next/head'
import { FC, ReactChild } from 'react'

import { Container } from '../container'
import s from './announcement-bar.module.scss'

type AnnouncementBarProps = {
  text: string | ReactChild
}

export const AnnouncementBar: FC<AnnouncementBarProps> = ({ text }) => {
  return (
    <div className={clsx(s['announcement'], 'inverted-selection')}>
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
          document.documentElement.classList.add('has-announcement')
        `
          }}
        />
      </Head>
      <Container size="md">
        <p className={s['text']}>{text}</p>
      </Container>
    </div>
  )
}

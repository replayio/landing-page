import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'

import { MuxVideo } from '~/components/primitives/mux-video'

import s from './video-modal.module.scss'

interface VideoModalProps {
  url: string
  poster?: string
  button: React.ReactNode
}

export const VideoModal: React.FC<VideoModalProps> = ({
  url,
  poster,
  button
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{button}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.modalOverlay} />
        <Dialog.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault()
          }}
          className={s.modalContent}
        >
          <MuxVideo poster={poster} controls className={s.video} muxSrc={url} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

import s from './modal.module.scss'

interface Props {
  children: ReactNode
  onOpenChange: (isOpen: boolean) => void
  isModalOpen: boolean
}

function Modal({ children, isModalOpen, onOpenChange }: Props) {
  return (
    <Dialog.Root open={isModalOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal className={s.portal}>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>{children}</Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal

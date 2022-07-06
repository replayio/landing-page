import clsx from 'clsx'
import { FC } from 'react'

import s from './button.module.scss'

type ButtonProps = {
  size?: 'sm' | 'md'
  variant?: 'primary' | 'secondary' | 'tertiary'
  unstyled?: boolean
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  unstyled = false,
  size = 'md'
}) => {
  return (
    <button
      className={clsx(
        s['button'],
        { [s['unstyled']]: unstyled },
        s[variant],
        s[size]
      )}
    >
      {children}
    </button>
  )
}

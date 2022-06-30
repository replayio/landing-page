import clsx from 'clsx'
import { FC } from 'react'

import s from './button.module.scss'

type ButtonProps = { size?: 'sm' | 'md'; variant?: 'primary' | 'secondary' }

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md'
}) => {
  return (
    <button className={clsx(s['button'], s[variant], s[size])}>
      {children}
    </button>
  )
}

import clsx from 'clsx'
import { FC } from 'react'

import s from './badge.module.scss'

type BadgeProps = {
  text: string
  variant?: 'primary' | 'secondary'
} & JSX.IntrinsicElements['span']

export const Badge: FC<BadgeProps> = ({
  text,
  variant = 'primary',
  className
}) => {
  return <span className={clsx(s['badge'], s[variant], className)}>{text}</span>
}

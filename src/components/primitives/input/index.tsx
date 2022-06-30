import clsx from 'clsx'
import { FC } from 'react'

import s from './input.module.scss'

type InputProps = JSX.IntrinsicElements['input']

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return <input className={clsx(s['input'], className)} {...props} />
}

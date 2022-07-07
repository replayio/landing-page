import clsx from 'clsx'
import { FC } from 'react'

import s from './button.module.scss'

type ButtonProps = {
  size?: 'sm' | 'md'
  variant?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-inverted'
  unstyled?: boolean
  rounded?: boolean
} & JSX.IntrinsicElements['button']

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  unstyled = false,
  size = 'md',
  rounded = false,
  className,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        s['button'],
        { [s['rounded']]: rounded },
        { [s['unstyled']]: unstyled },
        s[variant],
        s[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

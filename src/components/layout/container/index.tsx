import clsx from 'clsx'
import { forwardRef } from 'react'

import s from './container.module.scss'

type ContainerProps = {
  size?: 'sm' | 'md'
} & JSX.IntrinsicElements['div']

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'md', ...props }, ref) => {
    return (
      <div
        {...props}
        className={clsx(s['container'], s[size], className)}
        ref={ref}
      />
    )
  }
)

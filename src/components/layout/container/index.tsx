import clsx from 'clsx'
import { forwardRef } from 'react'

export type ContainerProps = {
  size?: 'sm' | 'md' | 'lg'
} & JSX.IntrinsicElements['div']

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'md', ...props }, ref) => {
    return (
      <div
        {...props}
        className={clsx('container', size, className)}
        ref={ref}
      />
    )
  }
)

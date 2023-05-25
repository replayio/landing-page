import clsx from 'clsx'
import { ComponentProps, ElementType, forwardRef } from 'react'

import s from './container.module.scss'

type Props = {
  size?: 'sm' | 'md' | 'lg' /* Not in use just for compatibility */
  as?: 'div' | 'section' | 'header' | 'footer'
} & JSX.IntrinsicElements['div']

export const Container = forwardRef<HTMLDivElement, Props>(
  ({ className, as = 'div', size = 'md', ...props }, ref) => {
    const Element: ElementType = as

    return (
      <Element
        {...props}
        className={clsx(s.container, s[size], className)}
        ref={ref}
      />
    )
  }
)

export const containerStyles = s

export type ContainerProps = ComponentProps<typeof Container>

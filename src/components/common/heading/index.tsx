import clsx from 'clsx'
import { FC } from 'react'

import s from './heading.module.scss'

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type HeadingProps = {
  size?: 'sm' | 'lg'
  as?: HeadingElement
  centered?: boolean
  id?: string
} & JSX.IntrinsicElements[HeadingElement]

export const Heading: FC<HeadingProps> = ({
  as = 'h2',
  centered = false,
  size = 'sm',
  id = '',
  className,
  children
}) => {
  const Comp = as

  return (
    <Comp
      className={clsx(
        s['heading'],
        s[size],
        {
          [s['centered'] as string]: centered
        },
        className
      )}
      id={id}
    >
      {children}
    </Comp>
  )
}

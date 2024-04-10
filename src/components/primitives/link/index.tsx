import clsx from 'clsx'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { forwardRef } from 'react'

import s from './link.module.scss'

export type LinkProps = {
  children?: React.ReactNode
  unstyled?: boolean
  asChild?: boolean
} & JSX.IntrinsicElements['a'] &
  Omit<NextLinkProps, 'as' | 'passHref'>

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, unstyled, ...restProps }, ref) => {
    return (
      <NextLink
        {...restProps}
        className={clsx(s['link'], { [s['unstyled'] as string]: unstyled }, className)}
        ref={ref}
      >
        {children}
      </NextLink>
    )
  }
)

Link.displayName = 'Link'

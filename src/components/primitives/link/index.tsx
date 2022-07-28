import clsx from 'clsx'
import { checkIsExternal } from 'lib/utils/router'
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
  ({ children, className, ...restProps }, ref) => {
    const {
      href,
      // NextLink Props
      replace,
      scroll = true,
      shallow,
      prefetch,
      unstyled = false,
      asChild,
      // Rest
      ...aProps
    } = restProps

    const isExternal = checkIsExternal(href)

    return (
      <NextLink
        href={href}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        prefetch={prefetch}
        passHref
      >
        {!asChild ? (
          <a
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener' : undefined}
            {...aProps}
            ref={ref}
            className={clsx(
              s['link'],
              { [s['unstyled']]: unstyled },
              className
            )}
          >
            {children}
          </a>
        ) : (
          children
        )}
      </NextLink>
    )
  }
)

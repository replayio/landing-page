import clsx from 'clsx'
import { checkIsExternal } from 'lib/utils/router'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { forwardRef } from 'react'

import s from './link.module.scss'

export type LinkProps = {
  children?: React.ReactNode
  unstyled?: boolean
} & JSX.IntrinsicElements['a'] &
  Omit<NextLinkProps, 'as' | 'passHref'>

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, ...restProps }, ref) => {
    const {
      href,
      // NextLink Props
      replace,
      scroll = false,
      shallow,
      prefetch,
      unstyled = false,
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
        <a
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener' : undefined}
          {...aProps}
          ref={ref}
          className={clsx(
            s['link'],
            s['link--rg'],
            { [s['unstyled']]: unstyled },
            className
          )}
        >
          {unstyled ? <>{children}</> : <span>{children}</span>}
        </a>
      </NextLink>
    )
  }
)

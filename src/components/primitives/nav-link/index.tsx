import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { forwardRef } from 'react'

import { IconNames, IconsLibrary } from '~/components/icons'

import s from './nav-link.module.scss'

export type NavLinkProps = {
  active?: boolean
  invertedHover?: boolean
  disabled?: boolean
  iconPrefix?: IconNames
  iconSuffix?: IconNames
} & LinkProps &
  Omit<JSX.IntrinsicElements['a'], 'ref'>

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ active, invertedHover = false, iconPrefix, iconSuffix, ...rest }, ref) => {
    return (
      <Link
        {...rest}
        className={clsx(s['nav-link'], rest.className, {
          [s['active'] as string]: active,
          [s['inverted-hover'] as string]: invertedHover,
          [s['disabled'] as string]: rest.disabled
        })}
        ref={ref}
      >
        {iconPrefix && (
          <span className={s.iconPrefix}>{IconsLibrary[iconPrefix]}</span>
        )}

        {rest.children}

        {iconSuffix && (
          <span className={s.iconSuffix}>{IconsLibrary[iconSuffix]}</span>
        )}
      </Link>
    )
  }
)

import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { forwardRef, useMemo } from 'react'

import { IconNames, IconsLibrary } from '~/components/icons'
import { checkIsExternal } from '~/lib/utils/router'

import s from './nav-link.module.scss'

export type NavLinkProps = {
  active?: boolean
  invertedHover?: boolean
  disabled?: boolean
  iconPrefix?: IconNames
  iconSuffix?: IconNames
  notExternal?: boolean
} & LinkProps &
  Omit<JSX.IntrinsicElements['a'], 'href' | 'ref'>

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ active, notExternal, invertedHover = false, iconPrefix, iconSuffix, ...rest }, ref) => {
    const externalProps = useMemo(() => {
      const p = { target: '_blank', rel: 'noopener' }
      if (typeof rest.href === 'string') {
        if (checkIsExternal(rest.href)) return p
      } else if (checkIsExternal(rest.href.href ?? '')) return p
    }, [rest.href])

    return (
      <Link
        {...rest}
        className={clsx(s['nav-link'], rest.className, {
          [s['active'] as string]: active,
          [s['inverted-hover'] as string]: invertedHover,
          [s['disabled'] as string]: rest.disabled
        })}
        {...(notExternal ? undefined : externalProps)}
        ref={ref}
      >
        {iconPrefix && <span className={s.iconPrefix}>{IconsLibrary[iconPrefix]}</span>}

        {rest.children}

        {iconSuffix && <span className={s.iconSuffix}>{IconsLibrary[iconSuffix]}</span>}
      </Link>
    )
  }
)

NavLink.displayName = 'NavLink'

import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { forwardRef } from 'react'

import s from './nav-link.module.scss'

type Props = {
  active?: boolean
  invertedHover?: boolean
  disabled?: boolean
} & LinkProps &
  JSX.IntrinsicElements['a']

export const NavLink = forwardRef<HTMLAnchorElement, Props>(
  ({ active, invertedHover = false, ...rest }, ref) => {
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
        {rest.children}
      </Link>
    )
  }
)

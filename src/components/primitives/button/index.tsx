import clsx from 'clsx'
import React, {
  ComponentPropsWithRef,
  ElementType,
  FC,
  forwardRef,
  useMemo
} from 'react'

import { checkIsExternal } from '~/lib/utils/router'

import { Link, LinkProps } from '../link'
import s from './button.module.scss'

type ButtonProps<C extends ElementType> = {
  size?: 'sm' | 'md'
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-inverted'
    | 'tertiary-inverted-alt'
  unstyled?: boolean
  rounded?: boolean
  noHover?: boolean
  children?: React.ReactNode
  as?: C
} & React.ComponentPropsWithoutRef<C>

type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref']

export const Button = forwardRef(
  <C extends ElementType>(
    {
      as,
      children,
      variant = 'secondary',
      unstyled = false,
      size = 'md',
      rounded = false,
      className,
      noHover = false,
      ...rest
    }: ButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Comp = as || 'button'

    return (
      <Comp
        className={clsx(
          s['button'],
          {
            [s['rounded']]: rounded,
            [s['unstyled']]: unstyled,
            [s['no-hover']]: noHover
          },
          s[variant],
          s[size],
          className
        )}
        {...rest}
        ref={ref}
      >
        <span className={s['content']}>{children}</span>
      </Comp>
    )
  }
)

type NextLinkProps = Pick<
  LinkProps,
  'href' | 'locale' | 'prefetch' | 'replace' | 'scroll' | 'shallow'
>

export type ButtonLinkProps = ButtonProps<'a'> &
  NextLinkProps & { notExternal?: boolean }

export const ButtonLink: FC<ButtonLinkProps> = ({ href, ...rest }) => {
  const externalProps = useMemo(() => {
    const p = { target: '_blank', rel: 'noopener' }
    if (typeof href === 'string') {
      if (checkIsExternal(href)) return p
    }
  }, [href])

  return (
    <Link href={href} asChild>
      <Button as="a" {...externalProps} {...rest} />
    </Link>
  )
}

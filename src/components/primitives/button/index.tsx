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

type VideoControlProps = {
  isVideoButton?: boolean
  loadingProgress?: number
  onTogglePlay?: () => void
}

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
  isVideoButton?: boolean
  noHover?: boolean
  as?: C
} & VideoControlProps &
  React.ComponentPropsWithoutRef<C>

type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref']

export const Button = forwardRef(
  <C extends ElementType>(
    {
      as,
      variant = 'secondary',
      unstyled = false,
      size = 'md',
      rounded = false,
      className,
      noHover = false,
      isVideoButton = false,
      onTogglePlay,
      ...rest
    }: ButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Comp = as || 'button'

    // Event handler for the video button
    const handleTogglePlay = () => {
      if (onTogglePlay) {
        onTogglePlay()
      }
    }

    return (
      <Comp
        className={clsx(
          s['button'],
          rounded && s['rounded'],
          unstyled && s['unstyled'],
          noHover && s['no-hover'],
          isVideoButton && s['video-button'],
          s[variant],
          s[size],
          className
        )}
        {...rest}
        ref={ref}
        onClick={(e) => {
          if (isVideoButton) {
            e.stopPropagation()
            handleTogglePlay()
          }
          if (rest.onClick) {
            rest.onClick(e)
          }
        }}
      ></Comp>
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

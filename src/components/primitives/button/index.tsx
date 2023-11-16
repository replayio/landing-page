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
  isPlaying?: boolean
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
  noHover?: boolean
  children?: React.ReactNode
  as?: C
} & VideoControlProps &
  React.ComponentPropsWithoutRef<C>

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
      loadingProgress,
      noHover = false,
      isVideoButton = false,
      isPlaying = false,
      onTogglePlay,
      ...rest
    }: ButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Comp = as || 'button'

    // Play/Pause Icon Elements
    const PlayIcon = () => <span>▶️</span> // Replace with actual play icon
    const PauseIcon = () => <span>⏸️</span> // Replace with actual pause icon

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
          {
            [s['rounded']]: rounded,
            [s['unstyled']]: unstyled,
            [s['no-hover']]: noHover,
            [s['video-button']]: isVideoButton // Additional class for styling video button
          },
          s[variant],
          s[size],
          className
        )}
        {...rest}
        ref={ref}
        onClick={(e) => {
          if (isVideoButton) {
            e.stopPropagation() // Prevent the event from bubbling if it's a video button
            handleTogglePlay()
          }
          if (rest.onClick) {
            rest.onClick(e) // If there's an onClick prop, call it
          }
        }}
      >
        <span className={s['content']}>
          {isVideoButton && (isPlaying ? <PauseIcon /> : <PlayIcon />)}
          {loadingProgress !== undefined && renderCircularProgress()}
          {children}
        </span>
      </Comp>
    )
  }
)

const renderCircularProgress = () => {
  if (loadingProgress !== undefined) {
    // Calculate the strokeDashoffset based on the progress
    const radius = 20
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset =
      circumference - (loadingProgress / 100) * circumference

    return (
      <svg height="50" width="50" className="circular-progress">
        <circle
          stroke="#01ACFD"
          strokeWidth="8"
          fill="transparent"
          r={radius}
          cx="25"
          cy="25"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: strokeDashoffset,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%'
          }}
        />
      </svg>
    )
  }
  return null
}

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

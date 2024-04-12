import clsx from 'clsx'
import { FC, forwardRef, ReactNode } from 'react'

import s from './texts.module.scss'

type TitleProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  hero?: boolean
  children: ReactNode
  className?: string
  white?: boolean
}

export const Title: FC<TitleProps> = ({ as = 'h1', children, className, white, hero, ...rest }) => {
  const Comp = as

  return (
    <Comp
      {...rest}
      className={clsx(
        'font-display font-bold tracking-tight text-gray-900',
        className,
        white ? 'text-white' : 'text-gray-900',
        {
          'text-4xl md:text-6xl': as === 'h1',
          'text-3xl md:text-5xl': as === 'h2'
        }
      )}
    >
      {children}
    </Comp>
  )
}

Title.displayName = 'Title'

type EyebrowProps = { children: ReactNode; className?: string }

export const Eyebrow: FC<EyebrowProps> = ({ children, className, ...rest }) => {
  return (
    <p
      {...rest}
      className={clsx('text-accent text-base font-semibold tracking-wide md:text-lg', className)}
    >
      {children}
    </p>
  )
}

Eyebrow.displayName = 'Eyebrow'

type SubtitleProps = { children: ReactNode; className?: string }

export const Subtitle = forwardRef<HTMLParagraphElement, SubtitleProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <p {...rest} className={clsx(s.subtitle, className)} ref={ref}>
        {children}
      </p>
    )
  }
)

Subtitle.displayName = 'Subtitle'

export const TitleAndSubtitle = ({
  title,
  subtitle,
  className
}: {
  title: TitleProps
  subtitle?: SubtitleProps
  className?: string
}) => {
  return (
    <div className={clsx(s.titleSubtitleWrapper, className)}>
      <Title {...title} />
      {subtitle && <Subtitle {...subtitle} />}
    </div>
  )
}

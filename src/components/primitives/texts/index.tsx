import clsx from 'clsx'
import { forwardRef, ReactNode } from 'react'

import s from './texts.module.scss'

type TitleProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  hero?: boolean
  children: ReactNode
  className?: string
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ as = 'h1', children, className, hero, ...rest }, ref) => {
    const Comp = as

    return (
      <Comp
        {...rest}
        className={clsx(s.title, className, { [s.hero as string]: hero })}
        ref={ref}
      >
        {children}
      </Comp>
    )
  }
)

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

export const TitleAndSubtitle = ({
  title,
  subtitle,
  className
}: {
  title: TitleProps
  subtitle: SubtitleProps
  className?: string
}) => {
  return (
    <div className={clsx(s.titleSubtitleWrapper, className)}>
      <Title {...title} />
      <Subtitle {...subtitle} />
    </div>
  )
}

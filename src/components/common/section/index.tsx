import clsx from 'clsx'
import { FC, forwardRef } from 'react'

import { Heading } from '~/components/common/heading'

import s from './section.module.scss'

type SectionProps = JSX.IntrinsicElements['section']

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...props }, ref) => (
    <section className={clsx(s['section'], className)} {...props} ref={ref} />
  )
)

type SectionHeadingProps = {
  title: string
  subtitle?: string
  centered?: boolean
}

export const SectionHeading: FC<SectionHeadingProps> = ({
  centered,
  title,
  subtitle
}) => {
  return (
    <div className={s['section-heading']}>
      <Heading centered={centered}>{title}</Heading>
      {subtitle && (
        <p className={clsx(s['subtitle'], { [s['centered']]: centered })}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
import clsx from 'clsx'
import { FC, forwardRef, ReactElement } from 'react'

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
  subtitle?: string | ReactElement
  centered?: boolean
}
function sluggify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export const SectionHeading: FC<SectionHeadingProps> = ({
  centered,
  title,
  subtitle
}) => {
  const DescriptionElm = typeof subtitle === 'string' ? 'p' : 'div'

  return (
    <div className={s['section-heading']}>
      <Heading id={sluggify(title)} centered={centered}>
        {title}
      </Heading>
      {subtitle && (
        <DescriptionElm
          className={clsx(s['subtitle'], { [s['centered']]: centered })}
        >
          {subtitle}
        </DescriptionElm>
      )}
    </div>
  )
}

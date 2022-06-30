import clsx from 'clsx'
import { FC } from 'react'

import s from './section.module.scss'

type SectionProps = JSX.IntrinsicElements['section']

export const Section: FC<SectionProps> = ({ className, ...props }) => {
  return <section className={clsx(s['section'], className)} {...props} />
}

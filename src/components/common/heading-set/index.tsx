import clsx from 'clsx'
import { FC } from 'react'

import s from './heading-set.module.scss'

type HeadingSetProps = {
  overtitle?: string | JSX.Element
  title?: string | JSX.Element
  description?: string | JSX.Element
  centered?: boolean
  className?: string
  disabled?: boolean
}

export const HeadingSet: FC<HeadingSetProps> = ({
  overtitle,
  title,
  description,
  centered = false,
  disabled,
  className
}) => (
  <div
    className={clsx(
      s['heading-set'],
      { [s['centered']]: centered, [s['disabled']]: disabled },
      className
    )}
  >
    {overtitle && <p className={s['heading-set__overtitle']}>{overtitle}</p>}
    {title && <h3 className={s['heading-set__title']}>{title}</h3>}
    {description && (
      <p className={s['heading-set__description']}>{description}</p>
    )}
  </div>
)

import { FC } from 'react'

import s from './heading-set.module.scss'

type HeadingSetProps = {
  overtitle?: string | JSX.Element
  title?: string | JSX.Element
  description?: string | JSX.Element
}

export const HeadingSet: FC<HeadingSetProps> = ({
  overtitle,
  title,
  description
}) => (
  <div className={s['heading-set']}>
    <p className={s['heading-set__overtitle']}>{overtitle}</p>
    <h3 className={s['heading-set__title']}>{title}</h3>
    <p className={s['heading-set__description']}>{description}</p>
  </div>
)

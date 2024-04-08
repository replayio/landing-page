import clsx from 'clsx'
import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

import s from './heading-set.module.scss'

type HeadingSetProps = {
  overtitle?: string | JSX.Element
  title?: string | JSX.Element
  description?: string | JSX.Element
  centered?: boolean
  className?: string
  disabled?: boolean
  image?: ImageProps
}

export const HeadingSet: FC<HeadingSetProps> = ({
  image,
  overtitle,
  title,
  description,
  centered = false,
  disabled,
  className
}) => {
  const DescriptionElm = typeof description === 'string' ? 'p' : 'div'

  return (
    <div
      className={clsx(
        s['heading-set'],
        {
          [s['centered'] as string]: centered,
          [s['disabled'] as string]: disabled
        },
        className
      )}
    >
      {image && <Image {...image} alt="" />}
      {overtitle && <p className={s['heading-set__overtitle']}>{overtitle}</p>}
      {title && <h2 className={s['heading-set__title']}>{title}</h2>}
      {description && (
        <DescriptionElm className={s['heading-set__description']}>{description}</DescriptionElm>
      )}
    </div>
  )
}

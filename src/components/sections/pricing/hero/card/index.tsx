import clsx from 'clsx'
import { FC } from 'react'

import { ButtonLink } from '~/components/primitives/button'

import s from './card.module.scss'

interface Props {
  data: {
    type: string
    price?: string | number
    mode?: string
    link: string
    cta: string
    features: string[]
  }
  variant?: 'primary' | 'default'
}

export const Card: FC<Props> = ({ data, variant = 'default' }) => {
  return (
    <div
      className={clsx(s.card, { [s.primary as string]: variant === 'primary' })}
    >
      <h2>{data.type}</h2>
      <div>
        {data?.price ? (
          <>
            <span>
              {typeof data.price === 'number' && '$'}
              {data.price}
            </span>
            <span>{data.mode}</span>
          </>
        ) : (
          <span>Let's chat</span>
        )}
      </div>
      <ButtonLink
        href={data.link}
        variant={data.type === 'Organization' ? 'tertiary' : 'primary'}
      >
        {data.cta}
      </ButtonLink>
      <ul>
        {data.features.map((feature: string, i: number) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}

import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'

import { Button } from '~/components/primitives/button'

import s from './card.module.scss'

interface Props {
  data: {
    type: string
    price?: string | number
    mode?: string
    cta: string
    features: string[]
  }
  variant?: 'primary' | 'default'
  annual?: boolean
}

export const Card: FC<Props> = ({ data, annual, variant = 'default' }) => {
  const [price, setPrice] = useState(data.price)

  useEffect(() => {
    if (!annual && typeof data.price === 'number') {
      setPrice(data.price)
    }
    if (annual && typeof data.price === 'number') {
      setPrice(Math.ceil(data.price - (25 * data?.price) / 100))
    }
  }, [annual, data.price])

  return (
    <div className={clsx(s.card, { [s.primary]: variant === 'primary' })}>
      <span>{data.type}</span>
      <div>
        {data?.price ? (
          <>
            <span>
              {typeof data.price === 'number' && '$'}
              {price}
            </span>
            <span>{data.mode}</span>
          </>
        ) : (
          <span>Let's chat</span>
        )}
      </div>
      <Button variant={data.type === 'Organization' ? 'tertiary' : 'primary'}>
        {data.cta}
      </Button>
      <ul>
        {data.features.map((feature: string, i: number) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}

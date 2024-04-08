import { PopupButton } from '@typeform/embed-react'
import clsx from 'clsx'
import { FC } from 'react'

import { Button, ButtonLink } from '~/components/primitives/button'

import s from './card.module.scss'

interface Props {
  data: {
    type: string
    price?: string | number
    mode?: string
    link?: string
    cta: string
    features: string[]
  }
  variant?: 'primary' | 'default'
  mode: string
}

export const Card: FC<Props> = ({ mode, data }) => {
  const variant =
    (mode === 'bugs' && data.type === 'Organization') || (mode === 'tests' && data.type == 'Pro')
      ? 'primary'
      : 'default'

  return (
    <div className={clsx(s.card, { [s.primary as string]: variant === 'primary' })}>
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
          <span>Let&apos;s chat</span>
        )}
      </div>

      {data.link ? (
        <ButtonLink
          href={data.link}
          variant={data.type === 'Organization' ? 'tertiary' : 'primary'}
        >
          {data.cta}
        </ButtonLink>
      ) : (
        <PopupButton id="jTudlerL" className={s.cta} as="a">
          <Button
            as="a"
            variant={data.type === 'Pro' ? 'tertiary' : 'primary'}
            aria-label="Learn more about Test Suites"
          >
            {data.cta}
          </Button>
        </PopupButton>
      )}

      <ul>
        {data.features.map((feature: string, i: number) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}

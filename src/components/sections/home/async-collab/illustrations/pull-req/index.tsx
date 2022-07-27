import Image from 'next/future/image'
import { FC } from 'react'

import { IsoLogo } from '~/components/primitives/logo'

import s from './pull-req.module.scss'

export const PullReq: FC = () => {
  return (
    <div className={s['cards']}>
      <div className={s['card']}>
        <div>
          <p className={s['title']}>
            <span className={s['logo']}>
              <IsoLogo />
            </span>
            Hoverboard flickers when flipping.
          </p>
          <span className={s['recorded']}>
            Recorded by <span className={s['name']}>Daniel Miller</span>
          </span>
        </div>
        <div className={s['image-container']}>
          <Image
            src="/images/home/board-1.png"
            width={71}
            height={71}
            alt="floating hoverboard"
          />
        </div>
      </div>

      <div className={s['card']}>
        <div>
          <p className={s['title']}>
            <span className={s['logo']}>
              <IsoLogo />
            </span>
            Hoverboard flips smoothly.
          </p>
          <span className={s['recorded']}>
            Recorded by <span className={s['name']}>Elaine Baylor</span>
          </span>
        </div>
        <div className={s['image-container']}>
          <Image
            src="/images/home/board-2.png"
            width={71}
            height={71}
            alt="floating hoverboard"
          />
        </div>
      </div>
    </div>
  )
}

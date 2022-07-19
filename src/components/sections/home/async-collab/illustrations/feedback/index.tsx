import Image from 'next/future/image'
import { FC } from 'react'

import s from './feedback.module.scss'

export const Feedback: FC = () => {
  return (
    <div className={s['cards']}>
      <div className={s['card']}>
        <div className={s['image-container']}>
          <Image src="/images/home/avatar-1.webp" width={71} height={71} />
          <span className={s['status']} />
        </div>
        <div>
          <p className={s['title']}>
            Why is update Cart called without a user id?
          </p>
          <span className={s['addon']}>api/cart.ts</span>
        </div>
      </div>

      <div className={s['card']}>
        <div className={s['image-container']}>
          <Image src="/images/home/avatar-2.webp" width={71} height={71} />
          <span className={s['status']} />
        </div>
        <div>
          <p className={s['title']}>
            Should the cart show quantity field be disabled?
          </p>
          <span className={s['addon']}>
            Qty 2
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              style={{ display: 'inline-block' }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.99996 7.93945L3.06061 5.03024L8.93932 5.03024L5.99996 7.93945Z"
                fill="#03A2FD"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

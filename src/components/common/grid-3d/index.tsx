import Image from 'next/image'
import { forwardRef } from 'react'

import gridPng from '~/public/images/homepage/grid.png'

import s from './grid-3d.module.scss'

const GridSvg = () => {
  return (
    <Image
      loading="eager"
      priority
      src={gridPng}
      className={s['grid']}
      quality={100}
      alt="haha"
    />
  )
}

export const Grid3D = forwardRef<HTMLDivElement, unknown>((_, ref) => {
  return (
    /* Gives perspective */
    <div className={s['container']}>
      {/* Gives rotation */}
      <div className={s['rotate']}>
        {/* Gives y displace control */}
        <div className={s['y-group-control']} ref={ref}>
          <GridSvg />
          <GridSvg />
        </div>
      </div>
    </div>
  )
})

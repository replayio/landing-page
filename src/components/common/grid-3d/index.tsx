import Image from 'next/image'
import { forwardRef, useState } from 'react'

import gridPng from '~/public/images/homepage/grid.png'

import s from './grid-3d.module.scss'

const Grid = () => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      loading="eager"
      priority
      src={gridPng}
      className={s['grid']}
      quality={100}
      alt="grid"
      onLoadingComplete={() => setLoaded(true)}
      style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity .3s ease-in'
      }}
      draggable={false}
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
          <Grid />
          <Grid />
        </div>
      </div>
    </div>
  )
})

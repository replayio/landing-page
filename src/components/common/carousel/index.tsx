import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import { FC } from 'react'

import s from './carousel.module.scss'

type CarouselProps = JSX.IntrinsicElements['div']

export const Carousel: FC<CarouselProps> = ({ children, className }) => {
  const [viewportRef] = useEmblaCarousel({
    align: 'center',
    startIndex: Array.isArray(children) ? Math.floor(children.length / 2) : 0
  })

  return (
    <div className={clsx(s['embla'], className)}>
      <div className={s['embla__viewport']} ref={viewportRef}>
        <div className={s['embla__container']}>
          {Array.isArray(children) &&
            children.map((child, idx) => (
              <div className={s['embla__slide']} key={idx}>
                <div className={s['embla__slide__inner']}>{child}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

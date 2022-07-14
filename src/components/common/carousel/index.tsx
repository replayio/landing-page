import clsx from 'clsx'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import Image from 'next/future/image'
import { FC, useCallback, useEffect, useState } from 'react'

import arrowNext from '~/public/images/about/arrow-next.svg'
import arrowPrev from '~/public/images/about/arrow-prev.svg'

import s from './carousel.module.scss'

type CarouselProps = {
  config?: EmblaOptionsType
  slideClassName?: string
  dots?: boolean
  arrows?: boolean
} & JSX.IntrinsicElements['div']

export const Carousel: FC<CarouselProps> = ({
  children,
  className,
  slideClassName,
  config,
  dots = true,
  arrows = false
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [viewportRef, embla] = useEmblaCarousel({
    align: 'center',
    ...config
  })

  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  )

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
  }, [embla, setSelectedIndex])

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  useEffect(() => {
    if (!embla) return
    onSelect()
    setScrollSnaps(embla.scrollSnapList())
    embla.on('select', onSelect)
  }, [embla, setScrollSnaps, onSelect])

  const slides = Array.isArray(children) ? children : [children]

  return (
    <>
      <div className={clsx(s['embla'], className)}>
        <div className={s['embla__viewport']} ref={viewportRef}>
          <div className={s['embla__container']}>
            {slides.map((child, idx) => (
              <div
                className={clsx(s['embla__slide'], slideClassName)}
                key={idx}
              >
                <div className={s['embla__slide__inner']}>{child}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {dots && (
        <div className={s['embla__dots']}>
          {scrollSnaps.map((_, index) => (
            <button
              className={clsx(s['embla__dot'], {
                [s['is-selected']]: index === selectedIndex
              })}
              type="button"
              onClick={() => scrollTo(index)}
              key={index}
            />
          ))}
        </div>
      )}
      {arrows && (
        <div className={s['arrows-container']}>
          <button
            onClick={() => scrollPrev()}
            className="embla__button embla__button--prev"
          >
            <Image src={arrowPrev} />
          </button>

          <button
            onClick={() => scrollNext()}
            className="embla__button embla__button--next"
          >
            <Image src={arrowNext} />
          </button>
        </div>
      )}
    </>
  )
}

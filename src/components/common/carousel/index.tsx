import clsx from 'clsx'
import useEmblaCarousel, { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel-react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'

import s from './carousel.module.scss'

type CarouselProps = {
  config?: EmblaOptionsType
  slideClassName?: string
  viewportClassname?: string
  containerClassname?: string
  dots?: boolean
  arrows?: boolean
} & JSX.IntrinsicElements['div']

export const Carousel = forwardRef<EmblaCarouselType | undefined, CarouselProps>(
  (
    {
      children,
      className,
      slideClassName,
      viewportClassname,
      containerClassname,
      config,
      dots = true,
      arrows = false
    },
    ref
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
    const [viewportRef, embla] = useEmblaCarousel({
      align: 'center',
      ...config
    })

    const scrollTo = useCallback((index: number) => embla && embla.scrollTo(index), [embla])

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

      return () => {
        embla.off('select', onSelect)
      }
    }, [embla, setScrollSnaps, onSelect])

    useImperativeHandle(ref, () => embla, [embla])

    const slides = Array.isArray(children) ? children : [children]

    return (
      <>
        <div className={clsx(s['embla'], className)}>
          <div className={clsx(s['embla__viewport'], viewportClassname)} ref={viewportRef}>
            <ul className={clsx(s['embla__container'], containerClassname)}>
              {slides.map((child, idx) => (
                <li className={clsx(s['embla__slide'], slideClassName)} key={idx}>
                  <div className={s['embla__slide__inner']}>{child}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {dots && (
          <div className={s['embla__dots']}>
            {scrollSnaps.map((_, index) => (
              <button
                className={clsx(s['embla__dot'], {
                  [s['is-selected'] as string]: index === selectedIndex,
                  [s['scaled-90'] as string]:
                    index === selectedIndex + 3 || index === selectedIndex - 3,
                  [s['scaled-80'] as string]:
                    index === selectedIndex + 4 || index === selectedIndex - 4,
                  [s['scaled-70'] as string]:
                    index === selectedIndex + 5 || index === selectedIndex - 5,
                  [s['scaled-60'] as string]:
                    index === selectedIndex + 6 || index === selectedIndex - 6,
                  [s['scaled-50'] as string]:
                    index >= selectedIndex + 7 || index <= selectedIndex - 7
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
              aria-label="previous slide"
              onClick={() => scrollPrev()}
              className="embla__button embla__button--prev"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.25 12.75H21V11.25H20.25V12.75ZM3.75 11.25C3.33579 11.25 3 11.5858 3 12C3 12.4142 3.33579 12.75 3.75 12.75V11.25ZM20.25 11.25H3.75V12.75H20.25V11.25Z" />
                <path
                  d="M10.5 5.25L3.75 12L10.5 18.75"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              aria-label="next slide"
              onClick={() => scrollNext()}
              className="embla__button embla__button--next"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.75 11.25H3V12.75H3.75V11.25ZM20.25 12.75C20.6642 12.75 21 12.4142 21 12C21 11.5858 20.6642 11.25 20.25 11.25V12.75ZM3.75 12.75H20.25V11.25H3.75V12.75Z" />
                <path
                  d="M13.5 5.25L20.25 12L13.5 18.75"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </>
    )
  }
)

Carousel.displayName = 'Carousel'

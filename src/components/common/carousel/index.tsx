import clsx from 'clsx'
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType
} from 'embla-carousel-react'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'

import s from './carousel.module.scss'

type CarouselProps = {
  config?: EmblaOptionsType
  slideClassName?: string
  dots?: boolean
} & JSX.IntrinsicElements['div']

export const Carousel = forwardRef<
  EmblaCarouselType | undefined,
  CarouselProps
>(({ children, className, slideClassName, config, dots = true }, ref) => {
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

  useEffect(() => {
    if (!embla) return
    onSelect()
    setScrollSnaps(embla.scrollSnapList())
    embla.on('select', onSelect)
  }, [embla, setScrollSnaps, onSelect])

  useImperativeHandle(ref, () => embla, [embla])

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
    </>
  )
})

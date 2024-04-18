'use client'

import Image from 'next/image'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { RichText } from 'basehub/react-rich-text'
// import vamsi from '~/images/vamsi.jpeg'
import styles from './Carousel.module.css'
import { clsx } from 'clsx'
import { gsap } from '~/lib/gsap'
import { CSSProperties, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useMinTabletBreakpoint, useMinTabletLgBreakpoint } from '~/hooks/use-media'

// const images = { vamsi }

const ANIM_DURATION = 900
const colorMap = ['bg-accent', 'bg-blue', 'bg-red']

export function Carrousel({
  testimonials
}: {
  testimonials: LandingPageFragment['hero']['testimonials']['items']
}) {
  const isLgTablet = useMinTabletLgBreakpoint()
  const [activeCard, setActiveCard] = useState(0)
  const _testimonials = colorMap
  const testimonial = testimonials[0].testimonial

  const handleCardState = useCallback(
    (idx: number) => {
      if (activeCard === idx) return 'enter'
      if (idx === activeCard + 1 || (activeCard === _testimonials.length - 1 && idx === 0))
        return 'next'
      return 'exit'
    },
    [activeCard, _testimonials.length]
  )

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => {
        if (prev === _testimonials.length - 1) return 0
        return prev + 1
      })
    }, ANIM_DURATION * 5)

    return () => clearInterval(interval)
  }, [_testimonials.length, activeCard])

  return (
    <div className="relative flex w-full lg:block lg:w-auto">
      <div className="h-[260px] w-[calc(100%-16px)] lg:h-[416px] lg:w-[416px]">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Card key={idx} state={handleCardState(idx)} data={testimonial} mobile={!isLgTablet} />
        ))}
      </div>
      <div className="absolute -right-1 top-1/2 flex w-2 -translate-y-1/2 translate-x-full animate-fadeIn flex-col gap-y-[7px] lg:-right-2">
        {Array.from({ length: 3 }).map((_, idx) => (
          <button
            key={idx}
            style={{ transitionDuration: `${ANIM_DURATION}ms` }}
            className={clsx(
              'h-[8px] w-full overflow-hidden rounded-[30px] bg-[#F3DDE3] transition-all lg:h-[30px]',
              {
                '!h-[14px] bg-accent': idx === activeCard && !isLgTablet
              }
            )}
            onClick={() => {
              setActiveCard(idx)
            }}
            aria-label={`Select testimonial ${idx + 1}/${_testimonials.length}`}
          >
            <span
              style={
                {
                  '--animation-entrance-duration': `${ANIM_DURATION * 4.5}ms`,
                  '--animation-exit-duration': `${ANIM_DURATION}ms`
                } as CSSProperties
              }
              className={clsx(
                `hidden h-full w-full transition-transform ease-linear lg:inline-block`,
                {
                  [styles['animate-pill-exit']]: idx !== activeCard,
                  [clsx(styles['animate-pill-entrance'], 'bg-accent')]: idx === activeCard
                }
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  state: 'enter' | 'next' | 'exit' | 'idle'
  data: LandingPageFragment['hero']['testimonials']['items'][0]['testimonial']
  mobile?: boolean
}

const Card: React.FC<CardProps> = ({ className, state, data, mobile, ...rest }) => {
  const firstRender = useRef(true)
  const cardRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current

    if (firstRender.current && state === 'exit') {
      card.classList.add('invisible')
    }

    const tlEnter = gsap.timeline({
      paused: true,
      ease: 'power3.inOut"',
      onStart: () => {
        card.classList.add('z-[2]')
      }
    })
    const tlNext = gsap.timeline({
      paused: true
    })
    const tlExit = gsap.timeline({
      paused: true,
      ease: 'power3.out'
    })

    const nextStateStyles = {
      scale: mobile ? 0.95 : 0.7,
      x: mobile ? '0%' : '35%',
      y: mobile ? '20%' : '-35%'
    }
    const filterNextStateStyle = `${mobile ? 'blur(0px)' : 'blur(6px)'} drop-shadow(0px 10px 60px rgba(204, 204, 204, 0.1))`
    const enterStateStyles = {
      scale: 1,
      x: '0%',
      y: '0%'
    }
    const filterEnterStateStyle = 'blur(0px) drop-shadow(0px 10px 60px rgba(204, 204, 204, 0.42))'

    tlEnter.fromTo(
      card,
      {
        ...nextStateStyles
      },
      {
        ...enterStateStyles,
        duration: (ANIM_DURATION / 1000) * 0.75
      }
    )
    tlEnter.fromTo(
      card,
      {
        filter: filterNextStateStyle
      },
      {
        filter: filterEnterStateStyle,
        duration: (ANIM_DURATION / 1000) * 0.7
      },
      '<'
    )

    tlNext.set(card, {
      ...nextStateStyles,
      filter: filterNextStateStyle,
      duration: ANIM_DURATION / 1000
    })

    tlExit.fromTo(
      card,
      {
        ...enterStateStyles,
        filter: filterEnterStateStyle,
        opacity: 1
      },
      {
        y: mobile ? 0 : '700px',
        x: mobile ? '-400px' : '0%',
        filter: filterEnterStateStyle,
        scale: 1,
        opacity: 0,
        duration: ANIM_DURATION / 1000 / 2
      }
    )

    switch (state) {
      case 'enter':
        tlEnter.play()
        break
      case 'next':
        tlNext.play()
        break
      case 'exit':
        tlExit.play()
        break
    }

    firstRender.current = false

    return () => {
      tlEnter.revert()
      tlNext.revert()
      tlExit.revert()
    }
  }, [state, mobile])

  return (
    <div
      ref={cardRef}
      className={clsx(
        `absolute flex h-[250px] w-full items-center justify-center rounded-3xl border-2 border-solid border-white bg-white/80 shadow-[-9px_-9px_463px_0_rgba(255,255,255,0.02)_inset] backdrop-blur-[50px] lg:h-[406px] lg:w-[347px]`,
        { ['scale-1 opacity-1 z-[2]']: state === 'enter' },
        {
          ['opacity-1 translate-y-[20%] scale-[0.95] lg:-translate-y-[35%] lg:translate-x-[35%] lg:scale-[0.7] lg:!blur-[6px]']:
            state === 'next'
        },
        { ['z-[3] opacity-0 lg:z-0']: state === 'exit' },
        className
      )}
      style={{
        filter: 'blur(0px) drop-shadow(0px 10px 60px rgba(204, 204, 204, 0.42))',
        background:
          'radial-gradient(126.81% 153.8% at -12.62% -6.53%, #FFF 0%, #FDFDFD 0%, #F2F2F2 44.78%, #F8F8F8 72.47%, #F5F5F5 100%)'
      }}
      {...rest}
    >
      <div className="relative flex h-full w-full max-w-4xl flex-col py-5 lg:py-8">
        <blockquote
          className={`relative pl-3.5 pr-[18px] pt-5 text-base font-normal italic leading-[1.3] text-[#575757] lg:pl-6 lg:pt-10 lg:text-lg`}
        >
          <span className="absolute left-2 top-0 h-[33px] text-[56px] font-bold leading-[0.8] text-accent lg:text-[100px]">
            “
          </span>
          <RichText>{data.quote.json.content}</RichText>
        </blockquote>
        <figcaption className="mt-auto border-t border-gray-100 pl-3.5 lg:pl-6">
          <p className="text-base font-semibold text-gray-900">{data.name}</p>
          <p className="text-base leading-[1.2] text-gray-500">{data.title}</p>
        </figcaption>
      </div>
    </div>
  )
}

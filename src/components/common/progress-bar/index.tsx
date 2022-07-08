import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react'

import s from './progress-bar.module.scss'

type ProgressProps = {
  progress: number
  direction?: 'horizontal' | 'vertical'
  thumbless?: boolean
  primaryColor?: string
  secondaryColor?: string
  markers?: { position: number }[]
  /*
    If progress bar is animated we use
    gsap.timeline if not, just use gsap.set
  */
  animated?: boolean
}

export const UPDATE_INTERVAL_MS = 200
export const UPDATE_INTERVAL_SEC = UPDATE_INTERVAL_MS / 1000

export const ProgressBar = forwardRef<
  { update: (progress: number) => void },
  ProgressProps
>(
  (
    {
      primaryColor,
      secondaryColor,
      progress,
      direction = 'horizontal',
      markers,
      animated = true
    },
    ref
  ) => {
    const barRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const timeline = useRef<GSAPTimeline | GSAP>(
      animated ? gsap.timeline() : gsap
    )
    const prevProgress = useRef(progress)

    const update = useCallback(
      (progress) => {
        const duration = UPDATE_INTERVAL_SEC
        const gsapFunc =
          progress < prevProgress.current || !animated ? 'set' : 'to'

        if (direction === 'horizontal') {
          if (progressRef.current) {
            timeline.current[gsapFunc](progressRef.current, {
              '--left': `${progress}%`,
              ease: 'linear',
              duration
            })
          }
        } else {
          if (progressRef.current) {
            timeline.current[gsapFunc](progressRef.current, {
              '--top': `${progress}%`,
              ease: 'linear',
              duration
            })
          }
        }

        prevProgress.current = progress
      },
      [direction, animated]
    )

    useImperativeHandle(ref, () => ({ update }))

    useEffect(() => {
      update(progress)
    }, [update, progress])

    return (
      <div
        style={{
          // @ts-ignore
          '--color-primary': primaryColor,
          '--color-secondary': secondaryColor
        }}
        className={clsx(s['progress-bar'], {
          [s['vertical']]: direction === 'vertical',
          [s['horizontal']]: direction === 'horizontal'
        })}
        ref={barRef}
      >
        <div className={s['progress']} ref={progressRef}>
          <div className={s['progress-gradient']} />
        </div>
        {markers?.map(({ position }) => (
          <ProgressThumb
            color={primaryColor}
            style={{
              [`--${direction === 'horizontal' ? 'left' : 'top'}`]:
                position + '%',
              //@ts-ignore
              '--translate-y': '0.5',
              '--translate-x': '0.5'
            }}
            className={s['marker']}
            key={position}
          />
        ))}
      </div>
    )
  }
)

type ProgressThumbProp = {
  size?: number
  color?: string
} & JSX.IntrinsicElements['span']

export const ProgressThumb = forwardRef<HTMLSpanElement, ProgressThumbProp>(
  ({ size = 18, className, style, color, ...props }, ref) => (
    <span
      // @ts-ignore
      style={{ '--color-primary': color, ...style }}
      className={clsx(s['marker'], className)}
      {...props}
      ref={ref}
    >
      <span
        className={s['marker-thumb']}
        /* @ts-ignore */
        style={{ '--size': size + 'px' }}
      />
    </span>
  )
)

import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import { FC, forwardRef, useCallback, useEffect, useRef } from 'react'

import s from './progress-bar.module.scss'

type ProgressProps = {
  progress: number
  direction?: 'horizontal' | 'vertical'
  thumbless?: boolean
  primaryColor?: string
  secondaryColor?: string
  /*
    If progress bar is animated we use
    gsap.timeline if not, just use gsap.set
  */
  animated?: boolean
}

export const UPDATE_INTERVAL_MS = 200
export const UPDATE_INTERVAL_SEC = UPDATE_INTERVAL_MS / 1000

export const ProgressBar: FC<ProgressProps> = ({
  primaryColor,
  secondaryColor,
  progress,
  direction = 'horizontal',
  animated = true,
  thumbless = false
}) => {
  const barRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLSpanElement>(null)
  const timeline = useRef<GSAPTimeline | GSAP>(
    animated ? gsap.timeline() : gsap
  )
  const prevProgress = useRef(progress)

  const update = useCallback(
    (progress) => {
      const normalized = progress / 100
      const duration = UPDATE_INTERVAL_SEC
      const gsapFunc =
        progress < prevProgress.current || !animated ? 'set' : 'to'

      if (direction === 'horizontal') {
        if (markerRef.current) {
          timeline.current[gsapFunc](markerRef.current, {
            '--left': `${progress}%`,
            '--translate-y': '0.5',
            '--translate-x': `${normalized}`,
            ease: 'linear',
            duration
          })
        }

        if (progressRef.current) {
          timeline.current[gsapFunc](progressRef.current, {
            '--left': `${progress}%`,
            ease: 'linear',
            duration
          })
        }
      } else {
        if (markerRef.current) {
          timeline.current[gsapFunc](markerRef.current, {
            '--top': `${progress}%`,
            '--translate-x': '0.5',
            '--translate-y': `${normalized}`,
            ease: 'linear',
            duration
          })
        }

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
      {!thumbless && (
        <ProgressThumb
          color={primaryColor}
          className={s['marker']}
          ref={markerRef}
        />
      )}
    </div>
  )
}

type ProgressThumbProp = {
  size?: number
  color?: string
} & JSX.IntrinsicElements['span']

export const ProgressThumb = forwardRef<HTMLSpanElement, ProgressThumbProp>(
  ({ size = 18, className, color, ...props }, ref) => (
    <span
      // @ts-ignore
      style={{ '--color-primary': color }}
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

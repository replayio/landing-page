import clsx from 'clsx'
import { FC, forwardRef, useCallback, useEffect, useRef } from 'react'

import s from './progress-bar.module.scss'

type ProgressProps = {
  progress: number
  direction?: 'horizontal' | 'vertical'
  thumbless?: boolean
}

export const ProgressBar: FC<ProgressProps> = ({
  progress,
  direction = 'horizontal',
  thumbless = false
}) => {
  const barRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLSpanElement>(null)

  const update = useCallback(
    (progress) => {
      const normalized = progress / 100

      if (direction === 'horizontal') {
        if (markerRef.current) {
          markerRef.current.style.setProperty('--left', `${progress}%`)
          markerRef.current.style.setProperty('--translate-y', '0.5')
          markerRef.current.style.setProperty('--translate-x', `${normalized}`)
        }

        if (progressRef.current) {
          progressRef.current.style.setProperty('--left', `${progress}%`)
        }
      } else {
        if (markerRef.current) {
          markerRef.current.style.setProperty('--top', `${progress}%`)
          markerRef.current.style.setProperty('--translate-x', '0.5')
          markerRef.current.style.setProperty('--translate-y', `${normalized}`)
        }

        if (progressRef.current) {
          progressRef.current.style.setProperty('--top', `${progress}%`)
        }
      }
    },
    [direction]
  )

  useEffect(() => {
    update(progress)
  }, [update, progress])

  return (
    <div
      className={clsx(s['progress-bar'], {
        [s['vertical']]: direction === 'vertical',
        [s['horizontal']]: direction === 'horizontal'
      })}
      ref={barRef}
    >
      <div className={s['progress']} ref={progressRef}>
        <div className={s['progress-gradient']} />
      </div>
      {!thumbless && <ProgressThumb className={s['marker']} ref={markerRef} />}
    </div>
  )
}

type ProgressThumbProp = {
  size?: number
} & JSX.IntrinsicElements['span']

export const ProgressThumb = forwardRef<HTMLSpanElement, ProgressThumbProp>(
  ({ size = 18, className, ...props }, ref) => (
    <span className={clsx(s['marker'], className)} {...props} ref={ref}>
      <span
        className={s['marker-thumb']}
        /* @ts-ignore */
        style={{ '--size': size + 'px' }}
      />
    </span>
  )
)

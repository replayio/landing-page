import { FC, forwardRef, useCallback, useEffect, useRef } from 'react'

import s from './progress-bar.module.scss'

type ProgressProps = {
  progress: number
}

export const ProgressBar: FC<ProgressProps> = ({ progress }) => {
  const barRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLSpanElement>(null)

  const getTopValue = useCallback((progress: number) => {
    if (!barRef.current) return 0

    const { offsetHeight } = barRef.current

    return (offsetHeight * progress) / 100
  }, [])

  const update = useCallback(
    (progress) => {
      if (!markerRef.current || !progressRef.current) return

      const normalized = progress / 100
      const top = getTopValue(progress)

      markerRef.current.style.setProperty('--top', `${top}px`)
      markerRef.current.style.setProperty('--translate-y', `${normalized}`)
      progressRef.current.style.setProperty('--top', `${top}px`)
    },
    [getTopValue]
  )

  useEffect(() => {
    update(progress)
  }, [update, progress])

  return (
    <div className={s['progress-bar']} ref={barRef}>
      <div className={s['progress']} ref={progressRef}>
        <div className={s['progress-gradient']} />
      </div>
      <ProgressThumb ref={markerRef} />
    </div>
  )
}

type ProgressThumbProp = {
  size?: number
}

export const ProgressThumb = forwardRef<HTMLSpanElement, ProgressThumbProp>(
  ({ size = 18 }, ref) => (
    <span className={s['marker']} ref={ref}>
      <span
        className={s['marker-thumb']}
        /* @ts-ignore */
        style={{ '--width': size + 'px', '--size': size + 'px' }}
      />
    </span>
  )
)

import { FC, useCallback, useEffect, useRef } from 'react'

import s from './progress-bar.module.scss'

type ProgressProps = {
  progress: number
}

export const ProgressBar: FC<ProgressProps> = ({ progress }) => {
  const barRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLSpanElement>(null)

  const getTopValue = useCallback((progress: number) => {
    if (!barRef.current) return 0

    const { offsetHeight } = barRef.current

    return (offsetHeight * progress) / 100
  }, [])

  const update = useCallback(
    (progress) => {
      if (!markerRef.current) return

      const top = getTopValue(progress)

      markerRef.current.style.setProperty('--top', `${top}px`)
    },
    [getTopValue]
  )

  useEffect(() => {
    update(progress)
  }, [update, progress])

  return (
    <div className={s['progress-bar']} ref={barRef}>
      <div className={s['progress']} />
      <span className={s['marker']} ref={markerRef}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="16" fill="#F41C52" fillOpacity="0.2" />
          <circle cx="16" cy="16" r="9" fill="#F41C52" />
        </svg>
      </span>
    </div>
  )
}

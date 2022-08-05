import { gsap } from 'lib/gsap'
import clamp from 'lodash/clamp'
import { useMemo, useRef } from 'react'

import { msToSecs, secsToMs } from '~/lib/utils'

export type UseGsapTimeArgs = {
  onUpdate?: (progress: {
    time: number
    percentage: number
    normalizedTime: number
  }) => void
  onStart?: () => void
  onComplete?: () => void
  duration: number
  loop?: boolean
}

export type UseGsapTimeAPI = {
  start: () => void
  pause: () => void
  resume: () => void
  restart: () => void
  reset: () => void
  seek: (percentage: number) => void
}

export const useGsapTime = ({
  onStart,
  onUpdate,
  onComplete,
  loop = false,
  duration
}: UseGsapTimeArgs): UseGsapTimeAPI => {
  const startTime = useRef<number | undefined>()

  const api = useMemo(() => {
    const update = () => {
      if (!startTime.current) return

      const currentTime = new Date().getTime()
      const timeDiff = currentTime - startTime.current
      const clampedTimeDiff = clamp(timeDiff, 0, secsToMs(duration))

      const timePassed = msToSecs(clampedTimeDiff)
      const percentage = (timePassed / duration) * 100

      onUpdate?.({
        time: timePassed,
        percentage,
        normalizedTime: timePassed / duration
      })

      if (percentage === 100) {
        onComplete?.()

        if (loop) {
          api.restart()
        } else {
          api.pause()
        }
      }
    }

    const api: UseGsapTimeAPI = {
      start: () => {
        startTime.current = new Date().getTime()

        onStart?.()
        update()

        gsap.ticker.add(update)
      },
      pause: () => {
        gsap.ticker.remove(update)
      },
      resume: () => {
        gsap.ticker.add(update)
      },
      restart: () => {
        api.pause()
        api.start()
      },
      reset: () => {
        api.pause()
        startTime.current = new Date().getTime()
        update()
      },
      seek: (percentage) => {
        if (!startTime.current) return

        const nextDuration = secsToMs((percentage / 100) * duration)

        const currentTime = new Date().getTime()
        const currentTimeDiff = currentTime - startTime.current

        const nextDiff = nextDuration - currentTimeDiff

        startTime.current = startTime.current - nextDiff
      }
    }

    return api
  }, [duration, loop, onComplete, onUpdate, onStart])

  return api
}

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
  const currentPauseTime = useRef<number | undefined>()
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

    const shiftStartTime = (targetTime: number) => {
      if (!startTime.current) return

      const currentTime = new Date().getTime()
      const currentTimeDiff = currentTime - startTime.current

      const nextDiff = targetTime - currentTimeDiff

      startTime.current = startTime.current - nextDiff
    }

    const api: UseGsapTimeAPI = {
      start: () => {
        startTime.current = new Date().getTime()
        currentPauseTime.current = undefined

        onStart?.()
        update()

        gsap.ticker.add(update)
      },
      pause: () => {
        if (!currentPauseTime.current) {
          currentPauseTime.current = new Date().getTime()
        }

        gsap.ticker.remove(update)
      },
      resume: () => {
        if (currentPauseTime.current && startTime.current) {
          shiftStartTime(currentPauseTime.current - startTime.current)
          currentPauseTime.current = undefined
        }

        gsap.ticker.add(update)
      },
      restart: () => {
        api.pause()
        api.start()
      },
      reset: () => {
        api.pause()

        currentPauseTime.current = undefined
        startTime.current = new Date().getTime()

        update()
      },
      seek: (percentage) => {
        if (!startTime.current) return

        currentPauseTime.current = undefined

        const nextDuration = secsToMs((percentage / 100) * duration)

        shiftStartTime(nextDuration)
        update()
      }
    }

    return api
  }, [duration, loop, onComplete, onUpdate, onStart])

  return api
}

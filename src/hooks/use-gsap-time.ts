import { gsap } from 'lib/gsap'
import clamp from 'lodash/clamp'
import { useMemo, useRef } from 'react'

import { msToSecs, secsToMs } from '~/lib/utils'

type UseTimeArgs = {
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

export const useGsapTime = ({
  onStart,
  onUpdate,
  onComplete,
  loop = false,
  duration
}: UseTimeArgs) => {
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

    const api = {
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
      }
    }

    return api
  }, [duration, loop, onComplete, onUpdate, onStart])

  return api
}

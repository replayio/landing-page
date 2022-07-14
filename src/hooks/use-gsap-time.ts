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
  onComplete?: () => void
  duration: number
  loop?: boolean
}

export const useGsapTime = ({
  onUpdate,
  onComplete,
  loop = false,
  duration
}: UseTimeArgs) => {
  const startTime = useRef<Date | undefined>()

  const api = useMemo(() => {
    const update = () => {
      const currentTime = new Date()
      const timeDiff = currentTime.getTime() - startTime.current!.getTime()
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
        }
      }
    }

    const api = {
      start: () => {
        startTime.current = new Date()

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
  }, [duration, loop, onComplete, onUpdate])

  return api
}

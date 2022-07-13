import clamp from 'lodash/clamp'
import { useMemo, useRef } from 'react'

import { msToSecs, secsToMs } from '~/lib/utils'

type UseTimeArgs = {
  onUpdate?: (progress: { time: number; percentage: number }) => void
  onComplete?: () => void
  duration: number
  loop?: boolean
}

export const INTERVAL_MS = 1000

export const useTime = ({
  onUpdate,
  onComplete,
  loop = false,
  duration
}: UseTimeArgs) => {
  const intervalId = useRef<NodeJS.Timer | undefined>()
  const startTime = useRef<Date | undefined>()

  const api = useMemo(() => {
    const update = () => {
      const currentTime = new Date()
      const timeDiff = currentTime.getTime() - startTime.current!.getTime()
      const clampedTimeDiff = clamp(timeDiff, 0, secsToMs(duration))

      const timePassed = msToSecs(clampedTimeDiff)
      const percentage = (timePassed / duration) * 100

      console.log({ timeDiff, clampedTimeDiff, timePassed, percentage })

      onUpdate?.({
        time: timePassed,
        percentage
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

        intervalId.current = setInterval(update, INTERVAL_MS)
      },
      pause: () => {
        if (intervalId.current) {
          clearInterval(intervalId.current)
          intervalId.current = undefined
        }
      },
      resume: () => {
        intervalId.current = setInterval(update, INTERVAL_MS)
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

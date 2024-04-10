import { gsap } from '~/lib/gsap'
import clamp from 'lodash/clamp'
import { useMemo, useRef } from 'react'

import { msToSecs, secsToMs } from '~/lib/utils'

export type UseGsapTimeArgs = {
  onUpdate?: (progress: { time: number; percentage: number; normalizedTime: number }) => void
  onStart?: () => void
  onComplete?: () => void
  onInterrupt?: () => void
  duration: number
  loop?: boolean
}

export type UseGsapTimeAPI = {
  start: () => void
  /*
    The interrupt flag checks if the timeline has been interrupted
    before ending. If so, it will call the onInterrupt callback, it depends on what you need to do 
    when the timeline is interrupted. If you don't need to do anything, you can ignore it.
  */
  pause: (checkInterrupt?: boolean) => void
  resume: () => void
  restart: () => void
  reset: () => void
  seek: (percentage: number) => void
}

export const useGsapTime = ({
  onStart,
  onUpdate,
  onComplete,
  onInterrupt,
  loop = false,
  duration
}: UseGsapTimeArgs): UseGsapTimeAPI => {
  const currentPauseTime = useRef<number | undefined>()
  const startTime = useRef<number | undefined>()

  // Keep the referece to the callbacks on a ref to avoid re-renders
  const onStartRef = useRef(onStart)
  const onUpdateRef = useRef(onUpdate)
  const onCompleteRef = useRef(onComplete)
  const onInterruptRef = useRef(onInterrupt)

  onStartRef.current = onStart
  onUpdateRef.current = onUpdate
  onCompleteRef.current = onComplete
  onInterruptRef.current = onInterrupt

  const api = useMemo(() => {
    const update = () => {
      if (!startTime.current) return

      const currentTime = new Date().getTime()
      const timeDiff = currentTime - startTime.current
      const clampedTimeDiff = clamp(timeDiff, 0, secsToMs(duration))

      const timePassed = msToSecs(clampedTimeDiff)
      const percentage = (timePassed / duration) * 100

      onUpdateRef.current?.({
        time: timePassed,
        percentage,
        normalizedTime: timePassed / duration
      })

      if (percentage === 100) {
        onCompleteRef.current?.()

        if (loop) {
          api.restart()
        } else {
          stopUpdate()
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

    // Check if the animation was interrupted before ending
    const checkInterrupt = () => {
      if (!startTime.current) return

      const currentTime = new Date().getTime()
      const timeDiff = currentTime - startTime.current

      if (timeDiff < secsToMs(duration)) {
        onInterruptRef.current?.()
      }
    }

    const stopUpdate = () => {
      gsap.ticker.remove(update)
    }

    const api: UseGsapTimeAPI = {
      start: () => {
        startTime.current = new Date().getTime()
        currentPauseTime.current = undefined

        onStartRef.current?.()
        update()

        gsap.ticker.add(update)
      },
      pause: (_checkInterrupt = false) => {
        if (!currentPauseTime.current) {
          currentPauseTime.current = new Date().getTime()
        }

        if (checkInterrupt) {
          checkInterrupt()
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
      // It goes back to the start of the animation and starts it again
      restart: () => {
        stopUpdate()

        checkInterrupt()

        api.start()
      },
      // It goes back to the start of the animation but keeps paused
      reset: () => {
        stopUpdate()

        checkInterrupt()

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
  }, [duration, loop])

  return api
}

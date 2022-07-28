import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import { clamp } from 'lodash'
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react'

import { useGsapTime } from '~/hooks/use-gsap-time'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'
import { useViewportSize } from '~/hooks/use-viewport-size'
import { isClient } from '~/lib/constants'
import { msToSecs } from '~/lib/utils'

import s from './progress-bar.module.scss'

type Marker = {
  /* 
    If number it is the percentage position,
    if string it is the id of the element to track
  */
  position: number | string
  onActive?: () => void
  onInactive?: () => void
}

type ProgressProps = {
  progress?: number
  direction?: 'horizontal' | 'vertical'
  primaryColor?: string
  secondaryColor?: string
  onMarkerUpdate?: (last: Marker, all: Marker[]) => void
  markers?: Marker[]
  markerSize?: number
  markerVisible?: boolean
  /*
    If progress bar is animated we use
    gsap.timeline if not, just use gsap.set
  */
  animated?: boolean
  debug?: boolean
}

export type ProgressAPI = { update: (progress: number) => void }

export const ANIMATION_UPDATE_INTERVAL_MS = 1000
export const ANIMATION_UPDATE_INTERVAL_SEC = msToSecs(
  ANIMATION_UPDATE_INTERVAL_MS
)

const getElmCoordById = (id: string, axes: 'x' | 'y') => {
  if (!isClient) return 0

  const elm = document.getElementById(id)

  if (!elm) {
    throw new Error(`Element with id ${id} not found`)
  }

  const bounds = elm.getBoundingClientRect()

  return bounds[axes === 'x' ? 'left' : 'top']
}

export const ProgressBar = forwardRef<ProgressAPI, ProgressProps>(
  (
    {
      primaryColor,
      secondaryColor,
      progress,
      markers,
      markerSize,
      markerVisible = true,
      onMarkerUpdate,
      direction = 'horizontal',
      animated = true
    },
    ref
  ) => {
    const [lastActiveMarker, setLastActiveMarker] = useState<
      Marker | undefined
    >(undefined)
    const barRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const prevProgress = useRef(progress || 0)
    const timeline = useRef<GSAPTimeline | GSAP>(
      animated ? gsap.timeline({ autoRemoveChildren: true }) : gsap
    )
    const { width } = useViewportSize()

    const [internalMarkers, setInternalMarkers] = useState<
      (Marker & { position: number; normalizedPosition: number })[]
    >([])

    const orderedMarkers = useMemo(
      () => internalMarkers?.sort((a, b) => b.position - a.position),
      [internalMarkers]
    )

    const update = useCallback(
      (progress) => {
        const duration = ANIMATION_UPDATE_INTERVAL_SEC
        const gsapFunc =
          progress < prevProgress.current || !animated ? 'set' : 'to'

        if (orderedMarkers?.some(({ position }) => position <= progress)) {
          const firstCoincidence = orderedMarkers.find(
            ({ position }) => position <= progress
          )

          if (firstCoincidence) {
            setLastActiveMarker((prevValue) => {
              if (prevValue?.position !== firstCoincidence?.position) {
                onMarkerUpdate?.(
                  firstCoincidence,
                  orderedMarkers?.filter(
                    ({ position }) => position <= progress
                  ) || []
                )

                prevValue?.onInactive?.()
                firstCoincidence.onActive?.()
              }

              return firstCoincidence
            })
          }
        } else {
          setLastActiveMarker((prevValue) => {
            prevValue?.onInactive?.()

            return undefined
          })
        }

        if (direction === 'horizontal') {
          if (progressRef.current) {
            timeline.current[gsapFunc](progressRef.current, {
              '--left': `${progress}%`,
              ease: 'linear',
              duration
            })
          }
        } else {
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
      [direction, onMarkerUpdate, animated, orderedMarkers]
    )

    useImperativeHandle(ref, () => ({ update, elm: barRef.current }), [update])

    useEffect(() => {
      if (!barRef.current) return

      const { left, width, top, height } =
        barRef.current.getBoundingClientRect()

      const newMarkers = markers?.map((marker) => {
        let position

        if (typeof marker.position === 'string') {
          const barCoord = direction === 'horizontal' ? left : top
          const barSize = direction === 'horizontal' ? width : height
          const markerElmCoord = getElmCoordById(
            marker.position,
            direction === 'horizontal' ? 'x' : 'y'
          )

          position =
            (clamp(markerElmCoord - barCoord, 0, barSize) / barSize) * 100
        } else {
          position = marker.position
        }

        return {
          ...marker,
          normalizedPosition: position / 100,
          position
        }
      })

      setInternalMarkers(newMarkers || [])
    }, [markers, direction, width])

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
        {markerVisible &&
          internalMarkers?.map(({ position, normalizedPosition }, idx) => {
            const isOnEnds = position === 0 || position === 100

            return (
              <ProgressThumb
                size={markerSize}
                color={primaryColor}
                active={
                  lastActiveMarker !== undefined &&
                  position <= lastActiveMarker.position
                }
                style={{
                  [`--${direction === 'horizontal' ? 'left' : 'top'}`]:
                    position + '%',
                  //@ts-ignore
                  '--translate-y':
                    direction === 'vertical' && isOnEnds
                      ? normalizedPosition
                      : '0.5',
                  '--translate-x':
                    direction === 'horizontal' && isOnEnds
                      ? normalizedPosition
                      : '0.5'
                }}
                className={s['marker']}
                key={`${position}-${idx}`}
              />
            )
          })}
      </div>
    )
  }
)

type ProgressThumbProp = {
  size?: number
  color?: string
  active?: boolean
} & JSX.IntrinsicElements['span']

export const ProgressThumb = forwardRef<HTMLSpanElement, ProgressThumbProp>(
  ({ size = 18, active = false, className, style, color, ...props }, ref) => (
    <span
      // @ts-ignore
      style={{ '--color-primary': color, ...style }}
      className={clsx(
        s['marker'],
        s['animated'],
        {
          [s['active']]: active
        },
        className
      )}
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

type TimelineProps = {
  duration: number
  onComplete?: () => void
  loop?: boolean
  paused?: boolean
} & ProgressProps

export const Timeline = memo(
  ({
    paused = false,
    duration,
    onComplete,
    loop = true,
    ...rest
  }: TimelineProps) => {
    const [ref, { inView }] = useIntersectionObserver({ triggerOnce: false })
    const progressRef = useRef<ProgressAPI>(null)

    const time = useGsapTime({
      duration,
      onUpdate: (progress) => {
        progressRef.current?.update(progress.percentage)
      },
      onComplete,
      loop
    })

    useEffect(() => {
      if (inView && !paused) {
        time.start()
      } else {
        time.pause()
      }

      return time.pause
    }, [time, inView, paused])

    return (
      <div ref={ref}>
        <ProgressBar animated={false} {...rest} ref={progressRef} />
      </div>
    )
  }
)

import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import clamp from 'lodash/clamp'
import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

import {
  useGsapTime,
  UseGsapTimeAPI,
  UseGsapTimeArgs
} from '~/hooks/use-gsap-time'
import { useViewportSize } from '~/hooks/use-viewport-size'
import { isClient } from '~/lib/constants'
import { msToSecs } from '~/lib/utils'

import s from './progress-bar.module.scss'

export type Marker = JSX.IntrinsicElements['span'] & {
  /* 
    If number it is the percentage position,
    if string it is the id of the element to track
  */
  position: number | string
  children?: ReactNode
  activeColor?: string
  onActive?: () => void
  onInactive?: () => void
}

type InternalMarker = Marker & {
  position: number
  normalizedPosition: number
}

export type ProgressProps = {
  solid?: boolean
  progress?: number
  direction?: 'horizontal' | 'vertical'
  primaryColor?: string
  secondaryColor?: string
  onMarkerUpdate?: (last: Marker, all: Marker[]) => void
  markers?: Marker[]
  markerSize?: number
  markerVisible?: boolean
  markerColor?: string
  markerActiveColor?: string
  /*
    If progress bar is animated we use
    gsap.timeline if not, just use gsap.set
  */
  animated?: boolean
  debug?: boolean
}

export type ProgressAPI = {
  getPercentageById: (id: string) => number | undefined
  update: (progress: number) => void
}

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
      solid = false,
      primaryColor,
      secondaryColor,
      progress,
      markers,
      markerSize,
      markerVisible = true,
      markerColor,
      markerActiveColor,
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
    const orderedMarkers = useRef<InternalMarker[]>([])
    const { width } = useViewportSize()

    const [internalMarkers, setInternalMarkers] = useState<InternalMarker[]>([])

    const update = useCallback(
      (progress) => {
        const duration = ANIMATION_UPDATE_INTERVAL_SEC
        const gsapFunc =
          progress < prevProgress.current || !animated ? 'set' : 'to'

        if (
          orderedMarkers.current?.some(({ position }) => position <= progress)
        ) {
          const firstCoincidence = orderedMarkers.current.find(
            ({ position }) => position <= progress
          )

          if (firstCoincidence) {
            setLastActiveMarker((prevValue) => {
              if (prevValue?.position !== firstCoincidence?.position) {
                onMarkerUpdate?.(
                  firstCoincidence,
                  orderedMarkers.current?.filter(
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
      [direction, onMarkerUpdate, animated]
    )

    const getPercentageById = useCallback(
      (id: string) => {
        if (!barRef.current) return

        const { left, top, height, width } =
          barRef.current?.getBoundingClientRect()

        const barCoord = direction === 'horizontal' ? left : top
        const barSize = direction === 'horizontal' ? width : height
        const markerElmCoord = getElmCoordById(
          id,
          direction === 'horizontal' ? 'x' : 'y'
        )

        return (clamp(markerElmCoord - barCoord, 0, barSize) / barSize) * 100
      },
      [direction]
    )

    useImperativeHandle(
      ref,
      () => ({ update, getPercentageById, elm: barRef.current }),
      [update, getPercentageById]
    )

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
      orderedMarkers.current = internalMarkers?.sort(
        (a, b) => b.position - a.position
      )
    }, [internalMarkers])

    useEffect(() => {
      if (progress != undefined) {
        update(progress)
      }
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
          <div
            className={clsx(s['progress-gradient'], { [s['solid']]: solid })}
          />
        </div>
        {markerVisible &&
          internalMarkers?.map(
            (
              {
                position,
                normalizedPosition,
                activeColor,
                children,
                style,
                className,
                ...rest
              },
              idx
            ) => {
              const isOnEnds = position === 0 || position === 100

              return (
                <ProgressMarker
                  size={markerSize}
                  color={markerColor || primaryColor}
                  activeColor={activeColor || markerActiveColor}
                  active={
                    lastActiveMarker !== undefined &&
                    position <= lastActiveMarker.position
                  }
                  current={
                    lastActiveMarker !== undefined &&
                    position === lastActiveMarker.position
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
                        : '0.5',
                    ...style
                  }}
                  className={clsx(s['marker'], className)}
                  {...rest}
                  key={`${position}-${idx}`}
                >
                  {children}
                </ProgressMarker>
              )
            }
          )}
      </div>
    )
  }
)

type ProgressMarkerProp = {
  size?: number
  color?: string
  active?: boolean
  current?: boolean
  activeColor?: string
} & JSX.IntrinsicElements['span']

export const ProgressMarker = forwardRef<HTMLSpanElement, ProgressMarkerProp>(
  (
    {
      size = 18,
      active = false,
      current = false,
      className,
      style,
      color,
      activeColor,
      children,
      ...props
    },
    ref
  ) => (
    <span
      // @ts-ignore
      style={{ '--color': active ? activeColor || color : color, ...style }}
      className={clsx(
        s['marker'],
        s['animated'],
        {
          [s['active']]: active,
          [s['current']]: current
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
      >
        {children && <span>{children}</span>}
      </span>
    </span>
  )
)

export type TimelineProps = {
  duration: number
  onStart?: () => void
  onComplete?: () => void
  loop?: boolean
  playing?: boolean
} & ProgressProps

export const Timeline = forwardRef<UseGsapTimeAPI, TimelineProps>(
  (
    { playing = false, duration, onStart, onComplete, loop = true, ...rest },
    ref
  ) => {
    const progressRef = useRef<ProgressAPI>(null)

    const handleUpdate = useCallback<NonNullable<UseGsapTimeArgs['onUpdate']>>(
      (progress) => {
        progressRef.current?.update(progress.percentage)
      },
      []
    )

    const time = useGsapTime({
      duration,
      onUpdate: handleUpdate,
      onStart,
      onComplete,
      loop
    })

    useImperativeHandle(
      ref,
      () => {
        return {
          ...time,
          seek: (progressOrId: string | number) => {
            let progress: number

            if (typeof progressOrId === 'string') {
              if (!progressRef.current) return

              const elmProgress =
                progressRef.current.getPercentageById(progressOrId)

              if (elmProgress === undefined) return

              progress = elmProgress
            } else {
              progress = progressOrId
            }

            time.seek(progress)
          }
        }
      },
      [time]
    )

    useEffect(() => {
      if (playing === true) {
        time.start()
      } else if (playing === false) {
        time.pause()
      }

      return time.pause
    }, [time, playing])

    return <ProgressBar animated={false} {...rest} ref={progressRef} />
  }
)

import clsx from 'clsx'
import { gsap } from 'lib/gsap'
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

const getElmXById = (id: string) => {
  if (!isClient) return 0

  const elm = document.getElementById(id)

  if (!elm) {
    throw new Error(`Element with id ${id} not found`)
  }

  return elm.getBoundingClientRect().left
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
      animated = true,
      debug = false
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

    const [internalMarkers, setInternalMarkers] = useState<
      (Marker & { position: number })[]
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

        const firstCoincidence = orderedMarkers.find(
          ({ position }) => position <= progress
        )

        if (debug) {
          console.log({ firstCoincidence, progress })
        }

        if (orderedMarkers?.some(({ position }) => position <= progress)) {
          const firstCoincidence = orderedMarkers.find(
            ({ position }) => position <= progress
          )

          if (firstCoincidence) {
            if (debug) {
              console.log('Here 1')
            }
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
          if (debug) {
            console.log('Here 2')
          }
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

    useImperativeHandle(ref, () => ({ update }), [update])

    useEffect(() => {
      if (!barRef.current) return

      const { left, width } = barRef.current!.getBoundingClientRect()

      const newMarkers = markers?.map((marker) => {
        return {
          ...marker,
          position:
            typeof marker.position === 'string'
              ? ((getElmXById(marker.position) - left) / width) * 100
              : marker.position
        }
      })

      setInternalMarkers(newMarkers || [])
    }, [markers])

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
          internalMarkers?.map(({ position }) => (
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
                '--translate-y': '0.5',
                '--translate-x': '0.5'
              }}
              className={s['marker']}
              key={position}
            />
          ))}
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
  loop?: boolean
} & ProgressProps

export const Timeline = memo(
  ({ duration, loop = true, ...rest }: TimelineProps) => {
    const progressRef = useRef<ProgressAPI>(null)

    const { start, pause } = useGsapTime({
      duration,
      onUpdate: (progress) => {
        progressRef.current?.update(progress.percentage)
      },
      loop
    })

    useEffect(() => {
      start()

      return pause
    }, [start, pause])

    return <ProgressBar animated={false} {...rest} ref={progressRef} />
  }
)

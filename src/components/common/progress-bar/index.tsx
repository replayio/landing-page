import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

import { INTERVAL_MS, useTime } from '~/hooks/use-time'

import s from './progress-bar.module.scss'

type Marker = {
  position: number
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
  /*
    If progress bar is animated we use
    gsap.timeline if not, just use gsap.set
  */
  animated?: boolean
}

export type ProgressAPI = { update: (progress: number) => void }

export const ANIMATION_UPDATE_INTERVAL_MS = INTERVAL_MS
export const ANIMATION_UPDATE_INTERVAL_SEC = ANIMATION_UPDATE_INTERVAL_MS / 1000

export const ProgressBar = forwardRef<ProgressAPI, ProgressProps>(
  (
    {
      primaryColor,
      secondaryColor,
      progress,
      markers,
      markerSize,
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
    const orderedMarkers = useRef(
      markers?.sort((a, b) => b.position - a.position)
    )
    const timeline = useRef<GSAPTimeline | GSAP>(
      animated ? gsap.timeline() : gsap
    )

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

    useImperativeHandle(ref, () => ({ update }))

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
        {markers?.map(({ position }) => (
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

export const Timeline = ({ duration, loop = true, ...rest }: TimelineProps) => {
  const progressRef = useRef<ProgressAPI>(null)

  const { start, pause } = useTime({
    duration,
    onUpdate: (progress) => {
      progressRef.current?.update(progress.percentage)
    },
    loop
  })

  useEffect(() => {
    start()

    return () => {
      pause()
    }
  }, [start, pause])

  return <ProgressBar {...rest} ref={progressRef} />
}

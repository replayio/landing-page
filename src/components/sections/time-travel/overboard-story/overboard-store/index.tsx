import {
  Color,
  Colors,
  colorways,
  Hoverboard,
  HoverboardControls
} from '@replayio/overboard'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { forwardRef, memo, useImperativeHandle, useRef } from 'react'

import { AspectBox } from '~/components/common/aspect-box'
import { InspectBox } from '~/components/common/inspect-box'

import s from './overboard-store.module.scss'

export type OverboardColors = 'red' | 'green' | 'blue'

export type OverboardStoreProps = {
  storeId?: string
  onPurchase?: () => void
  overboardColor?: OverboardColors
  onOverboardColorChange?: (color: OverboardColors) => void
  mode: 'just-overboard' | 'color-picker' | 'purchase' | 'full'
  inspectMode: 'html' | 'react'
  state?: 'idle' | 'loading' | 'error'
  colorPicker?: boolean
} & JSX.IntrinsicElements['div']

const Sky = dynamic(
  () => import('~/components/common/sky').then((m) => m.Sky),
  {
    ssr: false
  }
)

import { Grid3D } from '~/components/common/grid-3d'
import { useDeviceDetect } from '~/hooks/use-device-detect'

export type StoreRef = {
  hoverboard: HoverboardControls | null
  grid: AnimatedGridProps | null
}

export const OverboardStore = memo(
  forwardRef<StoreRef, OverboardStoreProps>(
    (
      {
        storeId,
        mode,
        state = 'idle',
        overboardColor,
        onOverboardColorChange,
        inspectMode,
        onPurchase,
        className,
        colorPicker = false,
        ...rest
      },
      ref
    ) => {
      const hoverboardRef = useRef<HoverboardControls>(null)
      const gridRef = useRef<AnimatedGridProps>(null)

      const inspectNames = {
        html: {
          main: 'main',
          app: 'body',
          hoverboard: 'svg',
          colors: 'div',
          color: 'input',
          'hoverboard-container': 'div',
          'purchase-form': 'form',
          submit: 'button'
        },
        react: {
          main: '-',
          app: 'App',
          hoverboard: 'Hoverboard',
          colors: 'Colors',
          color: 'Color',
          'hoverboard-container': '-',
          'purchase-form': 'PurchaseForm',
          submit: 'PurchaseButton'
        }
      }

      const buildId = (id: string) => `${id}${id ? `-${storeId}` : ''}`

      useImperativeHandle(
        ref,
        () => ({
          hoverboard: hoverboardRef.current,
          grid: gridRef.current
        }),
        []
      )

      return (
        <InspectBox
          name={inspectNames[inspectMode]['app']}
          boxId="app"
          className={className}
          {...rest}
        >
          <div
            className={clsx('store', s['overboard-store'], s['mode-' + mode])}
          >
            <div className={s['underlay']}>
              <div className={s['layer']}>
                <Sky withAsteroids={false} count={30} />
              </div>
              <div className={s['layer']}>
                <AnimatedGrid ref={gridRef} />
              </div>
            </div>

            <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
              <InspectBox name={inspectNames[inspectMode]['main']} boxId="main">
                <div
                  id={buildId('overboard-store-inner')}
                  className={s['store-inner']}
                >
                  <InspectBox
                    name={inspectNames[inspectMode]['hoverboard-container']}
                    boxId="hoverboard-container"
                  >
                    <InspectBox
                      name={inspectNames[inspectMode]['hoverboard']}
                      boxId="hoverboard"
                      className={s['overboard-wrapper']}
                    >
                      <AspectBox style={{ width: '100%' }} ratio={700 / 340}>
                        <Hoverboard
                          wave={0}
                          ref={hoverboardRef}
                          color={overboardColor}
                        />
                      </AspectBox>
                    </InspectBox>
                  </InspectBox>

                  <InspectBox
                    name={inspectNames[inspectMode]['purchase-form']}
                    boxId="purchase-form"
                    className={s['purchase-form']}
                  >
                    {colorPicker && (
                      <InspectBox
                        id={buildId('overboard-store-colors')}
                        name={inspectNames[inspectMode]['colors']}
                        boxId="colors"
                        className={s['color-picker']}
                      >
                        <Colors
                          onColorChange={(color) => {
                            // TODO: need to fix type in overboard design system
                            // @ts-ignore
                            onOverboardColorChange(color)
                          }}
                        >
                          {Object.entries(colorways).map(
                            ([name, [start, end]]) => (
                              <InspectBox
                                name={inspectNames[inspectMode]['color']}
                                boxId={`color-${name}`}
                                key={name}
                              >
                                <Color
                                  onChange={() => undefined}
                                  checked={overboardColor === name}
                                  label={name}
                                  value={name.toLowerCase()}
                                  startColor={start}
                                  endColor={end}
                                />
                              </InspectBox>
                            )
                          )}
                        </Colors>
                      </InspectBox>
                    )}
                  </InspectBox>

                  <InspectBox
                    id={buildId('overboard-store-purchase')}
                    name={inspectNames[inspectMode]['submit']}
                    boxId="submit"
                    className={s['button-wrapper']}
                  >
                    <button
                      onClick={onPurchase}
                      className={clsx(s['purchase'], {
                        [s['loading'] as string]: state === 'loading',
                        [s['error'] as string]: state === 'error'
                      })}
                      disabled={state === 'loading'}
                    >
                      <span className={s['content']}>
                        {state === 'error' ? 'Error' : 'Purchase'}
                      </span>
                      <span className={clsx('loader', s['loader'])} />
                    </button>
                  </InspectBox>
                </div>
              </InspectBox>
            </div>
          </div>
        </InspectBox>
      )
    }
  )
)

type AnimatedGridProps = {
  move: (progress: number) => void
}

const AnimatedGrid = forwardRef<AnimatedGridProps, unknown>((_, ref) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const { isFirefox } = useDeviceDetect()

  useImperativeHandle(
    ref,
    () => {
      return {
        move: (progress: number) => {
          if (!gridRef.current?.childNodes) return

          gridRef.current?.childNodes.forEach((c) => {
            const child = c as HTMLElement

            child.style.transform = `translate3d(0, ${100 * progress}%, 0)`
            child.style.animation = 'none'
          })
        }
      }
    },
    []
  )

  return isFirefox ? (
    <svg viewBox="0 0 944 648" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1641_739)">
        <mask
          id="mask0_1641_739"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="-248"
          y="0"
          width="1440"
          height="648"
        >
          <path
            fill="url(#paint0_linear_1641_739)"
            d="M-248 0h1440v648H-248z"
          />
        </mask>
        <g mask="url(#mask0_1641_739)" stroke="#F41C52">
          <path
            transform="matrix(.8927 -.45065 .3167 .94852 -286 402.079)"
            d="M0-.5h381.988"
          />
          <path
            transform="matrix(.86059 -.5093 .3645 .9312 -286 467.248)"
            d="M0-.5h465.96"
          />
          <path
            transform="matrix(.82331 -.5676 .41488 .90987 -286 559.469)"
            d="M0-.5h580.583"
          />
          <path
            transform="matrix(.73924 -.67344 .5161 .85653 -274 704.561)"
            d="M0-.5h704.777"
          />
          <path
            transform="matrix(.60652 -.79507 .65508 .75556 -148 825.062)"
            d="M0-.5h748.527"
          />
          <path
            transform="matrix(.40763 -.91314 .82888 .55943 94 845.966)"
            d="M0-.5h674.625"
          />
          <path
            transform="matrix(.15476 -.98795 .97308 .23045 342 861.95)"
            d="M0-.5h639.722"
          />
          <path
            transform="matrix(-.12473 -.99219 .98241 -.18673 601 874.246)"
            d="M0-.5h649.383"
          />
          <path
            transform="matrix(-.40843 -.91279 .82827 -.56033 874 891.461)"
            d="M0-.5h724.729"
          />
          <path
            transform="matrix(-.60455 -.79656 .657 -.75389 1131 874.246)"
            d="M0-.5h808.862"
          />
          <path
            transform="matrix(-.73 -.68344 .52646 -.8502 1359 845.966)"
            d="M0-.5h901.364"
          />
          <path
            transform="matrix(-.81345 -.58164 .42752 -.904 1587 817.685)"
            d="M0-.5h1010.51"
          />
          <path
            transform="matrix(-.85823 -.51326 .36782 -.9299 1746 778.338)"
            d="M0-.5h1068.47"
          />
          <path
            transform="matrix(-.8944 -.44725 .31401 -.94942 1905 738.99)"
            d="M0-.5h1138.18"
          />
          <path d="m-248 315.508 1440-.001m-1440 49.185 1440-.001m-1440 49.185h1440M-248 463.06l1440-.001m-1440 49.185h1440m-1440 49.184h1440m-1440 49.184h1440" />
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1641_739"
          x1="472"
          y1="270.512"
          x2="472"
          y2="648"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#040336" stopOpacity="0" />
          <stop offset=".328125" stopColor="#040336" />
          <stop offset=".869792" stopColor="#040336" stopOpacity=".1" />
          <stop offset="1" stopColor="#040336" stopOpacity="0" />
          <stop offset="1" stopColor="#040336" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_1641_739">
          <path fill="#fff" d="M0 0h944v648H0z" />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <Grid3D ref={gridRef} />
  )
})

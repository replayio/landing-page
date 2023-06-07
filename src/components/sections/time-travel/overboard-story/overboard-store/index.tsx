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

type GridControls = {
  move: (progress: number) => void
}

const Sky = dynamic(
  () => import('~/components/common/sky').then((m) => m.Sky),
  {
    ssr: false
  }
)

import { Grid3D } from '~/components/common/grid-3d'

const AnimatedGrid = forwardRef<GridControls, unknown>((_, ref) => {
  const gridRef = useRef<HTMLDivElement>(null)

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

  return (
    <>
      <Grid3D ref={gridRef} />
    </>
  )
})

export type StoreRef = {
  hoverboard: HoverboardControls | null
  grid: GridControls | null
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
      const gridRef = useRef<GridControls>(null)

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

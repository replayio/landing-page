import {
  Color,
  Colors,
  colorways,
  Hoverboard,
  HoverboardControls
} from '@replayio/overboard'
import clsx from 'clsx'
import { forwardRef, memo, useImperativeHandle, useRef } from 'react'

import { AspectBox } from '~/components/common/aspect-box'
import { InspectBox } from '~/components/common/inspect-box'

import { Logo } from './logo'
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
} & JSX.IntrinsicElements['div']

type GridControls = {
  move: (progress: number) => void
}

const AnimatedGrid = forwardRef<GridControls, unknown>((_, ref) => {
  const gridRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(
    ref,
    () => {
      return {
        move: (progress: number) => {
          if (gridRef.current) {
            gridRef.current.style.transform = `rotateX(45deg) translateY(${
              -47.8 * progress
            }%)`
            gridRef.current.style.animation = 'none'
          }
        }
      }
    },
    []
  )

  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, #1E076C 0%, #A312B5 50%, transparent 100%)',
          zIndex: 3
        }}
      />
      <div className={s['animated-grid']}>
        <div className={s['grid']}>
          <div className={s['grid-fade']} />
          <div className={s['grid-lines']} ref={gridRef} />
        </div>
      </div>
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
          <div className={clsx(s['overboard-store'], s['mode-' + mode])}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'bottom',
                zIndex: 0
              }}
            >
              <AnimatedGrid ref={gridRef} />
            </div>

            <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
              <InspectBox name={inspectNames[inspectMode]['main']} boxId="main">
                <Logo
                  id={buildId('overboard-store-logo')}
                  className={s['logo']}
                />

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
                                defaultChecked={overboardColor === name}
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
                        [s['loading']]: state === 'loading',
                        [s['error']]: state === 'error'
                      })}
                      disabled={state === 'loading'}
                    >
                      <span>{state === 'error' ? 'Error' : 'Purchase'}</span>
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

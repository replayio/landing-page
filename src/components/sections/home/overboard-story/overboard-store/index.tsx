import {
  Color,
  Colors,
  colorways,
  Hoverboard,
  HoverboardControls
} from '@replayio/overboard'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { InspectBox } from '~/components/common/inspect-box'

import s from './overboard-store.module.scss'

export type OverboardColors = 'red' | 'green' | 'blue'

export type OverboardStoreProps = {
  onPurchase?: () => void
  overboardColor?: OverboardColors
  onOverboardColorChange?: (color: OverboardColors) => void
  mode: 'just-overboard' | 'color-picker' | 'purchase'
  inspectMode: 'html' | 'react'
  state?: 'idle' | 'loading' | 'error'
}

const AnimatedGrid = () => {
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
      ></div>
      <div className={s['animated-grid']}>
        <div className={s['grid']}>
          <div className={s['grid-fade']}></div>
          <div className={s['grid-lines']}></div>
        </div>
      </div>
    </>
  )
}

export const OverboardStore = forwardRef<
  HoverboardControls,
  OverboardStoreProps
>(
  (
    {
      mode,
      state = 'idle',
      overboardColor,
      onOverboardColorChange,
      inspectMode,
      onPurchase
    },
    ref
  ) => {
    const inspectNames = {
      html: {
        main: 'main',
        app: 'body',
        hoverboard: 'svg',
        colors: 'div',
        color: 'input',
        'hoverboard-container': 'div',
        'purchase-form': 'form'
      },
      react: {
        main: '-',
        app: 'App',
        hoverboard: 'Hoverboard',
        colors: 'Colors',
        color: 'Color',
        'hoverboard-container': '-',
        'purchase-form': 'PurchaseForm'
      }
    }

    return (
      <>
        <InspectBox name={inspectNames[inspectMode]['app']} boxId="app">
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
              <AnimatedGrid />
            </div>

            <InspectBox name={inspectNames[inspectMode]['main']} boxId="main">
              <div className={s['store-inner']}>
                <InspectBox
                  name={inspectNames[inspectMode]['hoverboard-container']}
                  boxId="hoverboard-container"
                  style={{ height: '100%' }}
                >
                  <InspectBox
                    name={inspectNames[inspectMode]['hoverboard']}
                    boxId="hoverboard"
                    className={s['overboard-wrapper']}
                  >
                    <Hoverboard ref={ref} color={overboardColor} />
                  </InspectBox>
                </InspectBox>

                <InspectBox
                  name={inspectNames[inspectMode]['purchase-form']}
                  boxId="purchase-form"
                  className={s['purchase-form']}
                >
                  <InspectBox
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
                      {Object.entries(colorways).map(([name, [start, end]]) => (
                        <InspectBox
                          name={inspectNames[inspectMode]['color']}
                          boxId={`color-${name}`}
                          key={name}
                        >
                          <Color
                            checked={overboardColor === name}
                            label={name}
                            value={name.toLowerCase()}
                            startColor={start}
                            endColor={end}
                          />
                        </InspectBox>
                      ))}
                    </Colors>
                  </InspectBox>
                </InspectBox>

                <div className={s['button-wrapper']}>
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
                </div>
              </div>
            </InspectBox>
          </div>
        </InspectBox>
      </>
    )
  }
)

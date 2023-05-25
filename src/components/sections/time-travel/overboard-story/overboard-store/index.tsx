import { Hoverboard, HoverboardControls } from '@replayio/overboard'
import clsx from 'clsx'
import Image from 'next/image'
import { forwardRef, memo, useImperativeHandle, useRef } from 'react'

import { AspectBox } from '~/components/common/aspect-box'
import { InspectBox } from '~/components/common/inspect-box'
import starsSvg from '~/public/images/home/overboard-stars.svg'

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
          <div
            className={clsx('store', s['overboard-store'], s['mode-' + mode])}
          >
            <div className={s['underlay']}>
              <Image
                priority
                className={s['stars']}
                alt="store stars"
                src={starsSvg}
              />
              <AnimatedGrid ref={gridRef} />
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
                      className={s['overboard-wrapper'] as string}
                    >
                      <AspectBox style={{ width: '100%' }} ratio={700 / 340}>
                        <Hoverboard
                          ref={hoverboardRef}
                          color={overboardColor}
                        />
                      </AspectBox>
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
                    </InspectBox>
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

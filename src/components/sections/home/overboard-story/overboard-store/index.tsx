import {
  Color,
  Colors,
  colorways,
  Hoverboard,
  HoverboardControls
} from '@replayio/overboard'
import clsx from 'clsx'
import { forwardRef } from 'react'

import s from './overboard-store.module.scss'

export type OverboardColors = 'red' | 'green' | 'blue'

type OverboardStoreProps = {
  overboardColor?: OverboardColors
  onOverboardColorChange?: (color: OverboardColors) => void
  mode: 'just-overboard' | 'color-picker'
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
>(({ mode, overboardColor, onOverboardColorChange }, ref) => {
  return (
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

      <div className={s['store-inner']}>
        <div data-box-id="hoverboard" className={s['overboard-wrapper']}>
          <Hoverboard ref={ref} color={overboardColor} />
        </div>

        <div data-box-id="colors" className={s['color-picker']}>
          <Colors
            onColorChange={(color) => {
              // TODO: need to fix type in overboard design system
              // @ts-ignore
              onOverboardColorChange(color)
            }}
          >
            {Object.entries(colorways).map(([name, [start, end]]) => (
              <Color
                defaultChecked={name === overboardColor}
                key={name}
                label={name}
                value={name.toLowerCase()}
                startColor={start}
                endColor={end}
              />
            ))}
          </Colors>
        </div>
      </div>
    </div>
  )
})

import {
  Color,
  Colors,
  Colorway,
  colorways,
  Hoverboard,
  HoverboardControls
} from '@replayio/overboard'
import clsx from 'clsx'
import { forwardRef, useState } from 'react'

import s from './overboard-store.module.scss'

type OverboardStoreProps = {
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
>(({ mode }, ref) => {
  const [color, setColor] = useState<Colorway>('red')

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
        <Hoverboard ref={ref} color={color} />

        <div className={s['color-picker']}>
          <Colors
            onColorChange={(color) => {
              // TODO: need to fix type in overboard design system
              // @ts-ignore
              setColor(color)
            }}
          >
            {Object.entries(colorways).map(([name, [start, end]]) => (
              <Color
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

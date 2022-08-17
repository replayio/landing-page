import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Bubble } from '~/components/common/bubble-popup'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'
import { useMedia } from '~/hooks/use-media'
import { breakpoints } from '~/lib/constants'

import s from './end-to-end-tests.module.scss'

const desktopCols = [50, 60, 40, 30, 40, 70, 60, 30, 80]
const mobileCols = [30, 55, 70, 40]

export const EndToEndTests = () => {
  const isTablet = useMedia(`(min-width: ${breakpoints.screenSm}px)`)
  const [cols, setCols] = useState<number[] | undefined>(undefined)
  const [ref, { inView }] = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.5
  })

  useEffect(() => {
    setCols(isTablet ? desktopCols : mobileCols)
  }, [isTablet])

  return cols ? (
    <div
      // @ts-ignore
      style={{ '--cols': cols.length }}
      className={clsx(s['automated-tests'], {
        [s['active']]: inView
      })}
      ref={ref}
    >
      {cols.map((perc, idx) => {
        const isActive = idx === Math.round(cols.length / 2)

        return (
          <div
            // @ts-ignore
            style={{ '--perc': perc + '%', '--stagger': idx * 0.05 + 's' }}
            className={clsx(s['line'], {
              [s['highlighted']]: inView && isActive
            })}
            key={idx}
          >
            {isActive && (
              <Bubble className={clsx(s['popup'], { [s['open']]: inView })}>
                <p>Purchase without a selected color</p>
                <p className={s['info']}>
                  Failed in <span className={s['time']}>20 seconds</span>
                </p>
              </Bubble>
            )}
          </div>
        )
      })}
    </div>
  ) : (
    <></>
  )
}

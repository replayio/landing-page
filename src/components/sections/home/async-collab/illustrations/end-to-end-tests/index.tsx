import clsx from 'clsx'
import { useEffect, useState } from 'react'

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
              <div className={clsx(s['popup'], { [s['open']]: inView })}>
                <p>Purchase without a selected color</p>
                <p className={s['info']}>
                  Failed in <span className={s['time']}>20 seconds</span>
                </p>

                <span className={s['peak']}>
                  <svg
                    width="28"
                    height="9"
                    viewBox="0 0 28 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5858 6.98569L9.74904 4.14894C8.36542 2.76532 7.67361 2.07352 6.86628 1.57878C6.1505 1.14015 5.37015 0.816917 4.55386 0.620943C3.63316 0.399902 2.65479 0.399902 0.698068 0.399902H27.3019C25.3452 0.399902 24.3668 0.399902 23.4461 0.620943C22.6299 0.816917 21.8495 1.14015 21.1337 1.57878C20.3264 2.07352 19.6346 2.76532 18.251 4.14894L15.4142 6.98569C14.6332 7.76674 13.3668 7.76674 12.5858 6.98569Z"
                      fill="white"
                    />
                    <path
                      d="M27.3019 1.3999C25.2976 1.3999 24.4584 1.40633 23.6796 1.59331C22.9653 1.76479 22.2825 2.04762 21.6562 2.43142C20.9733 2.84993 20.3753 3.43877 18.9581 4.85604L16.1213 7.6928C14.9497 8.86437 13.0503 8.86437 11.8787 7.6928L9.04193 4.85604C7.62466 3.43877 7.02672 2.84993 6.34378 2.43142C5.71748 2.04762 5.03466 1.76479 4.32041 1.59331C3.54157 1.40633 2.70239 1.3999 0.698068 1.3999H0V0.399902H0.698068C2.65479 0.399902 3.63315 0.399902 4.55386 0.620943C5.37015 0.816916 6.1505 1.14015 6.86628 1.57878C7.67361 2.07351 8.36542 2.76532 9.74904 4.14894L12.5858 6.98569C13.3668 7.76674 14.6332 7.76674 15.4142 6.98569L18.251 4.14894C19.6346 2.76532 20.3264 2.07351 21.1337 1.57878C21.8495 1.14015 22.6299 0.816916 23.4461 0.620943C24.3668 0.399902 25.3452 0.399902 27.3019 0.399902H28V1.3999H27.3019Z"
                      fill="#DCDCDC"
                    />
                  </svg>
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  ) : (
    <></>
  )
}

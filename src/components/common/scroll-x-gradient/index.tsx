import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'
import mergeRefs from 'react-merge-refs'

import s from './scroll-x-gradient.module.scss'

type ScrollXGradientProps = { offset?: number } & JSX.IntrinsicElements['div']

export const ScrollXGradient = forwardRef<HTMLDivElement, ScrollXGradientProps>(
  ({ children, offset = 0, className, ...rest }, ref) => {
    const [overflow, setOverflow] = useState<{
      overflowLeft: boolean
      overflowRight: boolean
    }>({ overflowLeft: false, overflowRight: false })
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!scrollRef.current) return

      const tabsRef = scrollRef?.current

      const handleResizeOrScroll = () => {
        const { scrollWidth, offsetWidth, scrollLeft } = tabsRef
        const spaceLeft = offsetWidth + scrollLeft - offset

        const nextState = {
          overflowLeft: false,
          overflowRight: false
        }

        if (spaceLeft > offsetWidth) {
          nextState.overflowLeft = true
        }

        if (spaceLeft < scrollWidth - offset * 2) {
          nextState.overflowRight = true
        }

        setOverflow(nextState)
      }

      const resizeObserver = new ResizeObserver(handleResizeOrScroll)

      tabsRef.addEventListener('scroll', handleResizeOrScroll)
      resizeObserver.observe(tabsRef)

      handleResizeOrScroll()

      return () => {
        tabsRef?.removeEventListener('scroll', handleResizeOrScroll)
        resizeObserver.disconnect()
      }
    }, [offset])

    return (
      <div className={clsx(s['root'], className)} {...rest}>
        <div className={s['scrollable']} ref={mergeRefs([scrollRef, ref])}>
          <div
            className={clsx(s['gradient'], s['left'], {
              [s['active'] as string]: overflow.overflowLeft
            })}
          />
          <div
            className={clsx(s['gradient'], s['right'], {
              [s['active'] as string]: overflow.overflowRight
            })}
          />
          {children}
        </div>
      </div>
    )
  }
)

ScrollXGradient.displayName = 'ScrollXGradient'

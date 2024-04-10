import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'

import { Arrows, type ArrowsProps } from '../arrows'
import s from './tabs.module.scss'

export type TabData = {
  id: string
  label: string
  onClick: () => void
}

export const TabsWithArrows = ({
  tabs,
  currentTabIndex,
  onChange,
  withArrows = true,
  arrowProps,
  className
}: {
  tabs: TabData[]
  currentTabIndex: number
  onChange: (index?: number) => void
  withArrows?: boolean
  arrowProps?: ArrowsProps
  className?: string
}) => {
  const activeBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!activeBarRef.current) return

    if (currentTabIndex === undefined) return

    const findLabelElement: any = document.querySelector(`#${tabs[currentTabIndex]?.id}`)
    const labelElementComputedStyle = getComputedStyle(findLabelElement)

    const labelElementWithoutPadding =
      findLabelElement.clientWidth -
      parseFloat(labelElementComputedStyle.paddingRight) -
      parseFloat(labelElementComputedStyle.paddingLeft)

    activeBarRef.current.style.width = `${labelElementWithoutPadding}px`

    if (currentTabIndex === 0) {
      activeBarRef.current.style.left = `${findLabelElement.offsetLeft}px`
    } else {
      activeBarRef.current.style.left = `${
        findLabelElement.offsetLeft + parseFloat(labelElementComputedStyle.paddingLeft)
      }px`
    }

    onChange(currentTabIndex)
  }, [tabs, currentTabIndex, withArrows, onChange])

  return (
    <div className={clsx(s.tabs, className)}>
      <div className={s.activeBar} ref={activeBarRef} />

      <div className={s.labelsWrapper}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={tab.id}
            type="button"
            aria-label={tab.label}
            onClick={tab.onClick}
            className={clsx({
              [s.active as string]: currentTabIndex === index
            })}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {withArrows && arrowProps && <Arrows {...arrowProps} />}
    </div>
  )
}

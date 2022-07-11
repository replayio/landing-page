/* import clsx from 'clsx'
import { FC } from 'react'

import s from './tabs.module.scss'

type TabsProps = {
  tabs: { title: string }[]
} & JSX.IntrinsicElements['div']

export const Tabs: FC<TabsProps> = ({ tabs, className }) => {
  return (
    <div className={s['wrapper']}>
      <div className={s['tabs']}>
        {tabs.map((tab, idx) => (
          <button
            className={clsx(s['tab'], { [s['active']]: idx === 0 }, className)}
            key={tab.title}
          >
            <p className={s['title']}>{tab.title}</p>
          </button>
        ))}
      </div>
    </div>
  )
} */

import * as TabsPrimitives from '@radix-ui/react-tabs'
import clsx from 'clsx'
import { FC, forwardRef, HTMLAttributes, useRef } from 'react'

import s from './tabs.module.scss'

type BaseProps = {
  children?: React.ReactNode
  className?: string
}

type TabProps = BaseProps &
  TabsPrimitives.TabsTriggerProps &
  HTMLAttributes<HTMLDivElement>

export const Tab: FC<TabProps> = ({ children, className, ...rest }) => (
  <TabsPrimitives.Trigger className={clsx(s['tab'], className)} {...rest}>
    {children}
  </TabsPrimitives.Trigger>
)

type TabListProps = BaseProps & TabsPrimitives.TabsListProps

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ children, className, ...rest }, ref) => (
    <div className={s['wrapper']}>
      <TabsPrimitives.List
        className={clsx(s['tabs'], className)}
        {...rest}
        ref={ref}
      >
        {children}
      </TabsPrimitives.List>
    </div>
  )
)

type TabsProps = {
  tabListProps?: TabListProps
  tabs: TabProps[]
  contents?: (BaseProps & TabsPrimitives.TabsContentProps)[]
} & TabsPrimitives.TabsProps

export const Tabs: FC<TabsProps> = ({
  tabs,
  contents,
  tabListProps,
  value,
  ...rest
}) => {
  const tabListRef = useRef(null)

  return (
    <TabsPrimitives.Root {...rest} value={value}>
      <TabList {...tabListProps} ref={tabListRef}>
        {tabs.map((tab) => (
          <Tab {...tab} key={tab.value} />
        ))}
      </TabList>
      {contents?.map((content) => (
        <TabsPrimitives.Content
          tabIndex={-1}
          {...content}
          key={content.value}
        />
      ))}
    </TabsPrimitives.Root>
  )
}

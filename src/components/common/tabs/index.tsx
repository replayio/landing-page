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
  contentClassName?: string
} & TabsPrimitives.TabsProps

export const Tabs: FC<TabsProps> = ({
  tabs,
  contents,
  tabListProps,
  value,
  contentClassName,
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
      <div className={contentClassName}>
        {contents?.map((content) => (
          <TabsPrimitives.Content
            tabIndex={-1}
            {...content}
            className={clsx(s['content'], content.className)}
            key={content.value}
          />
        ))}
      </div>
    </TabsPrimitives.Root>
  )
}

import clsx from 'clsx'
import { FC } from 'react'

import s from './tabs.module.scss'

type TabsProps = {
  tabs: { title: string }[]
} & JSX.IntrinsicElements['div']

export const Tabs: FC<TabsProps> = ({ tabs, className }) => {
  return (
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
  )
}

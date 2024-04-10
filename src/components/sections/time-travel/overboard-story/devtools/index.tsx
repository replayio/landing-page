import clsx from 'clsx'
import clone from 'lodash/clone'
import { useMemo } from 'react'

import { Console, ConsoleProps } from './console'
import s from './devtools.module.scss'
import { Elements, ElementsProps } from './elements'
import { Network, NetworkProps } from './network'
import { ReactDevTools, ReactDevToolsProps } from './react'

function ElementSelectorIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: 10 }}
    >
      <path
        d="M3.21642 3.26886C2.93209 3.26886 2.65941 3.38961 2.45836 3.60455C2.25731 3.8195 2.14436 4.11103 2.14436 4.415V13.5842C2.14436 13.8882 2.25731 14.1797 2.45836 14.3946C2.65941 14.6096 2.93209 14.7303 3.21642 14.7303H6.00377C6.28809 14.7303 6.56077 14.8511 6.76182 15.066C6.96287 15.281 7.07582 15.5725 7.07582 15.8765C7.07582 16.1804 6.96287 16.472 6.76182 16.6869C6.56077 16.9019 6.28809 17.0226 6.00377 17.0226H3.21642C2.36343 17.0226 1.54539 16.6604 0.942239 16.0155C0.33909 15.3707 0.000244141 14.4961 0.000244141 13.5842L0.000244141 4.415C0.000244141 3.50307 0.33909 2.62849 0.942239 1.98366C1.54539 1.33883 2.36343 0.976563 3.21642 0.976562H13.937C14.79 0.976563 15.608 1.33883 16.2112 1.98366C16.8143 2.62849 17.1532 3.50307 17.1532 4.415V7.39498C17.1532 7.69896 17.0402 7.99049 16.8392 8.20543C16.6381 8.42038 16.3654 8.54113 16.0811 8.54113C15.7968 8.54113 15.5241 8.42038 15.323 8.20543C15.122 7.99049 15.009 7.69896 15.009 7.39498V4.415C15.009 4.11103 14.8961 3.8195 14.695 3.60455C14.494 3.38961 14.2213 3.26886 13.937 3.26886H3.21642Z"
        fill="var(--grey-400)"
      />
      <path
        d="M13.8942 16.6821C14.1954 17.0632 14.7476 17.1056 15.099 16.7879C15.4604 16.4597 15.5006 15.8774 15.1994 15.4962L13.3722 13.241L15.8018 12.1822C15.859 12.1603 15.9086 12.1205 15.944 12.0683C15.9793 12.016 15.9989 11.9536 16 11.8894C16.001 11.8252 15.9836 11.7622 15.9501 11.7086C15.9165 11.655 15.8683 11.6134 15.8118 11.5893L8.43259 8.03182C8.38046 8.00517 8.32215 7.99493 8.26464 8.00235C8.20714 8.00976 8.15288 8.03451 8.10837 8.07362C8.06387 8.11273 8.031 8.16455 8.01372 8.22287C7.99643 8.28118 7.99546 8.34351 8.01092 8.40239L10.1494 16.7562C10.165 16.8168 10.1974 16.8712 10.2424 16.9125C10.2873 16.9537 10.3429 16.98 10.402 16.9879C10.4611 16.9958 10.5211 16.9851 10.5745 16.957C10.6278 16.929 10.672 16.8849 10.7016 16.8303L12.0569 14.4163L13.8942 16.6821Z"
        fill="var(--grey-400)"
      />
    </svg>
  )
}

export const tabs = {
  console: Console,
  elements: Elements,
  network: Network,
  react: ReactDevTools
}

export function TabNav({
  tabs: availableTabs,
  activeTab,
  setActivePanel
}: {
  tabs: Partial<typeof tabs>
  activeTab: keyof typeof tabs
  setActivePanel?: (panel: keyof typeof tabs) => void
}) {
  return (
    <ul
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        fontSize: 12,
        borderBottom: '1px solid var(--editor-border-color)',
        background: 'var(--editor-600)'
      }}
    >
      <ElementSelectorIcon />

      {Object.keys(availableTabs).map((key, index) => {
        const isActive = key === activeTab

        return (
          <li
            key={index}
            style={{
              color: isActive ? 'var(--color-white)' : 'var(--grey-400)',
              backgroundColor: isActive ? 'var(--editor-500)' : 'transparent',
              textTransform: 'capitalize'
            }}
          >
            <button
              style={{
                all: 'unset',
                cursor: 'pointer',
                fontSize: '14px',
                padding: '8px 10px'
              }}
              onClick={() => setActivePanel?.(key as keyof typeof tabs)}
            >
              {key}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export type DevToolsProps<T extends keyof typeof tabs = keyof typeof tabs> = {
  panelProps: {
    console: ConsoleProps
    elements: ElementsProps
    network: NetworkProps
    react: ReactDevToolsProps
  }[T]
  panel: T
  onlyShow?: (keyof typeof tabs)[]
  onPanelTabChange?: (panel: keyof typeof tabs) => void
  panelWrapperProps?: JSX.IntrinsicElements['div']
} & JSX.IntrinsicElements['div']

export function DevTools<T extends keyof typeof tabs>({
  className,
  panelProps,
  panel,
  onPanelTabChange,
  panelWrapperProps,
  onlyShow,
  ...rest
}: DevToolsProps<T>) {
  const availableTabs = useMemo(() => {
    if (!onlyShow) return tabs

    const filteredTabs = clone(tabs)

    Object.keys(filteredTabs).forEach((key) => {
      if (!onlyShow.includes(key as keyof typeof tabs)) {
        delete filteredTabs[key as keyof typeof tabs]
      }
    })

    return filteredTabs
  }, [onlyShow])

  const ActiveTabPanel = availableTabs[panel]

  return (
    <div className={clsx(s['dev-tools'], className)} {...rest}>
      <TabNav tabs={availableTabs} activeTab={panel} setActivePanel={onPanelTabChange} />
      <div {...panelWrapperProps}>
        {/* @ts-ignore */}
        <ActiveTabPanel {...panelProps} />
      </div>
    </div>
  )
}

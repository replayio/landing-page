import clsx from 'clsx'
import { forwardRef } from 'react'

import { logContent, SearchBar } from './common'
import s from './devtools.module.scss'

export const identifyNodes = (
  node: Node,
  path?: string,
  key?: string | number
): IdentifiedNode => {
  return {
    ...node,
    path,
    uuid: node.type + (key != undefined ? `-${key}` : ''),
    children: node.children?.map((child, idx) =>
      identifyNodes(
        child,
        (path != undefined ? `${path}.` : '') + `children.${idx}`,
        (key != undefined ? `${key}-` : '') + idx
      )
    )
  }
}

const reactTree = {
  type: 'App',
  children: [
    { type: 'Hero' },
    {
      type: 'Hoverboard',
      props: { rotation: 0, isAnimated: true, velocity: 23, color: 'pink' }
    },
    {
      type: 'PurchaseForm',
      children: [
        {
          type: 'Colors',
          children: [
            {
              type: 'Color',
              props: {
                key: 'red'
              }
            },
            {
              type: 'Color',
              props: {
                key: 'green'
              }
            },
            {
              type: 'Color',
              props: {
                key: 'blue'
              }
            }
          ]
        },
        { type: 'SubmitButton' }
      ]
    }
  ]
}

function renderReactTree({
  node,
  activeComponent,
  onActiveComponentChange,
  onHoverComponent,
  isNested = false
}: {
  node: IdentifiedNode
  activeComponent: ReactDevToolsProps['activeComponent']
  onActiveComponentChange: ReactDevToolsProps['onActiveComponentChange']
  onHoverComponent: ReactDevToolsProps['onHoverComponent']
  isNested?: boolean
}) {
  return (
    <ul className={s['node-tree']}>
      <li
        className={clsx(s['node-line'], {
          [s['active']]: activeComponent?.uuid === node.uuid
        })}
        style={{ marginLeft: isNested ? 8 : 0 }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
            onActiveComponentChange(node)
          }}
          onMouseEnter={() => {
            node.blockId && onHoverComponent(node.blockId)
          }}
          style={{ display: 'flex', gap: 4, padding: 4 }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: 'rotate(180deg)',
              visibility: node.children?.length ? 'visible' : 'hidden'
            }}
          >
            ▴
          </span>
          <span style={{ color: '#8434D3' }}>{node.type}</span>
          {node.props?.key && (
            <span style={{ color: '#FF9640' }}>
              key="
              <span style={{ color: '#3734D3' }}>{node.props?.key}</span>"
            </span>
          )}
        </div>

        {node.children
          ? node.children.map((node) => {
              return renderReactTree({
                node,
                activeComponent,
                onActiveComponentChange,
                onHoverComponent,
                isNested: true
              })
            })
          : null}
      </li>
    </ul>
  )
}

export type Node = {
  type: string
  children?: Node[]
  blockId?: string
  props?: {
    [key: string]: any
  }
}

export type IdentifiedNode = Omit<Node, 'children'> & {
  uuid: string
  path?: string
  children?: IdentifiedNode[]
}

type ReactDevToolsProps = {
  activeComponent: IdentifiedNode | null
  onActiveComponentChange: (node: IdentifiedNode | null) => void
  onHoverComponent: (blockId: string | null) => void
  tree: IdentifiedNode
}

export const ReactDevTools = forwardRef<HTMLDivElement, ReactDevToolsProps>(
  (
    {
      activeComponent,
      onActiveComponentChange,
      onHoverComponent,
      tree = identifyNodes(reactTree)
    },
    ref
  ) => {
    const activeCompHasProps = Object.keys(activeComponent?.props || {}).length

    return (
      <div className={s['react-dev-tools']} ref={ref}>
        <SearchBar>Search for component...</SearchBar>

        <div
          style={{
            display: 'flex',
            fontFamily: 'monospace'
          }}
        >
          <div
            onMouseLeave={() => onHoverComponent(null)}
            style={{ padding: 10, flex: activeCompHasProps ? 0 : 1 }}
          >
            {renderReactTree({
              node: tree,
              activeComponent,
              onActiveComponentChange,
              onHoverComponent
            })}
          </div>

          {activeCompHasProps > 0 && (
            <div
              style={{
                padding: 10,
                fontVariantNumeric: 'tabular-nums',
                borderLeft: '1px solid #DCDCDC',
                flex: activeCompHasProps ? 1 : 0
              }}
            >
              props:
              <ul style={{ paddingLeft: 16 }}>
                {Object.entries(activeComponent?.props || {}).map(
                  ([key, value]) => (
                    <li key={key}>
                      {key}:{' '}
                      <span id="hoverboard-rotate" style={{ color: '#314EB2' }}>
                        {logContent(value)}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
)

import clsx from 'clsx'
import { forwardRef, Fragment } from 'react'

import { IdentifiedNode, identifyNodes, logContent, ReactNode, SearchBar } from '../common'
import s from './devtools.module.scss'

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
  node: IdentifiedNode<ReactNode>
  activeComponent: ReactDevToolsProps['activeComponent']
  onActiveComponentChange: ReactDevToolsProps['onActiveComponentChange']
  onHoverComponent: ReactDevToolsProps['onHoverComponent']
  isNested?: boolean
}) {
  return (
    <ul className={s['node-tree']}>
      <li
        className={clsx(s['node-line'], {
          [s['active'] as string]: activeComponent?.uuid === node?.uuid
        })}
        id="node-line"
        style={{ marginLeft: isNested ? 8 : 0 }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
            onActiveComponentChange?.(node)
          }}
          onMouseEnter={() => {
            node.inspectBlockId && onHoverComponent?.(node.inspectBlockId)
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
          <span style={{ color: 'var(--editor-functions)' }}>{node.type}</span>
          {node.props?.key && (
            <span style={{ color: '#FF9640' }}>
              key=&quot;
              <span style={{ color: '#3734D3' }}>{node.props?.key}</span>&quot;
            </span>
          )}
        </div>

        {node.children
          ? node.children.map((node, idx) => (
              <Fragment key={idx}>
                {renderReactTree({
                  node,
                  activeComponent,
                  onActiveComponentChange,
                  onHoverComponent,
                  isNested: true
                })}
              </Fragment>
            ))
          : null}
      </li>
    </ul>
  )
}

export type ReactDevToolsProps = {
  activeComponent?: IdentifiedNode<ReactNode> | null
  onActiveComponentChange?: (node: IdentifiedNode<ReactNode> | null) => void
  onHoverComponent?: (inspectBlockId: string | null) => void
  tree?: IdentifiedNode<ReactNode>
}

export const ReactDevTools = forwardRef<HTMLDivElement, ReactDevToolsProps>(
  (
    { activeComponent, onActiveComponentChange, onHoverComponent, tree = identifyNodes(reactTree) },
    ref
  ) => {
    const activeCompHasProps = Object.keys(activeComponent?.props || {}).length > 0

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
            id="react-tools"
            onMouseLeave={() => onHoverComponent?.(null)}
            style={{
              padding: 10,
              width: '60%',
              flex: !activeCompHasProps ? 1 : undefined
            }}
          >
            {renderReactTree({
              node: tree,
              activeComponent,
              onActiveComponentChange,
              onHoverComponent
            })}
          </div>

          {activeCompHasProps && (
            <div
              style={{
                padding: 10,
                fontVariantNumeric: 'tabular-nums',
                borderLeft: '1px solid var(--editor-border-color)',
                width: '40%',
                textAlign: 'left'
              }}
            >
              props:
              <ul style={{ paddingLeft: 16, textAlign: 'left' }}>
                {Object.entries(activeComponent?.props || {}).map(([key, value]) => (
                  <li key={key}>
                    {key}:{' '}
                    <span id="hoverboard-rotate" style={{ color: 'var(--editor-variable)' }}>
                      {logContent(value)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
)

ReactDevTools.displayName = 'ReactDevTools'

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

function renderReactTree(
  node: IdentifiedNode,
  activeNode: ReactDevToolsProps['activeNode'],
  setActiveNode: ReactDevToolsProps['setActiveNode']
) {
  return (
    <ul className={s['node-tree']}>
      {node.children
        ? node.children.map((node, index) => {
            return (
              <li
                className={clsx(s['node-line'], {
                  [s['active']]: activeNode?.uuid === node.uuid
                })}
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveNode(node)
                }}
                style={{ padding: 4 }}
              >
                <div style={{ display: 'flex', gap: 4 }}>
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
                      <span style={{ color: '#3734D3' }}>
                        {node.props?.key}
                      </span>
                      "
                    </span>
                  )}
                </div>
                {renderReactTree(node, activeNode, setActiveNode)}
              </li>
            )
          })
        : null}
    </ul>
  )
}

export type Node = {
  type: string
  children?: Node[]
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
  activeNode: IdentifiedNode | null
  setActiveNode: (node: IdentifiedNode | null) => void
  tree: IdentifiedNode
}

export const ReactDevTools = forwardRef<HTMLDivElement, ReactDevToolsProps>(
  ({ activeNode, setActiveNode, tree = identifyNodes(reactTree) }, ref) => {
    return (
      <div className={s['react-dev-tools']} ref={ref}>
        <SearchBar>Search for component...</SearchBar>

        <div
          style={{
            display: 'flex',
            fontFamily: 'monospace'
          }}
        >
          <div style={{ padding: 10 }}>
            {renderReactTree(tree, activeNode, setActiveNode)}
          </div>

          <div
            style={{
              padding: 10,
              fontVariantNumeric: 'tabular-nums',
              borderLeft: '1px solid #DCDCDC'
            }}
          >
            props:
            <ul style={{ paddingLeft: 16 }}>
              {Object.entries(activeNode?.props || {}).map(([key, value]) => (
                <li key={key}>
                  {key}:{' '}
                  <span id="hoverboard-rotate" style={{ color: '#314EB2' }}>
                    {logContent(value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
)

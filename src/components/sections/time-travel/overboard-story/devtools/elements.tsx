import clsx from 'clsx'
import { gsap } from '~/lib/gsap'
import React, { forwardRef, Fragment, useMemo } from 'react'

import { isClient } from '~/lib/constants'

import { getStyles, HTMLNode, IdentifiedNode } from '../common'
import s from './devtools.module.scss'

export type ElementsProps = {
  activeElement: IdentifiedNode<HTMLNode> | null
  onActiveElementChange: (node: IdentifiedNode<HTMLNode> | null) => void
  onHoverElement: (inspectBlockId: string | null) => void
  tree: IdentifiedNode<HTMLNode>
}

function renderHtmlTree({
  node,
  activeElement,
  onActiveElementChange,
  onHoverElement,
  isNested = false
}: {
  node: IdentifiedNode<HTMLNode>
  activeElement: ElementsProps['activeElement']
  onActiveElementChange: ElementsProps['onActiveElementChange']
  onHoverElement: ElementsProps['onHoverElement']
  isNested?: boolean
}) {
  const hasChildren = (node.children || [])?.length > 0

  return (
    <ul className={s['node-tree']}>
      <li
        className={clsx(s['node-line'], {
          [s['active'] as string]: activeElement?.uuid === node.uuid
        })}
        id="node-line"
        style={{ marginLeft: isNested ? 8 : 0 }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
            onActiveElementChange(node)
          }}
          onMouseEnter={() => {
            node.inspectBlockId && onHoverElement(node.inspectBlockId)
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
          <span style={{ color: 'var(--grey-400)' }}>
            {'<'}
            {node.type}

            {node.attributes &&
              Object.entries(node.attributes).map(([key, value]) => (
                <span style={{ color: '#FF9640' }} key={key}>
                  &nbsp;{key}=&quot;
                  <span style={{ color: '#3734D3' }}>{value}</span>&quot;
                </span>
              ))}

            {hasChildren ? '>' : ' />'}
          </span>
        </div>

        {hasChildren
          ? node.children?.map((node, idx) => (
              <Fragment key={idx}>
                {renderHtmlTree({
                  node,
                  activeElement,
                  onActiveElementChange,
                  onHoverElement,
                  isNested: true
                })}
              </Fragment>
            ))
          : null}

        {hasChildren && (
          <div
            onClick={(e) => {
              e.stopPropagation()
              onActiveElementChange(node)
            }}
            onMouseEnter={() => {
              node.inspectBlockId && onHoverElement(node.inspectBlockId)
            }}
            style={{ display: 'flex', gap: 4, padding: 4 }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: 'rotate(180deg)',
                visibility: 'hidden'
              }}
            >
              ▴
            </span>
            <span style={{ color: 'var(--grey-400)' }}>
              {'</'}
              {node.type}
              {'>'}
            </span>
          </div>
        )}
      </li>
    </ul>
  )
}

export const logStyleContent = (_: string, content: any) => {
  // Detect color regex
  const colorRegex = /^#[0-9a-f]{6}$/i

  if (colorRegex.test(content)) {
    return <span style={{ color: 'var(--editor-reserved)' }}>{content};</span>
  }

  return <>{content};</>
}

export const Elements = forwardRef<HTMLDivElement, ElementsProps>(
  ({ activeElement, onActiveElementChange, onHoverElement, tree }, ref) => {
    const activeStyles = useMemo(() => {
      if (!isClient || !activeElement) return {}

      const elm = document.querySelector(`*[data-box-id="${activeElement.inspectBlockId}"]`)

      if (!elm) return {}

      const elmSelector = gsap.utils.selector(elm)

      let target = elm

      if (activeElement.inspectInnerTarget) {
        target = elmSelector(activeElement.inspectInnerTarget)[0] as Element
      }

      return {
        ...getStyles(target, activeElement.stylesWhitelist || []),
        ...activeElement.overrideStyles
      }
    }, [activeElement])

    return (
      <div className={s['elements-panel']} ref={ref}>
        <div
          onMouseLeave={() => onHoverElement(null)}
          style={{ padding: 10, width: '60%', overflowX: 'auto' }}
        >
          {renderHtmlTree({
            node: tree,
            activeElement,
            onActiveElementChange,
            onHoverElement
          })}
        </div>

        <div
          style={{
            fontVariantNumeric: 'tabular-nums',
            borderLeft: '1px solid var(--color-gray-lighter)',
            width: '40%'
          }}
        >
          <div className={s['tabs']}>
            <span>Styles</span>
            <span>Layout</span>
            <span>Computed</span>
          </div>
          <div style={{ overflowX: 'auto', minWidth: 250 }}>
            <ul
              style={{
                padding: 15,
                maxHeight: '100%'
              }}
            >
              {Object.entries(activeStyles || {}).map(([key, value]) => (
                <li key={key}>
                  {key}:{' '}
                  <span id="hoverboard-rotate" style={{ color: 'var(--editor-variable)' }}>
                    {logStyleContent(key, value)}
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

Elements.displayName = 'Elements'

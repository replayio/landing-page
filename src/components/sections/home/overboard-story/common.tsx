import clsx from 'clsx'
import { FC } from 'react'

import s from './overboard-story.module.scss'

export const SearchBar: FC<JSX.IntrinsicElements['div']> = ({
  children,
  style,
  ...rest
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      fontSize: 12,
      padding: '6px 10px',
      borderBottom: '1px solid #DCDCDC',
      color: '#a5a3a3',
      minHeight: 35,
      ...style
    }}
    {...rest}
  >
    {children}
  </div>
)

export const logContent = (content: any) => {
  const kind = typeof content

  if (kind === 'number') {
    return <span style={{ color: '#FF63E4' }}>{content}</span>
  }

  if (kind === 'string') {
    return <>"{content}"</>
  }

  if (kind === 'boolean') {
    return <>{content ? 'true' : 'false'}</>
  }

  if (kind === 'object') {
    return JSON.stringify(content)
  }

  return content
}

export type ReactNode = {
  type: string
  uuid?: string
  children?: ReactNode[]
  inspectBlockId?: string
  props?: {
    [key: string]: any
  }
}

export type HTMLNode = {
  type: string
  children?: HTMLNode[]
  inspectBlockId?: string
  inspectInnerTarget?: string
  attributes?: {
    [key: string]: any
  }
  stylesWhitelist?: string[]
  overrideStyles?: {
    [key: string]: any
  }
}

export type IdentifiedNode<T> = T & {
  path?: string
  children?: IdentifiedNode<T>[]
}

export function identifyNodes<T>(
  node: T,
  path?: string,
  key?: string | number
): IdentifiedNode<T> {
  return {
    ...node,
    path,
    // @ts-ignore
    children: node?.children?.map((child, idx) =>
      identifyNodes(
        child,
        (path != undefined ? `${path}.` : '') + `children.${idx}`,
        (key != undefined ? `${key}-` : '') + idx
      )
    )
  }
}

export const getStyles = function (elm: Element, stylesProps: string[]) {
  const styles = window.getComputedStyle(elm)

  const stylesObj = stylesProps.reduce((acc, v) => {
    acc[v] = styles.getPropertyValue(v)
    return acc
  }, {} as { [x: string]: string })

  return stylesObj
}

export const Header: FC<JSX.IntrinsicElements['div']> = ({
  children,
  style,
  ...rest
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      height: 35,
      background: 'var(--color-gray-lightest)',
      borderBottom: '1px solid var(--color-gray-lighter)',
      ...style
    }}
    {...rest}
  >
    {children}
  </div>
)

export const PanelContainer: FC<JSX.IntrinsicElements['div']> = ({
  children,
  className,
  ...rest
}) => (
  <div className={clsx(s['panel-container'], className)} {...rest}>
    {children}
  </div>
)

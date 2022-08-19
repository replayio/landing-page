import clsx from 'clsx'
import { gsap } from 'lib/gsap'
import { FC, forwardRef, MutableRefObject, useEffect, useMemo } from 'react'

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
      borderBottom: '1px solid var(--color-gray-lighter)',
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
  uuid?: string
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

export function buildUuids(
  node: ReactNode | HTMLNode,
  key?: string | number
): ReactNode | HTMLNode {
  return {
    ...node,
    uuid: node.type + (key != undefined ? `-${key}` : ''),
    children: node?.children?.map((child, idx) =>
      buildUuids(child, (key != undefined ? `${key}-` : '') + idx)
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

export const useInspectElement = (
  hoveredComponentBlockId: string | null,
  scopedInspect?: HTMLElement | null
) => {
  useEffect(() => {
    const storeSelector = gsap.utils.selector(
      scopedInspect || document.documentElement
    )

    const targetInspect = storeSelector(
      `*[data-box-id='${hoveredComponentBlockId}']`
    )

    gsap.set(targetInspect, {
      '--inspect': 1
    })

    return () => {
      gsap.set(targetInspect, {
        '--inspect': 0
      })
    }
  }, [hoveredComponentBlockId, scopedInspect])
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

export const PanelContainer = forwardRef<
  HTMLDivElement,
  JSX.IntrinsicElements['div']
>(({ children, className, ...rest }, ref) => (
  <div className={clsx(s['panel-container'], className)} {...rest} ref={ref}>
    {children}
  </div>
))

export const useTimeline = (
  active: boolean,
  timeline: MutableRefObject<GSAPTimeline>,
  reset?: () => void
) => {
  useEffect(() => {
    if (active) {
      reset?.()
      timeline.current.restart(true)
    } else {
      timeline.current.pause()
    }
  }, [active, reset, timeline])
}

export const useAnimationHover = (
  pause: (() => void) | undefined,
  play: (() => void) | undefined,
  timelineRef: MutableRefObject<GSAPTimeline>
) => {
  return useMemo(() => {
    return {
      onMouseEnter: () => {
        pause?.()
        timelineRef.current?.pause()
      },
      onMouseLeave: () => {
        play?.()
        timelineRef.current?.play()
      }
    }
  }, [pause, play, timelineRef])
}

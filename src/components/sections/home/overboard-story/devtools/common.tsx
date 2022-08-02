export const SearchBar = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 12,
      padding: '6px 10px',
      borderBottom: '1px solid #DCDCDC',
      color: '#a5a3a3'
    }}
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

export type IdentifiedNode<T = ReactNode> = Omit<T, 'children'> & {
  uuid: string
  path?: string
  children?: IdentifiedNode<T>[]
}

export const identifyNodes = (
  node: ReactNode | HTMLNode,
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

export const getStyles = function (elm: Element, stylesProps: string[]) {
  const styles = window.getComputedStyle(elm)

  const stylesObj = stylesProps.reduce((acc, v) => {
    acc[v] = styles.getPropertyValue(v)
    return acc
  }, {} as { [x: string]: string })

  return stylesObj
}

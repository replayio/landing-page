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

  if (kind === 'object') {
    return JSON.stringify(content)
  }

  return content
}

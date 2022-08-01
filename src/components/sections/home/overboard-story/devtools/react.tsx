import { SearchBar } from './common'

const reactTree = {
  type: 'App',
  children: [
    { type: 'Hero' },
    { type: 'Hoverboard' },
    {
      type: 'PurchaseForm',
      children: [
        {
          type: 'Colors',
          children: [
            {
              type: 'Color',
              key: 'red',
              value: 'red'
            },
            {
              type: 'Color',
              key: 'green',
              value: 'green'
            },
            {
              type: 'Color',
              key: 'blue',
              value: 'blue'
            }
          ]
        },
        { type: 'SubmitButton' }
      ]
    }
  ]
}

function renderReactTree(node: { type: string; children?: any[] }, depth = 0) {
  return (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: depth > 0 ? 16 : 0
      }}
    >
      {node.children
        ? node.children.map((node, index) => {
            return (
              <li key={index} style={{ padding: 4 }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      transform: 'rotate(180deg)'
                    }}
                  >
                    ▴
                  </span>
                  <span style={{ color: '#8434D3' }}>{node.type}</span>
                  {node.key && (
                    <span style={{ color: '#FF9640' }}>
                      key="<span style={{ color: '#3734D3' }}>{node.key}</span>"
                    </span>
                  )}
                </div>
                {renderReactTree(node, depth + 1)}
              </li>
            )
          })
        : null}
    </ul>
  )
}

export function ReactDevTools() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        backgroundColor: 'white'
      }}
    >
      <SearchBar>Search for component...</SearchBar>

      <div
        style={{
          display: 'flex',
          fontFamily: 'monospace'
        }}
      >
        <div style={{ padding: 10 }}>{renderReactTree(reactTree)}</div>

        <div
          style={{
            padding: 10,
            fontVariantNumeric: 'tabular-nums',
            borderLeft: '1px solid #DCDCDC'
          }}
        >
          props:
          <ul style={{ paddingLeft: 16 }}>
            <li>
              rotate:{' '}
              <span id="hoverboard-rotate" style={{ color: '#314EB2' }}>
                0
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

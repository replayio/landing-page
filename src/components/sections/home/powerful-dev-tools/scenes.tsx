import { useCallback, useState } from 'react'

import { Code, DevTools } from '../overboard-story'

export const Scene1 = () => {
  const [currentHit, setCurrentHit] = useState(0)

  const fullLogs = [
    {
      marker: 'yellow',
      prepend: 'rotate',
      content: 60
    },
    {
      marker: 'yellow',
      prepend: 'rotate',
      content: 60
    },
    {
      marker: 'yellow',
      prepend: 'rotate',
      content: 60
    },
    {
      marker: 'yellow',
      prepend: 'rotate',
      content: 60
    },
    {
      marker: 'yellow',
      prepend: 'rotate',
      content: 60
    },
    {
      marker: 'unicorn',
      prepend: 'Start 360',
      content: { left: 110, top: 25 }
    }
  ]

  const handleHit = useCallback((hit: number) => setCurrentHit(hit), [])

  return (
    <>
      <Code onHit={handleHit} />
      <DevTools
        panel="console"
        panelProps={{
          currentHit,
          logs: fullLogs
        }}
      />
    </>
  )
}

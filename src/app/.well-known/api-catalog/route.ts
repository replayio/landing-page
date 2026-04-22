import { NextResponse } from 'next/server'

const BODY = {
  linkset: [
    {
      anchor: 'https://dispatch.replay.io/nut/mcp',
      'service-desc': [
        { href: 'https://docs.replay.io/basics/replay-mcp/tools', type: 'text/html' }
      ],
      'service-doc': [
        { href: 'https://docs.replay.io/basics/replay-mcp/quickstart', type: 'text/html' }
      ],
      'service-meta': [
        { href: 'https://www.replay.io/.well-known/mcp/server-card.json', type: 'application/json' }
      ]
    }
  ]
}

export function GET() {
  return NextResponse.json(BODY, {
    status: 200,
    headers: {
      'Content-Type': 'application/linkset+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}

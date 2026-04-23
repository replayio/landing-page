import { NextResponse } from 'next/server'

const ROBOTS = `User-agent: *
Allow: /
Content-Signal: search=yes, ai-input=yes, ai-train=no

# Allowed to read, not to train
User-agent: GPTBot
Allow: /
Content-Signal: search=yes, ai-input=yes, ai-train=no

User-agent: OAI-SearchBot
Allow: /
Content-Signal: search=yes, ai-input=yes, ai-train=no

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /
Content-Signal: search=yes, ai-input=yes, ai-train=no

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /
Content-Signal: search=yes, ai-input=yes, ai-train=no

User-agent: Applebot-Extended
Allow: /

# Training corpora we don't want our content in
User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

Sitemap: https://www.replay.io/sitemap.xml
`

export function GET() {
  return new NextResponse(ROBOTS, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}

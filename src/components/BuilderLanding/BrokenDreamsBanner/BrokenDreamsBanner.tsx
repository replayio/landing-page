'use client'

import { Container } from '~/components/Container'
import { Button } from '~/components/Button'

export function BrokenDreamsBanner() {
  return (
    <div
      className="fixed top-0 left-0 w-full py-2 z-[60] bg-[length:200%_100%] bg-[position:0%_50%] animate-gradientShift"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgb(124 58 237) 0%, rgb(131 75 242) 12.5%, rgb(139 92 246) 25%, rgb(236 72 153) 37.5%, rgb(219 39 119) 50%, rgb(236 72 153) 62.5%, rgb(59 130 246) 75%, rgb(48 114 242) 87.5%, rgb(37 99 235) 100%)'
      }}
    >
      <Container className="flex items-center justify-center gap-4">
        <p className="text-white font-medium text-sm sm:text-base text-center sm:text-left">
          <span className="hidden sm:inline">Rebuild your vibe-broken apps with Replay Builder</span>
          <span className="sm:hidden">Rebuild your apps with Replay Builder</span>
        </p>
        <Button
          variant="outline"
          color="white"
          size="sm"
          href="https://builder.replay.io/rebuild-broken-dreams"
          className="shrink-0 text-white bg-opacity-30 border-none"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </Button>
      </Container>
    </div>
  )
}

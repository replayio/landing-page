import { Container } from '~/components/Container'
import { Button } from '~/components/Button'

export function DebuggingCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Stop guessing. Start seeing.
          </h2>
          <p className="mt-4 text-base text-slate-500 sm:text-lg">
            Record your first bug and let Replay show you what actually happened.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3">
            <Button
              variant="solid"
              color="custom"
              size="base"
              href="https://docs.replay.io/basics/replay-mcp/quickstart"
              target="_blank"
              className="border-0 bg-rose-500 px-10 text-white transition-opacity hover:opacity-90"
            >
              Get started with Replay MCP →
            </Button>
            <p className="text-sm text-slate-500">Free to start. No credit card required.</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

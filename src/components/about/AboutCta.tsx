import { Container } from '~/components/Container'
import { Button } from '~/components/Button'

export function AboutCta() {
  return (
    <section className="bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            See what your software is doing.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-700">
            Install the CI Agent on your repo, or add Replay MCP to your coding agent. Free to get
            started.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant="solid"
              color="custom"
              href="https://docs.replay.io/basics/getting-started/record-your-playwright-tests"
              target="_blank"
              rel="noopener noreferrer"
              className="border-0 bg-rose-500 px-10 text-white hover:bg-rose-600 hover:opacity-90"
            >
              Install the CI Agent
            </Button>
            <Button
              variant="outline"
              color="blue"
              href="https://docs.replay.io/basics/replay-mcp/overview"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add Replay MCP
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

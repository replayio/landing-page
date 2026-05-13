import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import clsx from 'clsx'

export function HomepageCTA({ backgroundColor = 'white' }: { backgroundColor?: 'white' | 'gray' }) {
  return (
    <section
      className={clsx('relative isolate overflow-hidden py-16 md:py-24', {
        'bg-gray-200': backgroundColor === 'gray',
        'bg-white': backgroundColor === 'white'
      })}
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Stop debugging for your agent. <br className="hidden sm:block" />
            <span className="text-accent">Give it time-travel.</span>
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Free to get started. No credit card required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              variant="solid"
              color="custom"
              size="base"
              href="https://docs.replay.io/basics/getting-started/record-your-playwright-tests"
              target="_blank"
              className="border-0 bg-rose-500 px-10 text-white transition-opacity hover:opacity-90"
            >
              Install the CI Agent
            </Button>
            <Button
              variant="outline"
              color="custom"
              size="base"
              href="https://docs.replay.io/basics/replay-mcp/quickstart"
              target="_blank"
              className="border-gray-200 px-10 text-gray-900 hover:border-gray-300"
            >
              Add Replay MCP
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

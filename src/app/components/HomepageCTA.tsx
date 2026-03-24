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
            Let Replay do it.
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Free to get started. No credit card required.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              variant="solid"
              color="custom"
              size="base"
              href="https://docs.replay.io/basics/replay-mcp/quickstart"
              target="_blank"
              className="border-0 bg-rose-500 px-10 text-white hover:bg-rose-600"
            >
              Get started free
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

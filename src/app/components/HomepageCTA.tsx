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
            Stop debugging test failures manually.
          </h2>
          <p className="mt-4 text-base text-slate-500 sm:text-lg">
            Free plan available. No credit card required. $299/mo for Growth.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center">
            <Button
              variant="solid"
              color="custom"
              size="base"
              href="https://docs.replay.io/basics/getting-started/record-your-playwright-tests"
              target="_blank"
              className="border-0 bg-rose-500 px-10 text-white transition-opacity hover:opacity-90"
            >
              Get started free →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

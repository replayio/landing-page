import Link from 'next/link'
import { Container } from '~/components/Container'

const CHROME_EXTENSION_URL =
  'https://chromewebstore.google.com/detail/replay-debugger/lkbmpddckbjbfaekcjacjgpehgaaijhh'

export function VibeCodersCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Give it a try. It&apos;s free.
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Install the Chrome extension and see what Replay finds.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-rose-500 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-rose-600"
            >
              Install Replay Extension
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

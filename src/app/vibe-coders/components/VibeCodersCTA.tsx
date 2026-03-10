import { Container } from '~/components/Container'

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
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfKvIBxNKqziys0q56hG0dKHHP2qjjIBIPebBYbGN7H0X8PGw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-gradient-to-r from-rose-500 to-purple-500 px-8 py-3.5 text-base font-medium text-white hover:from-rose-600 hover:to-purple-600 transition-all"
            >
              Coming soon: Get notified
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

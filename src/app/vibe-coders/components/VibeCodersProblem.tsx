import { Container } from '~/components/Container'

export function VibeCodersProblem() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Debugging tools were built for engineers.{' '}
            <span className="text-accent">
              You&apos;re not one. That&apos;s fine.
            </span>
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            <p>
              Most debugging tools assume you know what a network request is, or what a console log
              means. If you&apos;re building with Lovable, Base44, Replit, or similar, you
              shouldn&apos;t need to know any of that.
            </p>
            <p>
              Replay doesn&apos;t ask you to understand the technical details.{' '}
              <strong className="font-semibold text-gray-900">
                It just tells you what broke and how to fix it.
              </strong>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

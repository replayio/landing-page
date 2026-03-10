import { Container } from '~/components/Container'

export function VibeCodersExample() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Here&apos;s what it looks like.
          </h2>

          <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-100 p-8 sm:p-10">
            <div className="space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
              <p>
                You built a contact form in Lovable. When someone fills it out and hits Submit,
                nothing happens. No confirmation, no error. Just... nothing.
              </p>
              <p>
                You try describing the problem to your AI assistant. It suggests a few things. None
                of them work. You&apos;re going in circles.
              </p>
              <p>
                <strong className="font-semibold text-accent">With Replay:</strong>{' '}
                you open the Chrome extension, hit Record, fill out the form and hit Submit. Replay
                watches everything that happens behind the scenes. Then it tells you: the form is
                trying to send data to a URL that doesn&apos;t exist yet. Here&apos;s what to
                change.
              </p>
              <p>
                You paste that into Lovable.{' '}
                <strong className="font-semibold text-gray-900">Fixed.</strong>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

import { Container } from '~/components/Container'

const capabilities = [
  {
    title: 'What actually executed',
    description:
      'The exact sequence of function calls, not what you think ran. Every function on every frame, with arguments and return values.'
  },
  {
    title: 'State at any point in time',
    description:
      'React component state, Redux / Zustand / TanStack Query stores, local variables — all inspectable at any moment in the recording.'
  },
  {
    title: 'Network reality',
    description:
      'Every request and response with full payloads and timing. Not what the code intended to send — what actually went over the wire.'
  },
  {
    title: 'DOM as it was',
    description:
      'The actual DOM at any moment in time, not a reconstruction. See exactly what the user saw and when.'
  },
  {
    title: 'Render behavior',
    description:
      'Which components re-rendered, what triggered them, and whether it was necessary. Follow the full component tree at any point.'
  },
  {
    title: 'Event sequence',
    description:
      'Every event handler that fired, in order, with the state before and after. No more guessing about race conditions.'
  }
]

export function DebuggingRuntimeContext() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            The runtime context that changes everything
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Without a Replay recording, your coding agent can only read source code and error
            messages. With one, it can see:
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {capabilities.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-gray-200 bg-slate-50 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-base italic text-gray-600 sm:text-lg">
          This is the difference between debugging with evidence and debugging with intuition.
        </p>
      </Container>
    </section>
  )
}

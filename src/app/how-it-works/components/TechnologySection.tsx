import { Container } from '~/components/Container'

const rows = [
  {
    label: 'Render chains',
    detail: 'Which component re-rendered, what triggered it, what changed'
  },
  {
    label: 'State flow',
    detail: 'Redux actions, React state updates, context changes across the component tree'
  },
  {
    label: 'Network timing',
    detail: 'Every request and response, with exact payload and timing data'
  },
  {
    label: 'JS execution',
    detail: 'Every function call on every frame, with arguments and return values'
  },
  {
    label: 'DOM mutations',
    detail: 'What changed in the DOM, when, and what code caused it'
  }
]

export function TechnologySection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">The technology</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Underneath it all: our time-travel debugger.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
              Whether you&apos;re running Replay QA on a web app or analyzing a CI failure, the same
              recording engine is at work. Replay captures the full browser runtime deterministically
              — making AI analysis possible where it wasn&apos;t before.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-gray-200">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-baseline gap-6 px-6 py-4 ${
                  i < rows.length - 1 ? 'border-b border-gray-200' : ''
                } ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <span className="w-36 flex-shrink-0 text-sm font-semibold text-gray-900">
                  {row.label}
                </span>
                <span className="text-sm leading-relaxed text-gray-600">{row.detail}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm italic text-gray-500">
            This isn&apos;t guessing from error messages. It&apos;s reading the actual execution.
          </p>
        </div>
      </Container>
    </section>
  )
}

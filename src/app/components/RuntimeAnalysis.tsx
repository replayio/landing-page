import { Container } from '~/components/Container'

const rows = [
  {
    label: 'Render chains',
    description: 'Which component re-rendered, what triggered it, what changed'
  },
  {
    label: 'State flow',
    description: 'Redux actions, React state updates, context changes across the component tree'
  },
  {
    label: 'Network timing',
    description: 'Every request and response, with exact payload and timing data'
  },
  {
    label: 'JS execution',
    description: 'Every function call on every frame, with arguments and return values'
  },
  {
    label: 'DOM mutations',
    description: 'What changed in the DOM, when, and what code caused it'
  }
]

export function RuntimeAnalysis() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Analysis that used to require a staff engineer
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Replay captures deterministic recordings — not screenshots, not logs, but the actual
            program execution. The agent can inspect:
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl overflow-x-auto">
          <table className="w-full border-collapse overflow-hidden rounded-xl border border-gray-200 bg-white text-left text-sm">
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-gray-100 last:border-b-0 ${i % 2 === 1 ? 'bg-violet-50/50' : ''}`}
                >
                  <td className="w-1/4 px-6 py-5 font-semibold text-gray-900">{row.label}</td>
                  <td className="px-6 py-5 text-gray-600">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm italic text-accent">
          This isn&apos;t guessing from error messages. It&apos;s reading the actual execution.
        </p>
      </Container>
    </section>
  )
}

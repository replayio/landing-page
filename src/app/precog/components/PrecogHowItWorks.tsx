import { Container } from '~/components/Container'

const cards = [
  {
    title: 'Speculative execution analysis',
    body: 'Precog runs a speculative React reconciler across a probabilistic AST shadow DOM — a ghost renderer that simulates what your component would do if you finished writing it.',
    quote:
      "“Race condition detected in optimistic cart update. Root cause: you will name a variable 'data' instead of 'cartData', colliding with outer scope.”"
  },
  {
    title: 'Your personal bug fingerprint',
    body: 'Precog infers future mistakes from your typing velocity, variable naming conventions, and your personal Redux anti-pattern fingerprint — learned from your commit history.',
    quote:
      "“This mistake is consistent with your Tuesday afternoon commit history. We've pre-generated the Replay recording. Link: replay.io/precog/abc123”"
  },
  {
    title: 'Pre-generated recordings',
    body: 'When Precog detects an imminent bug, it generates a full Replay recording of the failure before it occurs — so your agent already has the context it needs to fix it.',
    quote: '“Note: this recording depicts a future that can still be avoided.”'
  }
]

export function PrecogHowItWorks() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            How Precog works.
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            One new MCP tool. Three capabilities that shouldn&apos;t be possible.
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">
                {card.body}
              </p>
              <div className="mt-6 rounded-xl bg-purple-50 p-4 text-sm italic leading-relaxed text-purple-900">
                {card.quote}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

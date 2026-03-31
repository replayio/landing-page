import { Container } from '~/components/Container'

const items = [
  {
    title: "Other people's bad PRs",
    body: "Precog cannot predict bugs introduced by other people's bad PRs landing in your branch. This is a known class of unpredictable chaos we call external state corruption and is philosophically outside our roadmap."
  },
  {
    title: 'TypeScript any',
    body: 'TypeScript any renders Precog completely blind. This is intentional. We consider it a feature.'
  },
  {
    title: 'CSS',
    body: 'Precog has no jurisdiction over CSS. No one does.'
  }
]

export function PrecogLimitations() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Known limitations.
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            We believe in radical transparency. Especially when it&apos;s funny.
          </p>
          <ul className="mt-10 space-y-4">
            {items.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-gray-200 bg-gray-50/80 p-6 sm:p-7"
              >
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

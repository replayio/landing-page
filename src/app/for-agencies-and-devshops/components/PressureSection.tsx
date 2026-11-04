import { Container } from '~/components/Container'

const pressures = [
  {
    title: 'Builds move faster than manual QA',
    body: "Coding agents have collapsed the time it takes to build a feature. One person clicking through staging can't keep up with five clients pushing every day."
  },
  {
    title: 'QA hours are hard to bill',
    body: 'Clients pay for features, not regression passes. Every hour spent re-testing last sprint’s work comes out of a fixed-bid margin.'
  },
  {
    title: "The client shouldn't find it first",
    body: 'A bug the client finds on launch day costs more than the fix. It costs confidence in the next statement of work.'
  }
]

export function PressureSection() {
  return (
    <section className="relative isolate overflow-hidden border-y border-gray-200 bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">The squeeze</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Agency QA doesn&apos;t scale with the client list.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Your team can build faster than ever. Testing is what still grows one hire at a time.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {pressures.map((p) => (
              <div key={p.title} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="font-semibold text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

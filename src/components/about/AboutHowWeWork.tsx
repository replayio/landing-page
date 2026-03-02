import { Container } from '~/components/Container'

const principles = [
  {
    title: 'Clarity over cleverness',
    description:
      "We build tools that show you exactly what happened – no abstractions, no hand-waving. That same principle runs through everything we do: our code, our communication, and our product."
  },
  {
    title: 'Long-term over fast',
    description:
      "We're not optimizing for the next quarter. We're building technology that changes how software gets built and debugged. That takes patience, and we're built for it."
  },
  {
    title: 'Open over closed',
    description:
      "We're a distributed team across time zones and continents. We care about what you ship, not when you're online. And we believe the tools that make software understandable should be accessible to everyone – not just engineers at big companies."
  }
]

export function AboutHowWeWork() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-900 py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            How we work
          </h2>
          <p className="mt-4 text-base text-gray-400 sm:text-lg">
            The principles behind the product.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="rounded-lg border border-gray-700 bg-gray-800/50 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{principle.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

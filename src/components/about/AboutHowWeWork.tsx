import { Container } from '~/components/Container'
import { aboutValues } from '~/components/about/about-data'

export function AboutHowWeWork() {
  return (
    <section className="bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How we work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-gray-600 sm:text-lg">
            The principles behind the product.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {aboutValues.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

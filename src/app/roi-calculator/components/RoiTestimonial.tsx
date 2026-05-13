import { Container } from '~/components/Container'

export function RoiTestimonial() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F8F7FB] py-16 md:py-20">
      <Container>
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="text-lg italic leading-relaxed text-slate-600 sm:text-xl">
            &ldquo;Before Replay we spent somewhere between 1&ndash;2 hours per day per dev in this
            reproducibility purgatory.&rdquo;
          </blockquote>
          <figcaption className="mt-6">
            <p className="text-sm font-semibold text-gray-900">Mark Probst</p>
            <p className="text-sm text-slate-500">VP Engineering, Glide</p>
          </figcaption>
        </figure>
      </Container>
    </section>
  )
}

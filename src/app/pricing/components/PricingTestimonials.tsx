import Image from 'next/image'
import { Container } from '~/components/Container'
import vercel from '~/images/hero-logos/vercel.svg'
import react from '~/images/hero-logos/react.svg'

const testimonials = [
  {
    quote: "Next.js 13.4 wouldn't have been possible without Replay.",
    name: 'Tim Neutkins',
    title: 'Co-author of Next.js, Vercel',
    logo: vercel
  },
  {
    quote: 'Replay.io is galaxy brain tooling. Real gamechanger.',
    name: 'Dan Abramov',
    title: 'React Maintainer',
    logo: react
  }
]

export function PricingTestimonials() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-12 md:py-16">
      <Container>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-8"
            >
              <blockquote className="text-base leading-relaxed text-gray-900">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.title}</p>
                </div>
                <Image
                  src={testimonial.logo}
                  alt=""
                  width={64}
                  height={24}
                  className="h-4 w-auto flex-none opacity-50"
                />
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}

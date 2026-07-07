import Image from 'next/image'
import { Container } from '~/components/Container'

import markProbst from '~/images/testimonials/mark-probst.jpg'
import shane from '~/images/testimonials/shane.jpg'
import timn from '~/images/testimonials/tim-neutkins.png'
import glide from '~/images/testimonials/glide.png'
import pantheon from '~/images/testimonials/pantheon.png'
import vercel from '~/images/hero-logos/vercel.svg'

type FeaturedTestimonial = {
  quote: string
  name: string
  title: string
  image: typeof markProbst
  logo: typeof glide
}

type Testimonial = {
  quote: string
  name: string
  title: string
}

const featuredTestimonials: FeaturedTestimonial[] = [
  {
    quote:
      'Before Replay, we spent somewhere between 1–2 hours per day per dev in this reproducibility purgatory.',
    name: 'Mark Probst',
    title: 'VP Engineering, Glide',
    image: markProbst,
    logo: glide
  },
  {
    quote:
      "The tools that we were using before were barely better than useless. You'd say thanks for the console log screenshots and spend 2–3 days trying to recreate the issues.",
    name: 'Shane Duff',
    title: 'Front End Lead, Pantheon',
    image: shane,
    logo: pantheon
  },
  {
    quote:
      "Next.js App Router is now stable in 13.4. It wouldn't have been possible without Replay, we investigated so many super complicated bugs.",
    name: 'Tim Neutkens',
    title: 'Co-author of Next.js, Vercel',
    image: timn,
    logo: vercel
  }
]

const additionalTestimonials: Testimonial[] = [
  {
    quote: 'Replay.io is galaxy brain tooling. Real gamechanger.',
    name: 'Dan Abramov',
    title: 'React Maintainer'
  },
  {
    quote:
      "After seeing what Replay can do, I'm setting up a lot more Playwright tests on my PRs. I was afraid to before, due to the extra work of debugging failed tests.",
    name: 'Ben Ruckman',
    title: 'Co-founder, Getmallow.com'
  },
  {
    quote:
      "If I don't immediately know the answer to a bug, I immediately reach for Replay.io. It's like HMR for repros.",
    name: 'Sebastian Markbåge',
    title: 'React Maintainer'
  }
]

export function HomepageTestimonials() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Built on technology teams already trust
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Replay QA runs on the same recording engine used every day by teams at Vercel, Glide,
            Pantheon, and more.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          {featuredTestimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <blockquote className="flex-1 p-6 text-sm leading-relaxed text-gray-900">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center justify-between gap-4 border-t border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-semibold leading-tight text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
                <Image
                  src={testimonial.logo}
                  alt=""
                  width={80}
                  height={24}
                  className="h-5 w-auto flex-none object-contain opacity-50"
                />
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl gap-6 md:grid-cols-3">
          {additionalTestimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-6"
            >
              <blockquote className="mb-4 flex-1 text-sm leading-relaxed text-gray-900">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}

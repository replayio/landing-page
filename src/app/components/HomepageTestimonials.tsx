import Image from 'next/image'
import { Container } from '~/components/Container'

import markProbst from '~/images/testimonials/mark-probst.jpg'
import shane from '~/images/testimonials/shane.jpg'
import kaiteeshiks from '~/images/testimonials/kaiteeshiks.jpg'
import petermick from '~/images/testimonials/petermick.jpg'
import danAbramov from '~/images/testimonials/danAbramov.webp'
import glide from '~/images/testimonials/glide.png'
import pantheon from '~/images/testimonials/pantheon.png'
import mallow from '~/images/testimonials/mallow.svg'

type FeaturedTestimonial = {
  quote: string
  name: string
  title: string
  titleHref?: string
  image: typeof markProbst
  logo?: typeof glide
}

type Testimonial = {
  quote: string
  name: string
  title: string
  titleHref?: string
  logo?: typeof glide
  logoSize?: 'sm'
  image?: typeof markProbst
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
      'What stood out to me was how quickly Replay QA went from setup to actionable feedback. Connecting my GitHub repository took only a few seconds, and the first run uncovered issues across functionality, UX, and accessibility that would\'ve been easy to miss manually. It gave me much more confidence before shipping the app.',
    name: 'Kaitee',
    title: '@kaiteeshiks',
    titleHref: 'https://x.com/KaiteeShiks',
    image: kaiteeshiks
  }
]

const additionalTestimonials: Testimonial[] = [
  {
    quote: 'Replay.io is galaxy brain tooling. Real gamechanger.',
    name: 'Dan Abramov',
    title: 'React Maintainer',
    image: danAbramov
  },
  {
    quote:
      "After seeing what Replay can do, I'm setting up a lot more Playwright tests on my PRs. I was afraid to before, due to the extra work of debugging failed tests.",
    name: 'Ben Ruckman',
    title: 'Co-founder, Getmallow.com',
    titleHref: 'https://getmallow.com',
    logo: mallow,
    logoSize: 'sm'
  },
  {
    quote:
      'Blown away by what Replay QA discovered for my solo startup, helped me identify and fix bugs that could potentially affect conversions.',
    name: 'Peter Mick',
    title: '@thepetermick',
    titleHref: 'https://x.com/ThePeterMick',
    image: petermick
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
                    {testimonial.titleHref ? (
                      <a href={testimonial.titleHref} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 no-underline">{testimonial.title}</a>
                    ) : (
                      <p className="text-xs text-gray-500">{testimonial.title}</p>
                    )}
                  </div>
                </div>
                {testimonial.logo && (
                  <Image
                    src={testimonial.logo}
                    alt=""
                    width={80}
                    height={24}
                    className="h-5 w-auto flex-none object-contain opacity-50"
                  />
                )}
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
              <figcaption className="flex items-center justify-between gap-4 text-sm">
                <div className="flex items-center gap-3">
                  {testimonial.image && (
                    <Image
                      src={testimonial.image}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    {testimonial.title && (testimonial.titleHref ? (
                      <a href={testimonial.titleHref} target="_blank" rel="noopener noreferrer" className="text-gray-500 no-underline">{testimonial.title}</a>
                    ) : (
                      <p className="text-gray-500">{testimonial.title}</p>
                    ))}
                  </div>
                </div>
                {testimonial.logo && (
                  <Image
                    src={testimonial.logo}
                    alt=""
                    width={testimonial.logoSize === 'sm' ? 56 : 80}
                    height={testimonial.logoSize === 'sm' ? 17 : 24}
                    className={`w-auto flex-none object-contain opacity-50 ${testimonial.logoSize === 'sm' ? 'h-3.5' : 'h-5'}`}
                  />
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}

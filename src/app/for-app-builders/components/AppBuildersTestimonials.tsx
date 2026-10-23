import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { Container } from '~/components/Container'
import daveMonk from '~/images/testimonials/davemonk.jpg'
import markProbst from '~/images/testimonials/mark-probst.jpg'
import danAbramov from '~/images/testimonials/danAbramov.webp'

const testimonials: Array<{ quote: string; name: string; title: string; image: StaticImageData }> =
  [
    {
      quote:
        "Of all the technologies I've seen this year, Replay QA makes me the most excited. … This is a product I would insist on having before writing a single line of code.",
      name: 'Dave Monk',
      title: 'QA Engineer (ex Apple, Microsoft)',
      image: daveMonk
    },
    {
      quote:
        'Before Replay, we spent somewhere between 1–2 hours per day per dev in this reproducibility purgatory.',
      name: 'Mark Probst',
      title: 'VP Engineering, Glide',
      image: markProbst
    },
    {
      quote: 'Replay.io is galaxy brain tooling. Real gamechanger.',
      name: 'Dan Abramov',
      title: 'React Maintainer',
      image: danAbramov
    }
  ]

export function AppBuildersTestimonials() {
  return (
    <section className="relative isolate overflow-hidden border-y border-accent/15 bg-accent/[0.04] py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            What engineers are saying
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-6"
              >
                <blockquote className="flex-1 leading-relaxed text-gray-900">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 text-sm">
                  <Image
                    src={t.image}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold leading-tight text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.title}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <Link
            href="/blog/customer-profile-natacha-grey-of-swoon-ai"
            className="group mt-4 block rounded-xl border border-accent/30 bg-white p-6 transition hover:border-accent hover:shadow-lg"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Customer profile
            </p>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">Natacha Grey, Swoon.ai</h3>
            <p className="mt-2 leading-relaxed text-gray-600">
              Natacha runs Swoon.ai, an agency that builds custom marketing lead journeys for many
              clients at once, with no dedicated QA team. She wired Replay QA into a stack of AI
              agents she built herself.
            </p>
            <p className="mt-4 border-l-4 border-accent pl-5 text-lg font-semibold italic text-gray-900">
              &ldquo;My aha moment was realizing that Replay was helping me find new customer
              journeys that I didn&apos;t even think about.&rdquo;
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-accent">
              Read the customer profile →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '~/components/Container'

/** Matches https://www.replay.io/blog/replay-time-travelogue-how-replay-mcp-helped-find-a-react-bug-faster-than-dan-abramov-did */
const FEATURED_POST_SLUG =
  'replay-time-travelogue-how-replay-mcp-helped-find-a-react-bug-faster-than-dan-abramov-did'

const COVER_SRC = '/images/Travelogue-DanAbramov.webp'
const COVER_ALT =
  'Time Travelogue: How Replay MCP Helped Find a React Bug Faster than Dan Abramov Did'

export function FeaturedProofPoint() {
  const postHref = `/blog/${FEATURED_POST_SLUG}`

  return (
    <section className="bg-gray-200 pb-16">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
              <Image
                src={COVER_SRC}
                alt={COVER_ALT}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                priority
              />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                Featured proof point
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Replay solved a bug that stumped Dan Abramov
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                Dan had been manually debugging a React 19 race condition. Replay&apos;s agent
                traced it to root cause in 7 minutes — using the same time-travel recording data
                that powers our CI Agent analysis. The analysis identified the exact fix without any
                human intervention.
              </p>
              <Link
                href={postHref}
                className="mt-5 inline-block text-sm font-medium text-accent transition hover:text-accent-light"
              >
                Read the full story
              </Link>
            </div>
          </div>

          <hr className="my-8 border-gray-200" />

          <figure className="text-center">
            <blockquote className="text-base italic text-gray-600 sm:text-lg">
              &ldquo;Replay.io is galaxy brain tooling. Real gamechanger.&rdquo;
            </blockquote>
            <figcaption className="mt-4">
              <p className="font-semibold text-gray-900">Dan Abramov</p>
              <p className="text-sm text-gray-500">React Maintainer</p>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}

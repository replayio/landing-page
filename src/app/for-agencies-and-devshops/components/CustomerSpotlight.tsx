import Link from 'next/link'
import { Container } from '~/components/Container'

const pullQuotes = [
  {
    quote:
      "You're constantly missing gaps in what is being tested, and you can't test fast enough.",
    context: 'On QA in two-week release cycles'
  },
  {
    quote:
      "I didn't have to block out eight hours of my day and just be clicking through everything to make sure everything works.",
    context: 'On regressing last week’s fixes while development continues'
  },
  {
    quote:
      'My aha moment was realizing that Replay was helping me find new customer journeys that I didn’t even think about.',
    context: 'On her aha moment'
  },
  {
    quote:
      'I want to do my work, go pick up my son from school, relax and have dinner, and not be waiting to get on my laptop.',
    context: 'On leaving hair-on-fire QA behind'
  }
]

export function CustomerSpotlight() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              Customer Spotlight
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              How Swoon.ai covers its client projects without a dedicated QA team.
            </h2>
          </div>

          <div
            className="relative mt-10 overflow-hidden rounded-xl border border-gray-200 shadow-lg"
            style={{ paddingBottom: '56.25%' }}
          >
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube-nocookie.com/embed/XmI8MIBuYrk"
              title="Customer profile: Natacha Grey of Swoon.ai"
              loading="lazy"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-4 leading-relaxed text-gray-600">
            <p>
              Natacha Grey has spent more than 20 years building for the web: as a front-end
              developer, a designer, a project manager, and a director of production at ad agencies.
              Across all of it, QA was the part that never kept up. Today she runs Swoon.ai, a small
              remote agency that builds custom marketing lead journeys for niche brands in finance,
              entertainment and beyond.
            </p>
            <p>
              When her recent projects went without a dedicated QA resource, she asked ChatGPT for
              an autonomous QA browser and found Replay QA. Her AI coding agents were already
              writing code and filing GitHub issues; what was missing was something to run the
              customer journeys. Now Replay QA reruns those journeys from GitHub while development
              continues, regressing last week&apos;s fixes and surfacing journeys she hadn&apos;t
              thought to test. She steers it with focused regression prompts, like a logged-out pass
              after moving a client&apos;s new React front end from a dev server to production, and
              has wired it into a chain of AI agents she built herself.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {pullQuotes.map((q) => (
              <figure key={q.quote} className="border-l-[3px] border-accent py-1 pl-5">
                <blockquote className="text-lg leading-relaxed text-gray-900">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-sm text-gray-500">{q.context}</figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-gray-600">
            <Link
              href="/blog/customer-profile-natacha-grey-of-swoon-ai"
              className="font-medium text-accent transition hover:opacity-80"
            >
              Read the full interview with Natacha &rarr;
            </Link>
          </p>
        </div>
      </Container>
    </section>
  )
}

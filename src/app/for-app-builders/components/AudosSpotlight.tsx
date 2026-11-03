import Image from 'next/image'
import { Container } from '~/components/Container'

export function AudosSpotlight() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-sm font-bold uppercase tracking-wider text-accent">
            Customer Spotlight
          </p>
          <Image
            src="/for-app-builders/audos.svg"
            alt="Audos"
            width={104}
            height={30}
            className="mx-auto mt-5 h-[30px] w-auto"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Replay QA enabled a first-party QA experience for Audos&apos; platform for
            entrepreneur/builders.
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
            <p>
              Audos wants to help everyday entrepreneurs build one million $1M companies in the next
              ten years. It aims to be the best place to build not just a product, but a business:
              each entrepreneur gets a landing page, a V0 of their app, marketing, analytics, a
              brand, and a community of other founders. Otto, Audos&apos;s flagship agent, works
              alongside each one as their AI co-founder.
            </p>
            <p>
              At that volume, no team can hand-test what gets built. Audos integrated Replay
              QA&apos;s REST API directly into its platform to create a first-party QA experience:
              every app an entrepreneur builds on Audos is explored, tested and root-caused by
              Replay QA, and the bugs flow back into Audos&apos;s build loop to be fixed before
              launch. Entrepreneurs get the highest-quality version of their business without ever
              writing a test.
            </p>
          </div>
          <figure className="mt-8 border-l-[3px] border-accent py-1 pl-5">
            <blockquote className="text-lg leading-relaxed text-gray-900">
              &ldquo;It was clear there was an attention to detail that we needed to help the people
              who don&apos;t know what a console log is.&rdquo;
            </blockquote>
            <figcaption className="mt-2 text-sm text-gray-500">
              Andres Zubillaga, Founding team, Audos (answering why they chose to partner with
              Replay QA)
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}

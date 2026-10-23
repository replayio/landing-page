import Image from 'next/image'
import { Container } from '~/components/Container'

export function AudosSpotlight() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">
            Customer Spotlight
          </p>
          <Image
            src="/for-app-builders/audos.svg"
            alt="Audos"
            width={104}
            height={30}
            className="mt-5 h-[30px] w-auto"
          />
          <h2 className="mt-5 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Replay QA enabled a first-party QA experience for Audos&apos; platform for
            entrepreneur/builders.
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
            <p>
              Audos is an AI-powered startup studio with a mission to launch{' '}
              <a
                href="https://techcrunch.com/2025/06/26/this-ai-powered-startup-studio-plans-to-launch-100000-companies-a-year-really/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent transition hover:opacity-80"
              >
                100,000 companies a year
              </a>
              . Its AI agent works with everyday entrepreneurs to build their product, and Audos
              invests up to $25,000 in each one to help them get to market.
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
        </div>
      </Container>
    </section>
  )
}

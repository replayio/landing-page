import Image from 'next/image'
import { Container } from '~/components/Container'

const calendlyUrl = 'https://calendly.com/tom-daly-replay/replay-qa-for-app-builder-platforms'

export function AppBuildersCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Ready to talk?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Schedule a call to get the ball rolling.
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto mt-10 flex max-w-lg flex-wrap items-center gap-4 rounded-2xl border border-gray-300 bg-white p-4 text-left shadow-sm transition hover:border-accent hover:shadow-lg sm:p-5"
          >
            <Image
              src="/images/team/thomasDaly.jpeg"
              alt="Thomas Daly"
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-accent/30"
            />
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-tight text-gray-900">
                Book a call with Thomas Daly
              </p>
              <p className="mt-1 text-sm text-gray-500">Head of Product, Replay</p>
            </div>
            <span className="w-full shrink-0 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-semibold text-white transition group-hover:bg-accent-light sm:w-auto">
              Schedule a call
            </span>
          </a>
        </div>
      </Container>
    </section>
  )
}

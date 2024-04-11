import { BaseHubButton } from '~/components/Button'
import { Container } from '~/components/Container'
import { LandingPageFragment } from '~/lib/basehub-queries'

export function CallToAction({ cta }: LandingPageFragment) {
  return (
    <>
      <section
        id="get-started-today"
        className="relative isolate overflow-hidden bg-slate-900 px-6 py-[100px] text-center shadow-2xl lg:py-[160px]"
      >
        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-2xl tracking-tight text-white sm:text-5xl">
              {cta.title}
            </h2>

            <BaseHubButton className="mt-10 px-8 text-lg" color="default" {...cta.getStartedLink} />
          </div>
        </Container>
      </section>
    </>
  )
}

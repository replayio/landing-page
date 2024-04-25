import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { Title } from '../primitives/texts'

export function CallToAction({ cta }: LandingPageFragment) {
  return (
    <>
      <section
        id="get-started-today"
        className="relative isolate overflow-hidden bg-slate-900 px-6 py-[100px] text-center shadow-2xl lg:py-[160px]"
      >
        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <Title as="h2" white>
              {cta.title}
            </Title>

            <Button className="mt-10 px-8 text-lg" color="default" {...cta.getStartedLink} />
          </div>
        </Container>
      </section>
    </>
  )
}

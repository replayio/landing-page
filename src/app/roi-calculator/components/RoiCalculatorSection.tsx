import { Container } from '~/components/Container'
import { RoiCalculator } from './calculator/RoiCalculator'

export function RoiCalculatorSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white pb-20 pt-4 md:pb-28">
      <Container>
        <RoiCalculator />
      </Container>
    </section>
  )
}

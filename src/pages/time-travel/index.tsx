import { PageLayout } from '~/components/layout/page'
import Prefooter from '~/components/sections/homepage/prefooter'
import { Fundamentals } from '~/components/sections/time-travel/fundamentals'
import { Hero } from '~/components/sections/time-travel/hero'
import { TextReveal } from '~/components/sections/time-travel/text-reveal'

const TimeTravel = () => {
  return (
    <PageLayout>
      <Hero />
      <TextReveal />
      <Fundamentals />
      {/* debug  */}
      {/* roadmap */}
      <Prefooter />
    </PageLayout>
  )
}

export default TimeTravel

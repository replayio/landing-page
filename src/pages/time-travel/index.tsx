import { PageLayout } from '~/components/layout/page'
import Prefooter from '~/components/sections/homepage/prefooter'
import { Fundamentals } from '~/components/sections/time-travel/fundamentals'
import { Hero } from '~/components/sections/time-travel/hero'
import { TextReveal } from '~/components/sections/time-travel/text-reveal'

const TimeTravel = () => {
  return (
    <PageLayout>
      <Hero />
      <div
        style={{
          background:
            'linear-gradient(180deg, #000000 0%, #111827 40.63%, #000000 82.81%, #111827 100%)'
        }}
      >
        <TextReveal />
        <Fundamentals />
        {/* debug  */}
        {/* roadmap */}
        <Prefooter />
      </div>
    </PageLayout>
  )
}

export default TimeTravel

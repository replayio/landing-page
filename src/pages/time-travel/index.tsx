import { Sky } from '~/components/common/sky'
import { PageLayout } from '~/components/layout/page'
import Prefooter from '~/components/sections/homepage/prefooter'
import { DebugSpeed } from '~/components/sections/time-travel/debug-speed'
import { Fundamentals } from '~/components/sections/time-travel/fundamentals'
import { Hero } from '~/components/sections/time-travel/hero'
import { Roadmap } from '~/components/sections/time-travel/roadmap'
import { TextReveal } from '~/components/sections/time-travel/text-reveal'

const TimeTravel = () => {
  return (
    <PageLayout>
      <div
        style={{
          background:
            'linear-gradient(180deg, #000000 0%, #111827 40.63%, #000000 100%)'
        }}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <div
              style={{
                isolation: 'isolate',
                position: 'sticky',
                width: '100%',
                height: '100vh',
                top: 0
              }}
            >
              <Sky />
            </div>
          </div>

          <Hero />
          <TextReveal />
        </div>
        <Fundamentals />
        <DebugSpeed />
        <Roadmap />
        <Prefooter />
      </div>
    </PageLayout>
  )
}

export default TimeTravel

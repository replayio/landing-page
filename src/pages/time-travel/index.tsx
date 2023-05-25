import { PageLayout } from '~/components/layout/page'
import Prefooter from '~/components/sections/homepage/prefooter'

const TimeTravel = () => {
  return (
    <PageLayout>
      {/* hero */}
      <div
        style={{
          background:
            'linear-gradient(180deg, #000000 0%, #111827 40.63%, #000000 82.81%, #111827 100%)'
        }}
      >
        {/* text reveal */}
        {/* fundamentals */}
        {/* debug  */}
        {/* roadmap */}
        <Prefooter />
      </div>
    </PageLayout>
  )
}

export default TimeTravel

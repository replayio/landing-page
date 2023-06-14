import { PageLayout } from '~/components/layout/page'
import { BugsSlider } from '~/components/sections/homepage/bugs-slider'
import { DebugWithFriends } from '~/components/sections/homepage/debug-with-friends'
import { DeveloperTools } from '~/components/sections/homepage/developer-tools'
import { Features } from '~/components/sections/homepage/features'
import { Hero } from '~/components/sections/homepage/hero'
import { OrganizationTestimonials } from '~/components/sections/homepage/org-testimonials'
import Prefooter from '~/components/sections/homepage/prefooter'
import { Quotes } from '~/components/sections/homepage/quotes'
import { Security } from '~/components/sections/homepage/security'
import { Testimonials } from '~/components/sections/homepage/testimonials'
import { TrustedTeams } from '~/components/sections/homepage/trusted-teams'

const HomePage = () => {
  return (
    <PageLayout>
      <Hero />
      <OrganizationTestimonials />
      <div
        style={{
          background:
            'linear-gradient(180deg, #000000 0%, rgba(13, 18, 29, 0.4) 12.28%, #0D121D 38.48%, #000000 54.71%, #000000 62.85%, #0D121D 72.4%, #000000 98.2%)'
        }}
      >
        <BugsSlider />
        <DeveloperTools />
        <Quotes />
        <DebugWithFriends />
        <Features />
        <Testimonials />
        <Security />
        <TrustedTeams />
        <Prefooter />
      </div>
    </PageLayout>
  )
}

export default HomePage

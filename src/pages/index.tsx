import React, { useState } from 'react'
import { IntercomProvider } from 'react-use-intercom'

import { PageLayout } from '~/components/layout/page'
import { DeveloperTools } from '~/components/sections/homepage/developer-tools'
import { Features } from '~/components/sections/homepage/features'
import { Hero } from '~/components/sections/homepage/hero'
import Prefooter from '~/components/sections/homepage/prefooter'
import { Security } from '~/components/sections/homepage/security'
import { Testimonials } from '~/components/sections/homepage/testimonials'
import { TrustedTeams } from '~/components/sections/homepage/trusted-teams'
import ValueProp from '~/components/sections/homepage/value-prop'

const INTERCOM_APP_ID = 'k7f741xx'

const HomePage = () => {
  return (
    <IntercomProvider appId={INTERCOM_APP_ID}>
      <PageLayout>
        <Hero />
        <div
          style={{
            paddingTop: '45px',
            background:
              'linear-gradient(180deg, #000000 0%, rgba(13, 18, 29, 0.4) 12.28%, #0D121D 38.48%, #000000 54.71%, #000000 62.85%, #0D121D 72.4%, #000000 98.2%)'
          }}
        >
          <ValueProp />
          <DeveloperTools />
          <Features />
          <Security />
          <TrustedTeams />
          <Testimonials />
          <Prefooter />
        </div>
      </PageLayout>
    </IntercomProvider>
  )
}

export default HomePage

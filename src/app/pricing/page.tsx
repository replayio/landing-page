import { PricingHero } from '~/components/pricing/sections/PricingHero'
import { PricingTable } from '~/components/pricing/sections/PricingTable'
import { Pump } from '.basehub/react-pump'
import { draftMode } from 'next/headers'
import { pricingPageFragment } from '~/lib/basehub-queries'
import { Footer } from '~/components/Footer'
import { PricingFAQ } from '~/components/pricing/PricingFAQ'
import { CostCalculator } from '~/components/pricing/sections/CostCalculator'
import { featureFlags } from '~/lib/feature-flags'
import { Header } from '~/components/layout/header'

export default function Home() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 30 }} // or { tags: ["basehub"] }
      queries={[{ pricingPage: pricingPageFragment }]}
    >
      {async ([{ pricingPage }]) => {
        'use server'
        return (
          <>
            <main>
              <Header variant="dark" />
              <PricingHero {...pricingPage} />
              {featureFlags.showCalculator && <CostCalculator />}
              <PricingTable />
              <PricingFAQ {...pricingPage} />
            </main>
            <Footer />
          </>
        )
      }}
    </Pump>
  )
}

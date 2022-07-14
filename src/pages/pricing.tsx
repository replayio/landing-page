import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { Hero } from '~/components/sections/pricing/hero'
import { Plans } from '~/components/sections/pricing/plans'

const Pricing = () => {
  return (
    <PageLayout>
      <Meta />

      <Hero />
      <Plans />
    </PageLayout>
  )
}

export default Pricing

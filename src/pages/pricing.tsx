import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { Hero } from '~/components/sections/pricing/hero'
import { Plans } from '~/components/sections/pricing/plans'

const Pricing = () => {
  return (
    <PageLayout>
      <Meta title="Pricing | Replay" />

      <Hero />
      <Plans />
      <br />
      <br />
    </PageLayout>
  )
}

export default Pricing

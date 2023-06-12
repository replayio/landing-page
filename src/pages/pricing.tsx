import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { FAQ } from '~/components/sections/pricing/faq'
import { Hero } from '~/components/sections/pricing/hero'
import { Plans } from '~/components/sections/pricing/plans'

const Pricing = () => {
  return (
    <PageLayout>
      <Meta title="Pricing | Replay" />

      <Hero />
      <Plans />
      <FAQ />
      <br />
      <br />
    </PageLayout>
  )
}

export default Pricing

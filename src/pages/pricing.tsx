import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import AccordionDemo from '~/components/sections/pricing/faq'
import { Hero } from '~/components/sections/pricing/hero'
import { Plans } from '~/components/sections/pricing/plans'

const Pricing = () => {
  return (
    <PageLayout>
      <Meta title="Pricing | Replay" />

      <Hero />

      <Plans />
      <AccordionDemo />
    </PageLayout>
  )
}

export default Pricing

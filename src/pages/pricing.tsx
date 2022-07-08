import { Meta } from '~/components/common/meta'
import { Footer } from '~/components/layout/footer'
import { Header } from '~/components/layout/header'
import { PageLayout } from '~/components/layout/page'
import { Hero } from '~/components/sections/pricing/hero'
import { Plans } from '~/components/sections/pricing/plans'

const Pricing = () => {
  return (
    <PageLayout>
      <Meta />

      <Header />
      <Hero />
      <Plans />
      <Footer />
    </PageLayout>
  )
}

export default Pricing

import { Meta } from '~/components/common/meta'
import { Footer } from '~/components/layout/footer'
import { Header } from '~/components/layout/header'
import { PageLayout } from '~/components/layout/page'
import { Hero } from '~/components/sections/pricing/hero'

const Pricing = () => {
  return (
    <PageLayout>
      <Meta />

      <Header />
      <Hero />

      <Footer />
    </PageLayout>
  )
}

export default Pricing

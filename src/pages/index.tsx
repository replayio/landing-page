import { Meta } from '~/components/common/meta'
import { Footer } from '~/components/layout/footer'
import { Header } from '~/components/layout/header'
import { PageLayout } from '~/components/layout/page'
import { Hero } from '~/components/sections/home/hero'
import { MainFeatures } from '~/components/sections/home/main-features'
import { PowerfulDevTools } from '~/components/sections/home/powerful-dev-tools'

const HomePage = () => {
  return (
    <PageLayout>
      <Meta />

      <Header />

      <Hero />
      <MainFeatures />
      <PowerfulDevTools />

      <Footer />
    </PageLayout>
  )
}

export default HomePage

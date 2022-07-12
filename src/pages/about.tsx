import { Meta } from '~/components/common/meta'
import { Footer } from '~/components/layout/footer'
import { Header } from '~/components/layout/header'
import { PageLayout } from '~/components/layout/page'
import { Investors } from '~/components/sections/about/investors'
import { Team } from '~/components/sections/about/team'
import { Work } from '~/components/sections/about/work'
// import { Hero } from '~/components/sections/pricing/hero'
// import { Plans } from '~/components/sections/pricing/plans'

const About = () => {
  return (
    <PageLayout>
      <Meta />

      <Header />
      <Work />
      <Team />
      <Investors />
      <Footer />
    </PageLayout>
  )
}

export default About

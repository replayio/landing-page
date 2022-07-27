import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { Hero } from '~/components/sections/about/hero'
import { Investors } from '~/components/sections/about/investors'
import { Team } from '~/components/sections/about/team'
import { Work } from '~/components/sections/about/work'
// import { Hero } from '~/components/sections/pricing/hero'
// import { Plans } from '~/components/sections/pricing/plans'

const About = () => {
  return (
    <PageLayout>
      <Meta title="About | Replay" />
      <Hero />
      <Work />
      <Team />
      <Investors />
    </PageLayout>
  )
}

export default About

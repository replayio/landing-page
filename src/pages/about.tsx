import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { Hero } from '~/components/sections/about/hero'
import { Investors } from '~/components/sections/about/investors'
import { Team } from '~/components/sections/about/team'
import { Work } from '~/components/sections/about/work'

const About = () => {
  return (
    <PageLayout>
      <Meta title="About | Replay" />
      <Hero />
      <Work />
      <Team />
      <Investors />
      <br />
      <br />
    </PageLayout>
  )
}

export default About

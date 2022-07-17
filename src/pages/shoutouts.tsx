import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { Hero } from '~/components/sections/shoutouts/hero'
import { Shouts } from '~/components/sections/shoutouts/shouts'

const ShoutOuts = () => {
  return (
    <PageLayout>
      <Meta />
      <Hero />
      <Shouts />
    </PageLayout>
  )
}

export default ShoutOuts

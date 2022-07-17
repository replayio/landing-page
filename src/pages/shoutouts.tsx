import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { Hero } from '~/components/sections/about/hero'

const ShoutOuts = () => {
  return (
    <PageLayout>
      <Meta />
      <Hero />
      <ShoutOuts />
    </PageLayout>
  )
}

export default ShoutOuts

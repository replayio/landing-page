import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { Shouts } from '~/components/sections/shoutouts/shouts'

const ShoutOuts = () => {
  return (
    <PageLayout>
      <Meta title="Shoutouts | Replay" />
      <Shouts />
    </PageLayout>
  )
}

export default ShoutOuts

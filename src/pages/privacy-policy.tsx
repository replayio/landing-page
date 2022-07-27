import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { Policy } from '~/components/sections/legal/policy'

const Privacy = () => {
  return (
    <PageLayout>
      <Meta title="Privacy | Replay" />
      <Policy />
    </PageLayout>
  )
}

export default Privacy

import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { Security } from '~/components/sections/legal/security'

const Privacy = () => {
  return (
    <PageLayout>
      <Meta title="Security and Privacy | Replay" />
      <Security />
      <br />
      <br />
    </PageLayout>
  )
}

export default Privacy

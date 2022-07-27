import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { TermsOfService } from '~/components/sections/legal/terms'

const Terms = () => {
  return (
    <PageLayout>
      <Meta title="Terms of Service | Replay" />
      <TermsOfService />
    </PageLayout>
  )
}

export default Terms

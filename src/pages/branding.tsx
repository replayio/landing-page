import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import BrandingDownloadWidget from '~/components/sections/branding/index'

const Branding = () => {
  return (
    <PageLayout>
      <Meta title="Branding | Replay" />
      <BrandingDownloadWidget />
    </PageLayout>
  )
}

export default Branding

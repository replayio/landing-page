import { PageLayout } from '~/components/layout/page'
import { Hero } from '~/components/sections/404/hero'

const NotFound = () => {
  return (
    <PageLayout showFooter={false}>
      <Hero />
    </PageLayout>
  )
}

export default NotFound

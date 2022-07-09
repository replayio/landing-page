import { Meta } from '~/components/common/meta'
import { AnnouncementBar } from '~/components/layout/announcement-bar'
import { Footer } from '~/components/layout/footer'
import { Header } from '~/components/layout/header'
import { PageLayout } from '~/components/layout/page'
import { Link } from '~/components/primitives/link'
import { AsyncCollab } from '~/components/sections/home/async-collab'
import { FastAndSecure } from '~/components/sections/home/fast-and-secure'
import { Hero } from '~/components/sections/home/hero'
import { MainFeatures } from '~/components/sections/home/main-features'
import { OverboardStory } from '~/components/sections/home/overboard-story'
import { PowerfulDevTools } from '~/components/sections/home/powerful-dev-tools'
import { SoftwareTellsStory } from '~/components/sections/home/software-tells-story'
import { Testimonials } from '~/components/sections/home/testimonials'
import { TrustedBy } from '~/components/sections/home/trusted-by'

const HomePage = () => {
  return (
    <PageLayout>
      <Meta />

      <AnnouncementBar
        text={
          <>
            Proudly backed by Andreessen Horowitz.{' '}
            <Link href="/">Read&nbsp;More</Link>
          </>
        }
      />
      <Header />

      <Hero />
      <OverboardStory />
      <MainFeatures />
      <PowerfulDevTools />
      <AsyncCollab />
      <Testimonials />
      <TrustedBy />
      <FastAndSecure />
      <SoftwareTellsStory />

      <Footer />
    </PageLayout>
  )
}

export default HomePage

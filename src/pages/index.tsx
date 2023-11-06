import { basehub } from 'basehub'
import { InferGetStaticPropsType } from 'next'
import { IntercomProvider } from 'react-use-intercom'

import { PageLayout } from '~/components/layout/page'
import { DeveloperTools } from '~/components/sections/homepage/developer-tools'
import { Features } from '~/components/sections/homepage/features'
import { Hero } from '~/components/sections/homepage/hero'
import Prefooter from '~/components/sections/homepage/prefooter'
import { Security } from '~/components/sections/homepage/security'
import { Testimonials } from '~/components/sections/homepage/testimonials'
import { TrustedTeams } from '~/components/sections/homepage/trusted-teams'
import ValueProp from '~/components/sections/homepage/value-prop'

const INTERCOM_APP_ID = 'k7f741xx'

const HomePage = ({
  homepage
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <IntercomProvider appId={INTERCOM_APP_ID}>
      <PageLayout>
        <Hero
          title={homepage.heroTitle}
          ctas={homepage.ctAs.items.map((cta) => ({
            href: cta.href,
            label: cta._title,
            key: cta._id,
            type: cta.type as 'primary' | 'secondary'
          }))}
          subtitleVariants={homepage.subtitleVariants.items.map(
            (subtitleVariant) => ({
              content: subtitleVariant.content.json.content,
              key: subtitleVariant._id
            })
          )}
        />
        <div
          style={{
            paddingTop: '5px',
            background:
              'linear-gradient(180deg, #000000 0%, rgba(13, 18, 29, 0.4) 12.28%, #0D121D 38.48%, #000000 54.71%, #000000 62.85%, #0D121D 72.4%, #000000 98.2%)'
          }}
        >
          <ValueProp
            title={homepage.travelBackInTimeSection.title}
            subtitle={homepage.travelBackInTimeSection.subtitle.json.content}
            items={homepage.travelBackInTimeSection.features.items.map(
              (feature) => ({
                key: feature._id,
                title: feature._title,
                content: feature.content.json.content
              })
            )}
          />
          <DeveloperTools />
          <Features />
          <Security />
          <TrustedTeams />
          <Testimonials />
          <Prefooter />
        </div>
      </PageLayout>
    </IntercomProvider>
  )
}

export const getStaticProps = async () => {
  const query = await basehub().query({
    homepage: {
      heroTitle: {
        __scalar: true
      },
      subtitleVariants: {
        items: {
          _id: true,
          content: {
            json: {
              content: true
            }
          }
        }
      },
      ctAs: {
        items: {
          _id: true,
          _title: true,
          href: true,
          type: true
        }
      },
      travelBackInTimeSection: {
        title: true,
        subtitle: { json: { content: true } },
        features: {
          items: {
            _id: true,
            _title: true,
            content: { json: { content: true }, html: true }
          }
        }
      }
    }
  })

  return {
    props: { homepage: query.homepage },
    revalidate: 30
  }
}

export default HomePage

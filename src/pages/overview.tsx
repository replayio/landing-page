import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { Section } from '~/components/layout/section'
import { TitleAndSubtitle } from '~/components/primitives/texts'

const Overview = () => {
  return (
    <PageLayout>
    <Meta title="Overview | Replay" />
    <Section
      id="homepage-overview"
      className={s.section}
      data-sitemap
      data-sitemap-icon="workflow"
      data-sitemap-short-title="Record"
      data-sitemap-complete-title="Freeze bugs in time."
      ref={inViewRef}
    >
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Travel Back in Time', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Replay is a next generation time travel debugger like nothing you’ve seen before.  With low overhead the chrome based browser records just enough so it can be replayed exactly and inspected down to the finest detail.
              <br></br>
              <br></br>
              <Link href="https://app.replay.io/team/new" aria-label="Create a team">
                Learn More
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </span>
          )
        }}
      />
    </Section>
    </PageLayout>
  )
}

export default Overview

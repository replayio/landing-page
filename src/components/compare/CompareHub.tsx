import Link from 'next/link'
import { Container } from '~/components/Container'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { BugReportSection, Faqs, FinalCTA } from '~/components/seo-landing/SeoLandingPage'
import { ContentPageHeader } from '~/components/content-page/ContentPageHeader'
import { seoVariants } from '~/components/seo-landing/content'
import { ComparisonTable } from './ComparisonTable'
import { COMPARE_HUB_PATH, formatVerified } from './ComparePage'
import { RELATIONSHIP_GROUPS, compareHub, competitors, replayColumn } from './content'

const latestVerified = competitors
  .map((c) => c.lastVerified)
  .sort()
  .at(-1)!

function Matrix() {
  return (
    <section id="side-by-side" className="scroll-mt-24 bg-gray-50 py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            Side by side
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-gray-600">
            The same questions asked of every tool. Scroll sideways for more, or open a comparison
            for the detail.
          </p>
          <div className="mt-8">
            <ComparisonTable
              caption="Replay QA compared with other QA and testing tools"
              columns={[
                { name: 'Replay QA', cells: replayColumn, highlight: true },
                ...competitors.map((c) => ({ name: c.name, href: c.path, cells: c.matrix }))
              ]}
            />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-gray-500">
            Based on each vendor’s public site and documentation, last verified{' '}
            {formatVerified(latestVerified)}. Sources are listed on each comparison page. Product
            names are trademarks of their respective owners and are used for identification only.
          </p>
        </div>
      </Container>
    </section>
  )
}

function Groups() {
  return (
    <section className="bg-white pb-16 md:pb-20">
      <Container>
        <div className="mx-auto flex max-w-5xl flex-col gap-12">
          {RELATIONSHIP_GROUPS.map((group) => (
            <div key={group.relationship}>
              <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                {group.heading}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {competitors
                  .filter((c) => c.relationship === group.relationship)
                  .map((c) => (
                    <Link
                      key={c.key}
                      href={c.path}
                      className="group rounded-xl border border-gray-200 bg-gray-50 p-6 transition hover:border-accent/40 hover:bg-accent/5"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {c.relationship === 'diy' ? 'Your coding agent' : `Replay QA vs ${c.name}`}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{c.oneLiner}</p>
                      <span className="mt-4 inline-block text-sm font-medium text-accent transition group-hover:opacity-80">
                        Read the comparison →
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function CompareHub() {
  return (
    <>
      <Header />
      <PageContentAnimate>
        <ContentPageHeader
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Compare', href: COMPARE_HUB_PATH }
          ]}
          eyebrow={compareHub.eyebrow}
          title={compareHub.h1}
          intro={compareHub.subhead}
          meta={[
            `${competitors.length} comparisons`,
            `Last verified ${formatVerified(latestVerified)}`,
            <a key="table" href="#side-by-side" className="text-accent hover:opacity-80">
              Jump to the side-by-side table
            </a>
          ]}
        />
        <Groups />
        <Matrix />
        <BugReportSection />
        <div className="bg-white pt-16 md:pt-24" />
        <Faqs
          faqs={compareHub.faqs}
          related={seoVariants.map((v) => ({ label: v.eyebrow, href: v.path }))}
        />
        <FinalCTA utmSource="compare" />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

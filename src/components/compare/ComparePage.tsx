import { Container } from '~/components/Container'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { PageContentAnimate } from '~/components/common/page-content-animate'
import { siteOrigin } from '~/lib/constants'
import { BugReportSection, Faqs, FinalCTA, Hero } from '~/components/seo-landing/SeoLandingPage'
import { ComparisonTable } from './ComparisonTable'
import { competitors, replayColumn, type Competitor, type Point } from './content'

export const COMPARE_HUB_PATH = '/compare'

export function formatVerified(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

function headings(c: Competitor) {
  switch (c.relationship) {
    case 'alternative':
      return {
        eyebrow: `Replay QA vs ${c.name}`,
        further: 'Where Replay QA goes further',
        stronger: `Where ${c.name} is stronger`,
        together: 'Using both',
        chooseThem: `Choose ${c.name} if`
      }
    case 'alongside':
      return {
        eyebrow: `Replay QA vs ${c.name}`,
        further: 'Where Replay QA goes further',
        stronger: `Where ${c.name} is stronger`,
        together: 'How they work together',
        chooseThem: `Choose ${c.name} if`
      }
    case 'diy':
      return {
        eyebrow: 'Replay QA vs your coding agent',
        further: 'What changes with Replay QA',
        stronger: 'What your coding agent does well',
        together: 'Use them together',
        chooseThem: 'Ask your agent directly if'
      }
  }
}

function PointSection({
  label,
  points,
  tone = 'white'
}: {
  label: string
  points: Point[]
  tone?: 'white' | 'gray'
}) {
  return (
    <section className={tone === 'gray' ? 'bg-gray-50 py-16 md:py-20' : 'bg-white py-16 md:py-20'}>
      <Container>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">{label}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {points.map((point) => (
              <div
                key={point.title}
                className={
                  tone === 'gray'
                    ? 'rounded-xl border border-gray-200 bg-white p-6'
                    : 'rounded-xl border border-gray-200 bg-gray-50 p-6'
                }
              >
                <h3 className="font-semibold text-gray-900">{point.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Summary({ competitor }: { competitor: Competitor }) {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">
            The short version
          </p>
          <ul className="mt-6 flex flex-col gap-4">
            {competitor.tldr.map((line) => (
              <li key={line} className="flex gap-3 text-lg leading-relaxed text-gray-700">
                <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

function AtAGlance({ competitor }: { competitor: Competitor }) {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            At a glance
          </h2>
          <div className="mt-8">
            <ComparisonTable
              caption={`Replay QA compared with ${competitor.name}`}
              columns={[
                { name: 'Replay QA', cells: replayColumn, highlight: true },
                { name: competitor.name, cells: competitor.matrix }
              ]}
            />
          </div>
          <Sources competitor={competitor} />
        </div>
      </Container>
    </section>
  )
}

function Sources({ competitor }: { competitor: Competitor }) {
  return (
    <div className="mt-4 text-xs leading-relaxed text-gray-500">
      <p>
        Based on{' '}
        {competitor.relationship === 'diy'
          ? 'public documentation'
          : `${competitor.name}’s public site and documentation`}
        , last verified {formatVerified(competitor.lastVerified)}. Products change; check the
        sources for the latest.{' '}
        {competitor.sources.map((url, i) => (
          <span key={url}>
            {i > 0 && ' · '}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="underline decoration-gray-300 transition hover:text-gray-700"
            >
              {url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
            </a>
          </span>
        ))}
      </p>
      <p className="mt-1">
        Product names are trademarks of their respective owners and are used for identification
        only.
      </p>
    </div>
  )
}

function Choose({ competitor }: { competitor: Competitor }) {
  const { chooseThem } = headings(competitor)
  const columns = [
    { heading: chooseThem, items: competitor.chooseThemIf, accent: false },
    { heading: 'Choose Replay QA if', items: competitor.chooseReplayIf, accent: true }
  ]

  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {columns.map((col) => (
            <div
              key={col.heading}
              className={
                col.accent
                  ? 'rounded-2xl border border-accent/20 bg-accent/5 p-8'
                  : 'rounded-2xl border border-gray-200 bg-gray-50 p-8'
              }
            >
              <h2 className="text-xl font-bold text-gray-900">{col.heading}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-gray-700">
                    <span
                      className={
                        col.accent
                          ? 'mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent'
                          : 'mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400'
                      }
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Breadcrumbs({ competitor }: { competitor: Competitor }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteOrigin}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compare',
        item: `${siteOrigin}${COMPARE_HUB_PATH}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: headings(competitor).eyebrow,
        item: `${siteOrigin}${competitor.path}`
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function relatedLinks(competitor: Competitor) {
  const sameGroup = competitors
    .filter((c) => c.key !== competitor.key && c.relationship === competitor.relationship)
    .slice(0, 3)
  return [
    { label: 'All comparisons', href: COMPARE_HUB_PATH },
    ...sameGroup.map((c) => ({ label: headings(c).eyebrow, href: c.path }))
  ]
}

export function ComparePage({ competitor }: { competitor: Competitor }) {
  const h = headings(competitor)
  const { relationship, together = [], replayFurther, strongerAt } = competitor

  // Section order carries the framing: complementary tools lead with how they fit together,
  // alternatives lead with differences, and the DIY page leads with what the agent does well.
  const sections =
    relationship === 'alongside'
      ? [
          { label: h.together, points: together },
          { label: h.further, points: replayFurther },
          { label: h.stronger, points: strongerAt }
        ]
      : relationship === 'alternative'
        ? [
            { label: h.further, points: replayFurther },
            { label: h.stronger, points: strongerAt },
            { label: h.together, points: together }
          ]
        : [
            { label: h.stronger, points: strongerAt },
            { label: h.further, points: replayFurther },
            { label: h.together, points: together }
          ]

  return (
    <>
      <Header />
      <Breadcrumbs competitor={competitor} />
      <PageContentAnimate>
        <Hero
          eyebrow={h.eyebrow}
          h1={competitor.h1}
          subhead={competitor.subhead}
          utmSource={`compare-${competitor.key}`}
        />
        <Summary competitor={competitor} />
        <AtAGlance competitor={competitor} />
        {sections
          .filter((s) => s.points.length > 0)
          .map((s, i) => (
            <PointSection
              key={s.label}
              label={s.label}
              points={s.points}
              tone={i % 2 ? 'gray' : 'white'}
            />
          ))}
        <Choose competitor={competitor} />
        <BugReportSection />
        <div className="bg-white pt-16 md:pt-24" />
        <Faqs faqs={competitor.faqs} related={relatedLinks(competitor)} />
        <FinalCTA utmSource={`compare-${competitor.key}`} />
      </PageContentAnimate>
      <Footer />
    </>
  )
}

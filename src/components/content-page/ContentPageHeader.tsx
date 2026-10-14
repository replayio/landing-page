import Link from 'next/link'
import type { ReactNode } from 'react'
import { Container } from '~/components/Container'
import { siteOrigin } from '~/lib/constants'

export type Crumb = { label: string; href: string }

/**
 * Editorial header for informational pages (comparisons, guides, explainers): the reader came
 * to learn something, so it leads with orientation and substance rather than CTAs. Calls to
 * action belong at the end of the page, after the content has earned them.
 *
 * Renders the visible breadcrumb trail and its BreadcrumbList JSON-LD from the same data.
 * The last crumb is the current page.
 */
export function ContentPageHeader({
  breadcrumbs,
  eyebrow,
  title,
  intro,
  meta,
  children
}: {
  breadcrumbs: Crumb[]
  eyebrow?: string
  title: string
  intro: string
  /** Small facts under the intro, e.g. "Last verified October 14, 2026". */
  meta?: ReactNode[]
  /** Optional block below the header text, e.g. a summary card. */
  children?: ReactNode
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: `${siteOrigin}${crumb.href}`
    }))
  }
  const trail = breadcrumbs.slice(0, -1)

  return (
    <header className="bg-white pb-12 pt-[calc(var(--site-header-offset)+1rem)] sm:pb-16 sm:pt-[calc(var(--site-header-offset)+1.5rem)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Container>
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              {trail.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <Link href={crumb.href} className="transition-colors hover:text-accent">
                    {crumb.label}
                  </Link>
                  <span aria-hidden>/</span>
                </li>
              ))}
              <li aria-current="page" className="text-gray-900">
                {breadcrumbs.at(-1)?.label}
              </li>
            </ol>
          </nav>

          <div className="mt-8 border-b border-gray-200 pb-10">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
            )}
            <h1 className="mt-3 max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-gray-600">
              {intro}
            </p>
            {meta && meta.length > 0 && (
              <div className="mt-6 flex flex-col gap-1 text-sm text-gray-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
                {meta.map((item, i) => (
                  <span key={i} className="flex items-center gap-3">
                    {i > 0 && (
                      <span aria-hidden className="hidden sm:inline">
                        &middot;
                      </span>
                    )}
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {children && <div className="mt-10">{children}</div>}
        </div>
      </Container>
    </header>
  )
}

/** Bulleted "short version" card, for use as ContentPageHeader children. */
export function SummaryCard({
  label = 'The short version',
  items
}: {
  label?: string
  items: string[]
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
      <p className="text-sm font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-gray-700">
            <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

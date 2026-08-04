import { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { Container } from '~/components/Container'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { getBlogPosts, type BlogPost } from '~/lib/notion-blog'

const title = 'Blog Archive: Every Replay Post'
const description =
  'A complete index of every post on the Replay blog, from engineering deep dives to changelog updates, listed by year.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteOrigin}/blog/archive`
  },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/blog/archive`,
    title,
    description,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title,
    description,
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  }
}

// Matches /blog. The Notion data layer refreshes its own cache every 15 min.
export const revalidate = 1800

const YEAR_UNKNOWN = 'Undated'

const formatDate = (date: string | null) =>
  date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null

/** Group posts by publication year, newest year first, preserving the incoming order. */
function groupByYear(posts: BlogPost[]): Array<[string, BlogPost[]]> {
  const groups = new Map<string, BlogPost[]>()

  for (const post of posts) {
    const year = post.publishedAt ? String(new Date(post.publishedAt).getFullYear()) : YEAR_UNKNOWN
    const bucket = groups.get(year)
    if (bucket) bucket.push(post)
    else groups.set(year, [post])
  }

  return [...groups.entries()].sort(([a], [b]) => {
    if (a === YEAR_UNKNOWN) return 1
    if (b === YEAR_UNKNOWN) return -1
    return Number(b) - Number(a)
  })
}

/**
 * A plain, fully server-rendered index of every post.
 *
 * /blog server-renders only its first page of posts and loads the rest client side,
 * so a crawler never sees a link to the remainder. Ahrefs reported 114 posts as
 * orphaned for exactly that reason. This page gives every post one crawlable
 * internal link without changing how /blog behaves for readers.
 */
export default async function BlogArchivePage() {
  const posts = await getBlogPosts()
  const byYear = groupByYear(posts)

  return (
    <>
      <Header />

      <main className="bg-white pb-20 pt-[calc(var(--site-header-offset)+2rem)] sm:pt-[calc(var(--site-header-offset)+3rem)]">
        <Container>
          <section className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Replay.io Blog
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
              Archive
            </h1>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              Every post we have published, newest first.{' '}
              <Link href="/blog" className="text-accent underline-offset-4 hover:underline">
                Back to the blog
              </Link>
              .
            </p>
          </section>

          {posts.length === 0 ? (
            <p className="mx-auto mt-16 max-w-3xl text-center text-gray-600">
              No posts to show right now.
            </p>
          ) : (
            <div className="mx-auto mt-16 max-w-3xl">
              {byYear.map(([year, yearPosts]) => (
                <section key={year} className="mb-12">
                  <h2 className="mb-4 border-b border-gray-200 pb-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                    {year}
                  </h2>
                  <ul className="space-y-1">
                    {yearPosts.map((post) => {
                      const date = formatDate(post.publishedAt)
                      return (
                        <li key={post.slug}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="flex flex-col gap-1 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                          >
                            <span className="text-base text-gray-900">{post.title}</span>
                            {date ? (
                              <time
                                dateTime={post.publishedAt!}
                                className="flex-none text-sm tabular-nums text-gray-500"
                              >
                                {date}
                              </time>
                            ) : null}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </>
  )
}

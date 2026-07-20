import { Metadata } from 'next'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { Container } from '~/components/Container'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { getBlogPosts } from '~/lib/notion-blog'
import { BlogPostsExplorer } from './components/BlogPostsExplorer'

export const metadata: Metadata = {
  title: 'Blog — Replay',
  description: 'Engineering stories, changelog updates, and guides from the Replay team.',
  alternates: {
    canonical: `${siteOrigin}/blog`
  },
  openGraph: {
    url: `${siteOrigin}/blog`,
    title: 'Blog — Replay',
    description: 'Engineering stories, changelog updates, and guides from the Replay team.',
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: defaultMeta.twitter.site,
    title: 'Blog — Replay',
    description: 'Engineering stories, changelog updates, and guides from the Replay team.',
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  }
}

// 30 min; the Notion data layer (notion-blog.ts) refreshes its own cache every
// 15 min, well inside the ~1h S3 presigned URL expiry. Page-level revalidate
// is just a backstop for the rendered HTML.
export const revalidate = 1800

const INITIAL_PAGE_SIZE = 24

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const initialPosts = posts.slice(0, INITIAL_PAGE_SIZE)
  const initialTags = Array.from(new Set(initialPosts.flatMap((post) => post.tags)))

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
              Engineering stories, shipped.
            </h1>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              Product updates, case studies, and debugging insights from the Replay team.
            </p>
          </section>

          <BlogPostsExplorer
            initialPosts={initialPosts}
            totalCount={posts.length}
            initialTags={initialTags}
          />
        </Container>
      </main>

      <Footer />
    </>
  )
}

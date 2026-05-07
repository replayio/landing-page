import { Metadata } from 'next'
import { Suspense } from 'react'
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

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <Suspense fallback={null}>
        <Header className="!top-[0px] sm:!top-[0px]" />
      </Suspense>

      <main className="bg-white pb-20 pt-[calc(var(--header-height)+2rem)] sm:pt-[calc(var(--header-height)+3rem)]">
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

          <BlogPostsExplorer posts={posts} />
        </Container>
      </main>

      <Footer />
    </>
  )
}

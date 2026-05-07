import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/layout/header'
import { Container } from '~/components/Container'
import { defaultMeta, siteOrigin } from '~/lib/constants'
import { getBlogPostBySlug, getBlogPosts } from '~/lib/notion-blog'
import { BlogPostBody } from '../components/BlogPostBody'

type BlogPostPageProps = {
  params: {
    slug: string
  }
}

const formatDate = (date: string | null) => {
  if (!date) return null
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const postData = await getBlogPostBySlug(params.slug)

  if (!postData) {
    return {
      title: 'Post not found — Replay Blog'
    }
  }

  const { post } = postData
  const url = `${siteOrigin}/blog/${post.slug}`
  const description = post.excerpt || 'Read the latest engineering updates from Replay.'
  const image = post.coverImageUrl || defaultMeta.ogImage

  return {
    title: `${post.title} — Replay Blog`,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description,
      images: [{ url: image, width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      site: defaultMeta.twitter.site,
      creator: defaultMeta.twitter.handle,
      title: post.title,
      description,
      images: [{ url: image, width: 1200, height: 630 }]
    }
  }
}

export const revalidate = 3600

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const postData = await getBlogPostBySlug(params.slug)

  if (!postData) notFound()

  const { post, recordMap } = postData
  const formattedDate = formatDate(post.publishedAt)

  return (
    <>
      <Suspense fallback={null}>
        <Header className="!top-[0px] sm:!top-[0px]" />
      </Suspense>

      <main className="bg-white pb-20 pt-[calc(var(--header-height)+2rem)] sm:pt-[calc(var(--header-height)+3rem)]">
        <Container>
          <article className="mx-auto max-w-4xl">
            <p className="text-sm font-medium text-accent">
              <Link href="/blog" className="transition-colors hover:text-accent/80">
                &larr; All posts
              </Link>
            </p>

            <header className="mt-5 border-b border-gray-200 pb-8">
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-5xl">
                {post.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span>{post.authors.join(', ') || 'Replay Team'}</span>
                {formattedDate ? <span>&middot;</span> : null}
                {formattedDate ? <time dateTime={post.publishedAt!}>{formattedDate}</time> : null}
              </div>

              {post.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </header>

            <div className="prose prose-lg mt-10 max-w-none prose-headings:font-semibold prose-a:text-accent prose-pre:rounded-xl prose-img:rounded-xl">
              <BlogPostBody recordMap={recordMap} />
            </div>
          </article>
        </Container>
      </main>

      <Footer />
    </>
  )
}

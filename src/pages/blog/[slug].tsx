import { format, parseISO } from 'date-fns'
import Head from 'next/head'

import { Heading } from '~/components/common/heading'
import { Container } from '~/components/layout/container'
import { PageLayout } from '~/components/layout/page'

import { allPosts, Post } from '../../../.contentlayer/generated'

export async function getStaticPaths() {
  const paths: string[] = allPosts.map((post) => post.url)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const post: Post = allPosts.find(
    (post) => post._raw.flattenedPath === params.slug
  )
  return {
    props: {
      post
    }
  }
}

const PostLayout = ({ post }: { post: Post }) => {
  return (
    <PageLayout>
      <Head>
        <title>{post.title}</title>
      </Head>

      <article>
        <div>
          <time dateTime={post.date}>
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
          <Heading as="h1" size="sm">
            {post.title}
          </Heading>
        </div>

        <Container dangerouslySetInnerHTML={{ __html: post.body.html }} />
      </article>
    </PageLayout>
  )
}

export default PostLayout

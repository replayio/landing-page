import * as fs from 'fs'
import matter from 'gray-matter'
import type { GetStaticProps } from 'next'

import { Heading } from '~/components/common/heading'
import { Container } from '~/components/layout/container'
import { PageLayout } from '~/components/layout/page'

type Post = { title: string; content: string; slug: string }

type Posts = Post[]

const BlogPage = ({ posts }: { posts: Posts }) => {
  return (
    <PageLayout>
      <Container>
        <Heading as="h1" size="lg">
          Blog
        </Heading>

        {posts.map((post) => (
          <div key={post.slug}>
            <Heading as="h2" size="sm">
              {post.title}
            </Heading>
            <p>{post.content}</p>
          </div>
        ))}
      </Container>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: fs
        .readdirSync('src/pages/blog')
        .filter((filename) => filename.endsWith('.mdx'))
        .map((filename) => {
          const { content, data } = matter(
            fs.readFileSync(`src/pages/blog/${filename}`, 'utf-8')
          )

          return {
            content,
            title: data.title,
            slug: filename.replace('.mdx', '')
          }
        }) as Posts
    }
  }
}

export default BlogPage

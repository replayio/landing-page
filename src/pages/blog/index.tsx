import { Heading } from '~/components/common/heading'
import { Container } from '~/components/layout/container'
import { PageLayout } from '~/components/layout/page'

const BlogPage = () => {
  return (
    <PageLayout>
      <Container>
        <Heading as="h1" size="lg">
          Blog
        </Heading>
        <Heading size="sm">Performant Icon Systems in React</Heading>
        <p>
          A task every Design Systems engineer faces at some point is how the
          team will manage icons across design and development. I've been
          through countless rewrites of icons over the years and seen the toll
          it takes on development time, not to mention the team's morale. Today,
          we'll look at speeding up this process to make an easy and scalable
          icons solution for teams of any size while not sacrificing the user
          experience.
        </p>
      </Container>
    </PageLayout>
  )
}

export default BlogPage

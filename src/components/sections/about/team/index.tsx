import { FC } from 'react'

import { Carousel } from '~/components/common/carousel'
import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import s from './team.module.scss'
import { UserCard } from './user-card'

const team = [
  {
    position: 'CTO',
    name: 'Jason Laster',
    bio: 'Jason has contributed to debuggers in several runtimes and prior to Replay was the tech lead for the Firefox Debugger. When not debugging the debugger, you’ll likely find him in the woodworking studio or outside with his pup Walle.',
    socials: {
      twitter: 'https://twitter.com/',
      linkedin: 'https://www.linkedin.com/'
    }
  },
  {
    position: 'CTO',
    name: 'Brian Hackett',
    bio: 'Brian has had a longtime passion for helping people understand hugely complex software systems, starting with a Stanford Ph.D. and continuing through 10 years at Mozilla, where he worked on JavaScript VM optimizations.',
    socials: {
      twitter: 'https://twitter.com/',
      linkedin: 'https://www.linkedin.com/'
    }
  },
  {
    position: 'Community lead',
    name: 'Cecelia Martinez',
    bio: 'Cecelia is dedicated to building developer communities that are inclusive, constructive, and make software development a better experience for all. Her role as Community Lead at Replay.io involves coding.',
    socials: {
      twitter: 'https://twitter.com/',
      linkedin: 'https://www.linkedin.com/'
    }
  },
  {
    position: 'Community lead',
    name: 'Cecelia Martinez',
    bio: 'Cecelia is dedicated to building developer communities that are inclusive, constructive, and make software development a better experience for all. Her role as Community Lead at Replay.io involves coding.',
    socials: {
      twitter: 'https://twitter.com/',
      linkedin: 'https://www.linkedin.com/'
    }
  }
]

export const Team: FC = () => {
  return (
    <Section className={s.section}>
      <Container className={s.container}>
        <div className={s.heading}>
          <Heading as="h2" size="lg">
            Meet the team
          </Heading>
          <p>
            We're a distributed company, founded by people who have spent years
            working on fully distributed teams at companies like Mozilla. We
            work across the globe, so we focus less on hours and more on
            building a great product. We build for the long term: it's a relay,
            not a sprint.
          </p>
        </div>
        <div className={s.plans__mobile}>
          <Carousel
            className={s.slider}
            config={{
              align: 'start',
              containScroll: 'trimSnaps'
            }}
            slideClassName={s['slide']}
          >
            {team.map((user, i) => (
              <UserCard key={i} data={user} />
            ))}
          </Carousel>
        </div>
      </Container>
    </Section>
  )
}

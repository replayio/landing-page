import { FC } from 'react'

import { Carousel } from '~/components/common/carousel'
import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { useMedia } from '~/hooks/use-media'

import { team } from './team'
import s from './team.module.scss'
import { UserCard } from './user-card'

export const Team: FC = () => {
  const isMobile = useMedia('(max-width: 768px)')
  const isDesktop = useMedia('(min-width: 1024px)')

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
      </Container>
      <div>
        <Container size="md" className={s['slider-container']}>
          <div className={s.team}>
            <Carousel
              dots={isMobile}
              arrows={!isMobile}
              className={s.slider}
              config={{
                align: 'center',
                containScroll: isDesktop ? 'trimSnaps' : ''
              }}
              slideClassName={s['slide']}
            >
              {team.map((member, i) => (
                <UserCard key={i} member={member} />
              ))}
            </Carousel>
          </div>
        </Container>
      </div>
    </Section>
  )
}

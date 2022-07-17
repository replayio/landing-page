import { FC } from 'react'

import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'

// import { useMedia } from '~/hooks/use-media'
import { UserCard } from '../about/team/user-card'
import { shouts } from './shouts'
import s from './shouts.module.scss'

export const Shouts: FC = () => {
  //   const isMobile = useMedia('(max-width: 768px)')
  //   const isDesktop = useMedia('(min-width: 1024px)')

  return (
    <Section className={s.section}>
      <div>
        <Container size="md" className={s['slider-container']}>
          <div className={s.team}>
            {shouts.map((member, i) => (
              <UserCard key={i} member={member} />
            ))}
          </div>
        </Container>
      </div>
    </Section>
  )
}

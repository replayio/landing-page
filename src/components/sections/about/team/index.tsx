import { FC, useState } from 'react'

import { Carousel } from '~/components/common/carousel'
import Modal from '~/components/common/modal'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { useMedia } from '~/hooks/use-media'
import { useToggleState } from '~/hooks/use-toggle-state'

import { team } from './team'
import s from './team.module.scss'
import { UserCard, UserCardProps } from './user-card'

export const Team: FC = () => {
  const isMobile = useMedia('(max-width: 768px)')
  const isDesktop = useMedia('(min-width: 1361px)')

  const { isOn: modalIsOn, handleToggle: handleToggleModal } = useToggleState()
  const [shownMember, setShownMember] = useState<UserCardProps['member']>()

  const handleModal = (member: UserCardProps['member']) => {
    setShownMember(member)
    handleToggleModal()
  }

  return (
    <Section className={s.section}>
      <Container className={s.container}>
        <div className={s.heading}>
          <TitleAndSubtitle
            title={{
              children: <>Meet the Team</>,
              hero: true
            }}
            subtitle={{
              className: s.subtitle,
              children:
                "We're a distributed company, founded by people who have spent years working on fully distributed teams at companies like Mozilla. We work across the globe, so we focus less on hours and more on building a great product. We build for the long term: it's a relay, not a sprint."
            }}
          />
        </div>
      </Container>
      <div className={s['fade-container']}>
        <Container size="md" className={s['slider-container']}>
          <div className={s.team}>
            <Carousel
              dots={isMobile}
              arrows={!isMobile}
              className={s.slider}
              config={{
                align: 'center',
                /* @ts-ignore */
                containScroll: isDesktop ? 'trimSnaps' : '',
                skipSnaps: true
              }}
              slideClassName={s['slide']}
              viewportClassname={s['slider__viewport']}
              containerClassname={s['slider-container']}
            >
              {team.map((member, i) => (
                <UserCard handleModal={handleModal} key={i} member={member} />
              ))}
            </Carousel>
          </div>
          {modalIsOn && shownMember && (
            <Modal isModalOpen={modalIsOn} onOpenChange={handleToggleModal}>
              <UserCard modalIsOn={modalIsOn} member={shownMember} />
            </Modal>
          )}
        </Container>
      </div>
    </Section>
  )
}

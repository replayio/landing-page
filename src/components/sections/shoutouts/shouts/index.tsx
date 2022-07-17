import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'

import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'

import { UserCard } from '../../about/team/user-card'
import { shouts } from './shouts'
import s from './shouts.module.scss'

const breakpoints = {
  default: 3,
  1100: 2,
  768: 1
}

export const Shouts: FC = () => {
  const [visibleShoutsLength, setVisibleShoutsLength] = useState(9)
  const [visibleShouts, setVisibleShouts] = useState(
    shouts.slice(0, visibleShoutsLength)
  )

  useEffect(() => {
    setVisibleShouts(shouts.slice(0, visibleShoutsLength))
  }, [visibleShoutsLength])

  return (
    <Section className={s.section}>
      <Container size="md" className={s.container}>
        <Masonry
          breakpointCols={breakpoints}
          className={clsx(s.masonry, {
            [s['faded']]: visibleShoutsLength < shouts.length
          })}
          columnClassName={s.masonry__column}
        >
          {visibleShouts.map((member, i) => (
            <UserCard key={i} member={member} />
          ))}
        </Masonry>
        {visibleShoutsLength < shouts.length && (
          <button
            onClick={() => setVisibleShoutsLength(visibleShoutsLength + 9)}
          >
            Show more
            <ArrowDown />
          </button>
        )}
      </Container>
    </Section>
  )
}

const ArrowDown = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.75 3.75L12.75 3L11.25 3L11.25 3.75L12.75 3.75ZM11.25 20.25C11.25 20.6642 11.5858 21 12 21C12.4142 21 12.75 20.6642 12.75 20.25L11.25 20.25ZM11.25 3.75L11.25 20.25L12.75 20.25L12.75 3.75L11.25 3.75Z" />
    <path
      d="M18.75 13.5L12 20.25L5.25 13.5"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
)

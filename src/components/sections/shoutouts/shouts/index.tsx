import clsx from 'clsx'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'

import { Heading } from '~/components/common/heading'
import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { useMedia } from '~/hooks/use-media'
import bg from '~/public/images/shoutouts/bg.svg'

import { UserCard } from '../../about/team/user-card'
import { shouts } from './shouts'
import s from './shouts.module.scss'

export const Shouts: FC = () => {
  const isMobileSm = useMedia('(max-width: 435px)')

  const [visibleShoutsLength, setVisibleShoutsLength] = useState(9)
  const [visibleShouts, setVisibleShouts] = useState(shouts.slice(0, visibleShoutsLength))

  const remainingItemsLength = shouts?.length - visibleShoutsLength

  useEffect(() => {
    setVisibleShouts(shouts.slice(0, visibleShoutsLength))
  }, [visibleShoutsLength])

  return (
    <Section className={s.section}>
      <Container size="md" className={s.container}>
        <div className={s['heading']}>
          <Heading as="h1" size="sm">
            Everyone claims{isMobileSm && <br />} to be magical.
            <br />
            <span className={s.highlighted}> Replay is actually magical!</span>
          </Heading>
          <span>
            Replay is one of those rare experiences that feels incredibly simple and obvious, and at
            the same time, profoundly deep and complex.
          </span>
        </div>
        <Masonry
          breakpointCols={3}
          className={clsx(s.masonry, {
            [s['faded'] as string]: visibleShoutsLength < shouts.length
          })}
          columnClassName={s.masonry__column}
        >
          {visibleShouts.map((member, i) => (
            <UserCard key={i} member={member} />
          ))}
        </Masonry>
        <Masonry
          breakpointCols={2}
          className={clsx(s.masonry__md, {
            [s['faded'] as string]: visibleShoutsLength < shouts.length
          })}
          columnClassName={s.masonry__md__column}
        >
          {visibleShouts.map((member, i) => (
            <UserCard key={i} member={member} />
          ))}
        </Masonry>
        <div
          className={clsx(s['mobile-list'], {
            [s['faded'] as string]: visibleShoutsLength < shouts.length
          })}
        >
          {visibleShouts.map((member, i) => (
            <UserCard key={i} member={member} />
          ))}
        </div>
        {visibleShoutsLength < shouts.length && (
          <button
            className="mt-12 min-w-[200px] bg-slate-900 text-white hover:bg-slate-800 hover:text-slate-100"
            onClick={() =>
              setVisibleShoutsLength(visibleShoutsLength + (remainingItemsLength > 14 ? 9 : 14))
            }
          >
            Show more
            <ArrowDown />
          </button>
        )}
        <div className={s['bg']}>
          <Image priority src={bg} alt="section background" />
        </div>
      </Container>
    </Section>
  )
}

const ArrowDown = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.75 3.75L12.75 3L11.25 3L11.25 3.75L12.75 3.75ZM11.25 20.25C11.25 20.6642 11.5858 21 12 21C12.4142 21 12.75 20.6642 12.75 20.25L11.25 20.25ZM11.25 3.75L11.25 20.25L12.75 20.25L12.75 3.75L11.25 3.75Z" />
    <path
      d="M18.75 13.5L12 20.25L5.25 13.5"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
)

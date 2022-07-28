import Image, { StaticImageData } from 'next/future/image'
import { FC } from 'react'

import { Link } from '~/components/primitives/link'
import linkedinImg from '~/public/images/about/linkedin.svg'
import twitterImg from '~/public/images/about/twitter.svg'

import s from './usercard.module.scss'

export interface UserCardProps {
  modalIsOn?: boolean
  handleModal?: (member: UserCardProps['member']) => void
  member: {
    image: StaticImageData
    position?: string
    job?: string
    name: string
    bio?: string
    shout?: string
    socials?: {
      twitter?: string
      linkedin?: string
    }
  }
}

export const UserCard: FC<UserCardProps> = ({
  member,
  modalIsOn,
  handleModal
}) => {
  return (
    <div className={s.card}>
      <Image src={member.image} alt={member.name} />
      {member.shout && <p className={s.shout}>{member.shout}</p>}
      {member.position && <span className={s.position}>{member.position}</span>}
      <span className={s.name}>{member.name}</span>
      {member.job && <span className={s.job}>{member.job}</span>}
      {member.bio && (
        <p className={s.bio}>
          {member.bio.length > 195 && !modalIsOn
            ? member.bio.slice(0, 195) + '... '
            : member.bio}
          {member.bio.length > 195 && !modalIsOn && (
            <button onClick={() => handleModal && handleModal(member)}>
              See more
            </button>
          )}
        </p>
      )}
      {member.socials && (
        <ul>
          {member.socials.twitter && (
            <li>
              <Link href={member.socials.twitter}>
                <Image src={twitterImg} alt="twitter" />
              </Link>
            </li>
          )}
          {member.socials.linkedin && (
            <li>
              <Link href={member.socials.linkedin}>
                <Image src={linkedinImg} alt="linkedin" />
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

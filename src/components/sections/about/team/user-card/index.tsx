import Image, { StaticImageData } from 'next/image'
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
      <Image
        src={member.image}
        placeholder="blur"
        alt={`${member.name} image`}
      />
      {member.shout && <p className={s.shout}>{member.shout}</p>}
      {member.position && <h4 className={s.position}>{member.position}</h4>}
      <h3 className={s.name}>{member.name}</h3>
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
        <nav>
          {member.socials.twitter && (
            <Link href={member.socials.twitter}>
              <Image src={twitterImg} alt="twitter" />
            </Link>
          )}
          {member.socials.linkedin && (
            <Link href={member.socials.linkedin}>
              <Image src={linkedinImg} alt="linkedin" />
            </Link>
          )}
        </nav>
      )}
    </div>
  )
}

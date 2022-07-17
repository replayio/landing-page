import Image, { StaticImageData } from 'next/future/image'
import { FC } from 'react'

import { Link } from '~/components/primitives/link'
import linkedinImg from '~/public/images/about/linkedin.svg'
import twitterImg from '~/public/images/about/twitter.svg'

import s from './usercard.module.scss'

interface DataProps {
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

export const UserCard: FC<DataProps> = ({ member }) => {
  return (
    <div className={s.card}>
      <Image src={member.image} />
      {member.shout && <p className={s.shout}>{member.shout}</p>}
      <span className={s.position}>{member.position}</span>
      <span className={s.name}>{member.name}</span>
      <span className={s.job}>{member.job}</span>
      {member.bio && <p className={s.bio}>{member.bio}</p>}
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

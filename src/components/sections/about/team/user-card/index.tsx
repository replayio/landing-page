import Image, { StaticImageData } from 'next/future/image'
import { FC } from 'react'

import { Link } from '~/components/primitives/link'
import linkedinImg from '~/public/images/about/linkedin.svg'
import twitterImg from '~/public/images/about/twitter.svg'

import s from './usercard.module.scss'

interface DataProps {
  member: {
    image: StaticImageData
    position: string
    name: string
    bio?: string
    socials: {
      twitter?: string
      linkedin?: string
    }
  }
}

export const UserCard: FC<DataProps> = ({ member }) => {
  return (
    <div className={s.card}>
      <Image src={member.image} />
      <span>{member.position}</span>
      <span>{member.name}</span>
      {member.bio && <p>{member.bio}</p>}
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
    </div>
  )
}

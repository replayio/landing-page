import Image from 'next/future/image'
import { FC } from 'react'

import { Link } from '~/components/primitives/link'
import linkedinImg from '~/public/images/about/linkedin.svg'
import twitterImg from '~/public/images/about/twitter.svg'

import s from './usercard.module.scss'

interface DataProps {
  data: {
    position: string
    name: string
    bio: string
    socials: {
      twitter?: string
      linkedin?: string
    }
  }
}

export const UserCard: FC<DataProps> = ({ data }) => {
  return (
    <div className={s.card}>
      <span>{data.position}</span>
      <span>{data.name}</span>
      <p>{data.bio}</p>
      <ul>
        {data.socials.twitter && (
          <li>
            <Link href={data.socials.twitter}>
              <Image src={twitterImg} alt="twitter" />
            </Link>
          </li>
        )}
        {data.socials.linkedin && (
          <li>
            <Link href={data.socials.linkedin}>
              <Image src={linkedinImg} alt="linkedin" />
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

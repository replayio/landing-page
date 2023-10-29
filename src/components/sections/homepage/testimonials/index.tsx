import dynamic, { LoaderComponent } from 'next/dynamic'
import Image from 'next/image'

import { Section } from '~/components/layout/section'
import { useTabletLgBreakpoint } from '~/hooks/use-media'
import { getImageSizes } from '~/lib/utils/image'
const Sky = dynamic(
  () => import('~/components/common/sky').then((m) => m.Sky) as LoaderComponent,
  {
    ssr: false
  }
)

import s from './testimonials.module.scss'

export const Testimonials = () => {
  const isTablet = useTabletLgBreakpoint()

  return (
    <Section id="homepage-testimonials" className={s.section}>
      <div className={s['bg-container']}>
        <div className={s['child']}>
          <Sky />
        </div>
      </div>

      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.testimonialsWrapper}>
            {data.slice(0, isTablet ? 6 : data.length).map((item) => (
              <div className={s.testimonial} key={item.id}>
                <p className={s.quote}>{item.quote}</p>

                <div className={s.author}>
                  <Image
                    src={String(item.author.avatar.url)}
                    alt={`${item.author.name}'s avatar`}
                    width={32}
                    height={32}
                    sizes={getImageSizes(3, 3, 3)}
                  />
                  <div>
                    <p className={s.name}>{item.author.name}</p>

                    {item.author.jobPosition}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

type DataType = {
  id: number
  quote: string
  author: {
    avatar: { url: string }
    name: string
    jobPosition: React.ReactNode
  }
}

const data: DataType[] = [
  {
    id: 3,
    quote:
      '“If a picture is worth a thousand words, a replay is worth a thousand pictures”',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/zack-rosen.jpg'
      },
      name: 'Zack Rosen',
      jobPosition: (
        <p className={s.position}>
          CEO,{' '}
          <Image
            alt="pantheon"
            src="/images/homepage/testimonials/pantheon.png"
            quality={100}
            width={12}
            height={12}
            role="icon"
          />
          Pantheon
        </p>
      )
    }
  },

  {
    id: 2,
    quote:
      '“Replay.io is the most significant leap forward for debugging since we introduced the step debugger”',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/kenneth.jpg'
      },
      name: 'Kenneth Auchenberg',
      jobPosition: (
        <p className={s.position}>
          Developer Products,{' '}
          <Image
            alt="Stripe"
            src="/images/homepage/testimonials/stripe.png"
            quality={100}
            width={12}
            height={12}
            role="icon"
          />
          Stripe
        </p>
      )
    }
  },
  {
    id: 1,
    quote:
      '“Next.js App Router is now stable in 13.4. Wouldn’t have been possible without Replay, we investigated so many (over 20) super complicated bugs that using traditional debugging would have cost us days to investigate.”',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/tim-neutkins.png'
      },
      name: 'Tim Neutkins',
      jobPosition: <p className={s.position}>Co-author of Next.js</p>
    }
  },
  {
    id: 4,
    quote:
      '“I think Replay has a very good chance of creating a new category around collaborative debugging”',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/guillermo-rauch.jpg'
      },
      name: 'Guillermo Rauch',
      jobPosition: (
        <p className={s.position}>
          CEO,{' '}
          <svg
            width="12"
            height="13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6.5" r="6" fill="#000" />
            <path d="M6 3.5 9 8H3l3-4.5Z" fill="#fff" />
          </svg>
          Vercel
        </p>
      )
    }
  },
  {
    id: 5,
    quote:
      '“Replay.io is one of these experiences that first feels like magic – but after squashing your first bugs with it, you will quickly wonder how you ever worked without it”',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/harald.jpg'
      },
      name: 'Harald Kirschner',
      jobPosition: (
        <p className={s.position}>
          Product Manager,{' '}
          <Image
            alt="vscode"
            src="/images/homepage/testimonials/vs-code.png"
            quality={100}
            width={12}
            height={12}
            role="icon"
          />
          VS Code
        </p>
      )
    }
  },
  {
    id: 6,
    quote:
      '“Recording and debugging flaky tests with Replay.io feels like hopping in Doc Brown’s DeLorean and flying back to the time of the crash!”',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/gleb.jpg'
      },
      name: 'Gleb Bahmutov',
      jobPosition: (
        <p className={s.position}>
          Distinguished Engineer,{' '}
          <Image
            alt="cypress"
            src="/images/homepage/testimonials/cypress.png"
            quality={100}
            width={12}
            height={12}
            role="icon"
          />
          Cypress
        </p>
      )
    }
  },
  {
    id: 7,
    quote:
      '“Before Replay.io, we spent somewhere between 1–2 hours per day per dev in this reproducibility purgatory”',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/mark-probst.jpg'
      },
      name: 'Mark Probst',
      jobPosition: (
        <p className={s.position}>
          CTO,{' '}
          <Image
            alt="cypress"
            src="/images/homepage/testimonials/glide-apps.png"
            quality={100}
            width={12}
            height={12}
            role="icon"
          />
          Glide apps
        </p>
      )
    }
  },
  {
    id: 8,
    quote:
      '“With Replay.io, we no longer need to drop everything to fix the issue because we have the replay so the bug is reproduced forever.”',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/simeon.jpg'
      },
      name: 'Simeon Cheeseman',
      jobPosition: (
        <p className={s.position}>
          Principal Engineer,{' '}
          <Image
            alt="tablecheck"
            src="/images/homepage/testimonials/tablecheck.png"
            quality={100}
            width={12}
            height={12}
            role="icon"
          />
          Tablecheck
        </p>
      )
    }
  },
  {
    id: 9,
    quote:
      "“REMOVE REMOVE REMOVE Replay.io is a huge improvement in state-of-the-art debugging that's easy to use. It's worth your time to get familiar with it ASAP.”",
    author: {
      avatar: {
        url: '/images/homepage/testimonials/tim-haines.jpg'
      },
      name: 'Tim Haines',
      jobPosition: (
        <p className={s.position}>
          Founder,{' '}
          <Image
            alt="Percy"
            src="/images/homepage/testimonials/percy.png"
            quality={100}
            width={12}
            height={12}
            role="icon"
          />
          Percy
        </p>
      )
    }
  }
]

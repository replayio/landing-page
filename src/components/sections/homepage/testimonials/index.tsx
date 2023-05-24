import dynamic, { LoaderComponent } from 'next/dynamic'
import Image from 'next/image'

import { Section } from '~/components/layout/section'
import { TitleAndSubtitle } from '~/components/primitives/texts'
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
        <TitleAndSubtitle
          title={{
            as: 'h2',
            children: 'Time travelers use Replay'
          }}
          subtitle={{
            children:
              'Replay is one of those rare experiences that feels incredibly simple and obvious, and at the same time, profoundly deep and complex.'
          }}
        />

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
    id: 0,
    quote: '"Replay.io is galaxy brain tooling. Real gamechanger."',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/guillermo-rauch.png'
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
    id: 1,
    quote: '"Replay.io is galaxy brain tooling. Real gamechanger."',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/guillermo-rauch.png'
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
    id: 2,
    quote:
      '“I think Replay has a very good chance of creating a new category around collaborative debugging”',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/guillermo-rauch.png'
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
    id: 3,
    quote:
      '“Replay.io is the obvious next step for the future of collaborative debugging applications...”',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/guillermo-rauch.png'
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
    id: 4,
    quote:
      '"Awesome to see time-travel debugging in such a usable, intuitive form!". "Awesome to see time-travel debugging in such a usable, intuitive form!"',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/guillermo-rauch.png'
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
      '"Replay first feels like magic, but you quickly wonder how you ever worked without it."',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/guillermo-rauch.png'
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
    id: 6,
    quote:
      '“Replay.io is the obvious next step for the future of collaborative debugging applications...”',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/guillermo-rauch.png'
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
    id: 7,
    quote:
      '“Awesome to see time-travel debugging in such a usable, intuitive form!”',
    author: {
      avatar: {
        url: '/images/homepage/testimonials/guillermo-rauch.png'
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
    id: 8,
    quote:
      "What the fuck is this, is it the future? Is it the past? Is it now? Don't care this is just freaking amazing!'",
    author: {
      avatar: {
        url: '/images/homepage/testimonials/guillermo-rauch.png'
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
  }
]

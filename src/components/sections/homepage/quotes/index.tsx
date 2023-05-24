import clsx from 'clsx'
import Image from 'next/image'
import { ReactNode, useState } from 'react'

import { Container } from '~/components/layout/container'
import { Section } from '~/components/layout/section'
import { ButtonLink } from '~/components/primitives/cta'
import { useTabletBreakpoint } from '~/hooks/use-media'
import { getImageSizes } from '~/lib/utils/image'

import s from './quotes.module.scss'

export const Quotes = () => {
  const [selectedQuoteId, setSelectedQuoteId] = useState<number>(
    data[0]?.id || 0
  )
  const selectedQuote = data.find((item) => item.id === selectedQuoteId)
  const isTablet = useTabletBreakpoint()

  return (
    <Section id="homepage-quotes" className={s.section}>
      <Container className={s.container}>
        <div className={s.wrapper}>
          <div className={s.top}>
            {isTablet && <MainCta selectedQuote={selectedQuote as DataType} />}

            <div className={s.author}>
              <Image
                src={String(selectedQuote?.author.avatar.url)}
                alt={`${selectedQuote?.author.name}'s avatar`}
                width={56}
                height={56}
                sizes={getImageSizes(3, 3, 3)}
              />
              <div>
                <p className={s.name}>{selectedQuote?.author.name}</p>
                <p className={s.position}>
                  {selectedQuote?.author.jobPosition}
                </p>
              </div>
            </div>

            <div className={s.quoteWrapper}>
              <p>{selectedQuote?.quote}</p>
            </div>
          </div>
          <div className={s.bottom}>
            <div className={s.companysWrapper}>
              {data.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedQuoteId(item.id)}
                  className={clsx({
                    [s.active as string]: item.id === selectedQuote?.id
                  })}
                  aria-label="Go to this case study"
                >
                  {item.companyLogo}
                </button>
              ))}
            </div>

            {!isTablet && <MainCta selectedQuote={selectedQuote as DataType} />}
          </div>
        </div>
      </Container>
    </Section>
  )
}

const MainCta = ({ selectedQuote }: { selectedQuote: DataType }) => {
  return (
    <ButtonLink
      href={selectedQuote?.cta.href as string}
      aria-label={selectedQuote?.cta.label}
      iconSuffix="arrow"
      mode="secondary"
      className={s.mainCta}
    >
      {selectedQuote?.cta.label}
    </ButtonLink>
  )
}

type DataType = {
  id: number
  author: {
    avatar: {
      url: string
    }
    name: string
    jobPosition: string
  }
  quote: string
  companyLogo: ReactNode
  cta: {
    href: string
    label: string
  }
}

const data: DataType[] = [
  {
    id: 0,
    author: {
      avatar: {
        url: '/assets/homepage/testimonials/guillermo-rauch.png'
      },
      name: 'Guillermo Rauch',
      jobPosition: 'CEO, Vercel'
    },
    quote:
      'Lorem ipsum 1 Just looking at our front-end team, we estimate we save about 1 day a week per engineer, which is massive.  For our core team of 5, that’s 40 hours per week, just in developer hours.',
    companyLogo: (
      <svg
        viewBox="0 0 80 24"
        width="80"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M38.259.72637a3.16793 3.16793 0 0 0-1.102 1.894c-.226 1.551.84 2.748 2.393 2.748 1.584 0 2.91-1.067 3.137-2.555.258-1.585-.81-2.813-2.361-2.813a3.16796 3.16796 0 0 0-2.067.726ZM24.841 13.7304c.037-.724.026-1.45-.033-2.174H12.962l-2.007 4.126h8.821c-.671 2.383-3.188 3.891-6.205 3.891-4.564 0-7.58099-3.052-7.58099-7.379 0-4.22703 3.08699-7.31203 7.21099-7.31203 3.12 0 4.965 1.607 5.907 3.488h5.13c-1.243-4.764-5.234-7.985-11.038-7.985-6.909 0-11.97299 5.031-11.97299 11.80803 0 6.842 4.99799 11.807 12.34399 11.795 6.744 0 11.001-4.79 11.27-10.258ZM29.267.75537 25.646 23.6304h4.63L33.896.75537h-4.629Zm5.062 22.87603 2.482-15.76603h4.629L38.959 23.6304H34.33l-.001.001ZM62.1.75537h-4.629l-1.41 8.82c-.838-1.24-2.346-2.078-4.526-2.078-3.69 0-7.613 2.482-8.42 7.58003-.973 6.172 3.052 8.923 6.172 8.923 2.08 0 3.791-.84 4.998-2.349l.999 1.98h5.138l-1.155-4.208L62.1.75537ZM51.97 11.5224c1.778 0 3.69 1.61 3.253 4.428-.469 3.019-2.75 4.025-4.361 4.025-2.112 0-3.654-1.812-3.253-4.395.37-2.448 2.146-4.058 4.361-4.058Zm26.768 5.736H66.897c.504 2.012 1.913 3.017 3.857 3.017 1.779 0 2.716-.436 3.355-1.409h4.193c-1.006 3.656-4.327 5.13-7.447 5.13-4.998 0-8.25-3.523-8.25-8.253 0-4.695 3.353-8.25003 8.116-8.25003s8.052 3.56003 8.052 8.25503c0 .638 0 .872-.035 1.51Zm-11.875-3.087h7.686c-.302-1.71-1.913-2.918-3.825-2.918-2.016 0-3.418 1.174-3.861 2.918Z"
          fill="currentColor"
        />
      </svg>
    ),
    cta: {
      href: '/',
      label: 'Read case study'
    }
  },
  {
    id: 1,
    author: {
      avatar: {
        url: '/assets/homepage/testimonials/guillermo-rauch.png'
      },
      name: 'Guillermo Rauch',
      jobPosition: 'CEO, Vercel'
    },
    quote:
      'Lorem ipsum 2 Just looking at our front-end team, we estimate we save about 1 day a week per engineer, which is massive.  For our core team of 5, that’s 40 hours per week, just in developer hours.',
    companyLogo: (
      <svg
        viewBox="0 0 80 24"
        width="80"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M38.259.72637a3.16793 3.16793 0 0 0-1.102 1.894c-.226 1.551.84 2.748 2.393 2.748 1.584 0 2.91-1.067 3.137-2.555.258-1.585-.81-2.813-2.361-2.813a3.16796 3.16796 0 0 0-2.067.726ZM24.841 13.7304c.037-.724.026-1.45-.033-2.174H12.962l-2.007 4.126h8.821c-.671 2.383-3.188 3.891-6.205 3.891-4.564 0-7.58099-3.052-7.58099-7.379 0-4.22703 3.08699-7.31203 7.21099-7.31203 3.12 0 4.965 1.607 5.907 3.488h5.13c-1.243-4.764-5.234-7.985-11.038-7.985-6.909 0-11.97299 5.031-11.97299 11.80803 0 6.842 4.99799 11.807 12.34399 11.795 6.744 0 11.001-4.79 11.27-10.258ZM29.267.75537 25.646 23.6304h4.63L33.896.75537h-4.629Zm5.062 22.87603 2.482-15.76603h4.629L38.959 23.6304H34.33l-.001.001ZM62.1.75537h-4.629l-1.41 8.82c-.838-1.24-2.346-2.078-4.526-2.078-3.69 0-7.613 2.482-8.42 7.58003-.973 6.172 3.052 8.923 6.172 8.923 2.08 0 3.791-.84 4.998-2.349l.999 1.98h5.138l-1.155-4.208L62.1.75537ZM51.97 11.5224c1.778 0 3.69 1.61 3.253 4.428-.469 3.019-2.75 4.025-4.361 4.025-2.112 0-3.654-1.812-3.253-4.395.37-2.448 2.146-4.058 4.361-4.058Zm26.768 5.736H66.897c.504 2.012 1.913 3.017 3.857 3.017 1.779 0 2.716-.436 3.355-1.409h4.193c-1.006 3.656-4.327 5.13-7.447 5.13-4.998 0-8.25-3.523-8.25-8.253 0-4.695 3.353-8.25003 8.116-8.25003s8.052 3.56003 8.052 8.25503c0 .638 0 .872-.035 1.51Zm-11.875-3.087h7.686c-.302-1.71-1.913-2.918-3.825-2.918-2.016 0-3.418 1.174-3.861 2.918Z"
          fill="currentColor"
        />
      </svg>
    ),
    cta: {
      href: '/',
      label: 'Read case study'
    }
  },
  {
    id: 2,
    author: {
      avatar: {
        url: '/assets/homepage/testimonials/guillermo-rauch.png'
      },
      name: 'Guillermo Rauch',
      jobPosition: 'CEO, Vercel'
    },
    quote:
      'Lorem ipsum 3 Just looking at our front-end team, we estimate we save about 1 day a week per engineer, which is massive.  For our core team of 5, that’s 40 hours per week, just in developer hours.',
    companyLogo: (
      <svg
        viewBox="0 0 80 24"
        width="80"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M38.259.72637a3.16793 3.16793 0 0 0-1.102 1.894c-.226 1.551.84 2.748 2.393 2.748 1.584 0 2.91-1.067 3.137-2.555.258-1.585-.81-2.813-2.361-2.813a3.16796 3.16796 0 0 0-2.067.726ZM24.841 13.7304c.037-.724.026-1.45-.033-2.174H12.962l-2.007 4.126h8.821c-.671 2.383-3.188 3.891-6.205 3.891-4.564 0-7.58099-3.052-7.58099-7.379 0-4.22703 3.08699-7.31203 7.21099-7.31203 3.12 0 4.965 1.607 5.907 3.488h5.13c-1.243-4.764-5.234-7.985-11.038-7.985-6.909 0-11.97299 5.031-11.97299 11.80803 0 6.842 4.99799 11.807 12.34399 11.795 6.744 0 11.001-4.79 11.27-10.258ZM29.267.75537 25.646 23.6304h4.63L33.896.75537h-4.629Zm5.062 22.87603 2.482-15.76603h4.629L38.959 23.6304H34.33l-.001.001ZM62.1.75537h-4.629l-1.41 8.82c-.838-1.24-2.346-2.078-4.526-2.078-3.69 0-7.613 2.482-8.42 7.58003-.973 6.172 3.052 8.923 6.172 8.923 2.08 0 3.791-.84 4.998-2.349l.999 1.98h5.138l-1.155-4.208L62.1.75537ZM51.97 11.5224c1.778 0 3.69 1.61 3.253 4.428-.469 3.019-2.75 4.025-4.361 4.025-2.112 0-3.654-1.812-3.253-4.395.37-2.448 2.146-4.058 4.361-4.058Zm26.768 5.736H66.897c.504 2.012 1.913 3.017 3.857 3.017 1.779 0 2.716-.436 3.355-1.409h4.193c-1.006 3.656-4.327 5.13-7.447 5.13-4.998 0-8.25-3.523-8.25-8.253 0-4.695 3.353-8.25003 8.116-8.25003s8.052 3.56003 8.052 8.25503c0 .638 0 .872-.035 1.51Zm-11.875-3.087h7.686c-.302-1.71-1.913-2.918-3.825-2.918-2.016 0-3.418 1.174-3.861 2.918Z"
          fill="currentColor"
        />
      </svg>
    ),
    cta: {
      href: '/',
      label: 'Read case study'
    }
  }
]

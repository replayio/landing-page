import dynamic, { LoaderComponent } from 'next/dynamic'
import Image from 'next/image'
import { FC } from 'react'

import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { ButtonLink } from '~/components/primitives/cta'
import { SITEMAP } from '~/lib/sitemap'

import s from './hero.module.scss'

const Sky = dynamic(
  () => import('~/components/common/sky').then((m) => m.Sky) as LoaderComponent,
  {
    ssr: false
  }
)

export const Hero: FC = () => {
  return (
    <Section className={s.section}>
      <div className={s['bg-container']}>
        <div className={s['child']}>
          <Sky />
        </div>
      </div>
      <Container className={s.container}>
        <h1 className="screen-reader-only">Page Not Found</h1>
        <div className={s.title}>
          <Image
            src="/images/404/title.svg"
            fill
            alt="Page Not Found"
            draggable={false}
          />
        </div>
        <p className={s.text}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <ButtonLink
          size="big"
          href={SITEMAP.home.href || '/'}
          aria-label={SITEMAP.home.label}
        >
          Go back {SITEMAP.home.label}
        </ButtonLink>
      </Container>
    </Section>
  )
}

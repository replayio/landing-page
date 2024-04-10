import dynamic, { LoaderComponent } from 'next/dynamic'
import Image from 'next/image'
import { FC, useState } from 'react'

import { Section } from '~/components/common/section'
import { Container } from '~/components/layout/container'
import { ButtonLink } from '~/components/primitives/cta'
import { SITEMAP } from '~/lib/sitemap'

import s from './hero.module.scss'

const Sky = dynamic(() => import('~/components/common/sky').then((m) => m.Sky) as LoaderComponent, {
  ssr: false
})

export const Hero: FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Section className={s.section}>
      <div className={s['bg-container']}>
        <div className={s['child']}>
          <Sky />
        </div>
      </div>
      <Container
        style={{
          opacity: imageLoaded ? 1 : 0
        }}
        className={s.container}
      >
        <h1 className="screen-reader-only">Page Not Found</h1>
        <div className={s.title}>
          <Image
            src="/images/404/title.svg"
            fill
            alt="Page Not Found"
            draggable={false}
            onLoadingComplete={() => {
              setImageLoaded(true)
            }}
          />
        </div>
        <p className={s.text}>The page you are looking for doesn&apos;t exist or has been moved.</p>
        <ButtonLink size="big" href={SITEMAP.home.href || '/'} aria-label={SITEMAP.home.label}>
          Go Back {SITEMAP.home.label}
        </ButtonLink>
      </Container>
    </Section>
  )
}

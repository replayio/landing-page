'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { FC, useState } from 'react'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'

import { Section } from '~/components/common/section'
import { ButtonLink } from '~/components/primitives/cta'
import { SITEMAP } from '~/lib/sitemap'

const Sky = dynamic(() => import('~/components/common/sky').then((m) => m.Sky), {
  ssr: false
})

export const Hero: FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Section
      className="relative mt-[calc(var(--header-height)_*_-1)] flex h-[100dvh] flex-col justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(251.84deg,#111827 -24.23%,#111826 -18.4%,#101726 -13.17%,#101725 -8.33%,#101624 -3.65%,#0f1523 1.08%,#0f1421 6.08%,#0e1420 11.58%,#0d121e 17.81%,#0c111c 24.96%,#0b1019 33.28%,#0a0e16 42.98%,#080c13 54.28%,#070a10 67.41%,#000 82.57%,#000 100%)'
      }}
    >
      <div className="pointer-events-none absolute left-0 top-0 isolate h-full w-full">
        <div className={'absolute inset-0'}>
          <Sky />
        </div>
      </div>

      <Container
        style={{
          opacity: imageLoaded ? 1 : 0
        }}
        className="duration-[0.5s] ease-ease-in-out relative z-10 flex h-full w-full transition-opacity"
      >
        <div className="my-auto flex-1">
          <h1 className="sr-only">Page Not Found</h1>
          <div className="relative mx-auto h-[46px] w-full max-w-[1040px] select-none lg:h-[140px]">
            <Image
              className="object-contain"
              src="/images/404/title.svg"
              fill
              alt="Page Not Found"
              draggable={false}
              onLoadingComplete={() => {
                setImageLoaded(true)
              }}
            />
          </div>
          <p className="mx-0 mb-8 mt-6 text-center text-lg leading-6 text-slate-300">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex w-full justify-center">
            <Button href={SITEMAP.home.href || '/'} aria-label={SITEMAP.home.label}>
              Go Back {SITEMAP.home.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}

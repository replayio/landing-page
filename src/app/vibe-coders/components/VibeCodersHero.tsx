'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Container } from '~/components/Container'
import Hyperspace from '~/app/components/hero/hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'
import { Base44Icon } from '~/components/icons/base44'
import { Button } from '~/components/Button'

const CHROME_EXTENSION_URL =
  'https://chromewebstore.google.com/detail/replay-debugger/lkbmpddckbjbfaekcjacjgpehgaaijhh'

const partners = [
  { name: 'Replit', logo: '/images/hero-logos/replit.svg' },
  { name: 'Lovable', logo: '/images/hero-logos/lovable.svg' },
  { name: 'Base44' },
  { name: 'Bolt', logo: '/images/hero-logos/bolt.svg' }
]

export function VibeCodersHero() {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % partners.length)
        setVisible(true)
      }, 400)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const partner = partners[index]

  return (
    <section className="relative flex overflow-hidden bg-[#FCFCFC]">
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>
      <div className="relative z-10 flex max-w-full flex-1 flex-col">
        <Container className="relative z-10 flex w-full max-w-7xl flex-col pb-16 pt-[120px] lg:pb-24 lg:pt-[180px]">
          <div className="flex w-full flex-col items-center justify-center">
            <div ref={heroContentRef} className="max-w-5xl text-center">
              {/* Cycling partner + Replay logos */}
              <div className="mb-10 flex items-center justify-center gap-4 sm:gap-6">
                <div className="flex min-w-[160px] items-center justify-end gap-2.5">
                  <div
                    className={`duration-[400ms] flex items-center gap-2.5 transition-all ${
                      visible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
                    }`}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white sm:h-10 sm:w-10">
                      {partner.name === 'Base44' ? (
                        <Base44Icon width={22} height={22} viewBox="0 0 30.1 30.1" />
                      ) : (
                        <Image
                          src={partner.logo || ''}
                          alt={partner.name}
                          width={22}
                          height={22}
                          className="h-[22px] w-[22px]"
                        />
                      )}
                    </div>
                    <span className="whitespace-nowrap text-xl font-semibold text-gray-900 sm:text-2xl">
                      {partner.name}
                    </span>
                  </div>
                </div>

                <span className="text-2xl font-light text-gray-400 sm:text-3xl">+</span>

                <div className="flex min-w-[160px] items-center justify-start gap-2.5">
                  <Image
                    src="/images/logo.svg"
                    alt="Replay"
                    width={28}
                    height={32}
                    className="h-8 w-7 sm:h-9 sm:w-8"
                  />
                  <span className="text-xl font-semibold text-gray-900 sm:text-2xl">Replay</span>
                </div>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl xl:text-8xl">
                Vibe fearlessly with the Replay Chrome extension.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-700">
                The Replay Chrome extension is like having a senior engineer watching over your
                shoulder, catching bugs, finding root causes, and telling the AI exactly how to fix
                them.
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  href={CHROME_EXTENSION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-accent-light"
                >
                  Install Replay Extension
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

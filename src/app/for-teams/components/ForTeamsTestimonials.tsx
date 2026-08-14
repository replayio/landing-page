'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Container } from '~/components/Container'

import harshiltomar from '~/images/testimonials/harshiltomar.jpg'
import petermick from '~/images/testimonials/petermick.jpg'
import kaiteeshiks from '~/images/testimonials/kaiteeshiks.jpg'

type Testimonial = {
  quote: string
  name: string
  handle: string
  href: string
  image: typeof harshiltomar
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Love the tooling! Our QA workflows and bug discovery has become 10X faster. The devs are able to cycle through loopholes much faster and delivery timelines have been enhanced',
    name: 'Harshil Tomar',
    handle: '@Hartdrawss',
    href: 'https://x.com/Hartdrawss',
    image: harshiltomar
  },
  {
    quote:
      'Blown away by what Replay QA discovered for my solo startup, helped me identify and fix bugs that could potentially affect conversions.',
    name: 'Peter Mick',
    handle: '@ThePeterMick',
    href: 'https://x.com/ThePeterMick',
    image: petermick
  },
  {
    quote:
      "Connecting my GitHub repository took only a few seconds, and the first run uncovered issues across functionality, UX, and accessibility that would've been easy to miss manually.",
    name: 'Kaitee',
    handle: '@KaiteeShiks',
    href: 'https://x.com/KaiteeShiks/status/2079904638191735181',
    image: kaiteeshiks
  }
]

const MS_PER_WORD = 350
const MIN_MS = 7000
const MAX_MS = 14000

function readingTime(quote: string) {
  const words = quote.trim().split(/\s+/).length
  return Math.min(MAX_MS, Math.max(MIN_MS, words * MS_PER_WORD))
}

export function ForTeamsTestimonials() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [tookOver, setTookOver] = useState(false)
  const [inView, setInView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const step = (delta: number) =>
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length)

  const takeOver = (fn: () => void) => () => {
    setTookOver(true)
    fn()
  }

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (tookOver || hovered || focused || reducedMotion || !inView) return
    const timer = setTimeout(() => step(1), readingTime(testimonials[index].quote))
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, tookOver, hovered, focused, reducedMotion, inView])

  return (
    <section className="relative isolate overflow-hidden border-y border-accent/15 bg-accent/[0.04] py-16 md:py-20">
      <Container>
        <div
          ref={rootRef}
          className="mx-auto max-w-3xl text-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={() => setFocused(false)}
        >
          <div className="grid">
            {testimonials.map((t, i) => {
              const active = i === index
              return (
                <figure
                  key={t.name}
                  inert={!active}
                  className={`col-start-1 row-start-1 m-0 transition-opacity duration-300 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <blockquote className="mb-8 text-xl font-medium leading-relaxed tracking-tight text-gray-900 sm:text-2xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center justify-center gap-3.5">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={48}
                      height={48}
                      priority={i === 0}
                      className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                      <a
                        href={t.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 transition hover:text-accent"
                      >
                        {t.handle}
                      </a>
                    </div>
                  </figcaption>
                </figure>
              )
            })}
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={takeOver(() => step(-1))}
              aria-label="Previous quote"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/25 text-gray-500 transition hover:border-accent/50 hover:text-accent"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M10 3.5 5.5 8l4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={takeOver(() => setIndex(i))}
                  aria-label={`Show quote from ${t.name}`}
                  aria-current={i === index || undefined}
                  className={`h-2 w-2 rounded-full transition ${
                    i === index ? 'bg-accent' : 'bg-accent/25 hover:bg-accent/50'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={takeOver(() => step(1))}
              aria-label="Next quote"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/25 text-gray-500 transition hover:border-accent/50 hover:text-accent"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M6 3.5 10.5 8 6 12.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

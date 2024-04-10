import { LandingPageFragment } from '~/lib/basehub-queries'
import Image from 'next/image'
import Link from 'next/link'
import TestimonialForSmallScreen from './TestimonialForSmallScreen'

import styles from '../styles/Landingpage.module.css'
import alex from '~/images/testimonials/alex.png'
import algodaily from '~/images/testimonials/algodaily.png'
import amjad from '~/images/testimonials/amjad.png'
import cypress from '~/images/testimonials/cypress.png'
import dan from '~/images/testimonials/dan-abramov.png'
import david from '~/images/testimonials/david.png'
import dom from '~/images/testimonials/dom.png'
import erik from '~/images/testimonials/erik.png'
import gleb from '~/images/testimonials/gleb.jpg'
import glide from '~/images/testimonials/glide.png'
import guillermo from '~/images/testimonials/guillermo-rauch.jpg'
import harald from '~/images/testimonials/harald.jpg'
import ives from '~/images/testimonials/ives.png'
import jacob from '~/images/testimonials/jacob.jpg'
import jj from '~/images/testimonials/jj-kasper.png'
import kenneth from '~/images/testimonials/kenneth.jpg'
import lenz from '~/images/testimonials/lenz.png'
import marke from '~/images/testimonials/mark-erikson.png'
import markp from '~/images/testimonials/mark-probst.jpg'
import mateusz from '~/images/testimonials/mateusz.png'
import matt from '~/images/testimonials/matt.png'
import ryan from '~/images/testimonials/ryan-carniato.png'
import sebastian from '~/images/testimonials/sebastian.png'
import shane from '~/images/testimonials/shane.jpg'
import shawn from '~/images/testimonials/shawn.png'
import simeon from '~/images/testimonials/simeon.jpg'
import timh from '~/images/testimonials/tim-haines.jpg'
import timn from '~/images/testimonials/tim-neutkins.png'
import zack from '~/images/testimonials/zack-rosen.jpg'
import pantheon from '~/images/testimonials/pantheon.png'
import tablecheck from '~/images/testimonials/tablecheck.png'
import { classNames } from '~/lib/utils'

const images = {
  alex,
  algodaily,
  amjad,
  cypress,
  dan,
  david,
  dom,
  erik,
  gleb,
  glide,
  guillermo,
  harald,
  ives,
  jacob,
  jj,
  kenneth,
  lenz,
  marke,
  markp,
  mateusz,
  matt,
  pantheon,
  ryan,
  sebastian,
  shane,
  shawn,
  simeon,
  tablecheck,
  timh,
  timn,
  zack
}

type CaseStudy = {
  body: string
  author: {
    name: string
    handle: string
    image: any
    logo: any
  }
  url: string
}

function CaseStudy({
  testimonial,
  colStart,
  rowEnd
}: {
  testimonial: CaseStudy
  colStart: number
  rowEnd: number
}) {
  return (
    <figure
      className={`flex min-h-[desiredHeight] flex-col justify-between rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 xl:col-start-${colStart} xl:row-end-${rowEnd}`}
    >
      <blockquote className="flex grow flex-col px-12 pt-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:pb-6 sm:pt-12 sm:text-xl sm:leading-8">
        <p className="flex grow">{`“${testimonial.body}”`}</p>
        <p className="mt-8 grow">
          <Link target="blank" className="" href={testimonial.url}>
            Read more
          </Link>
        </p>
      </blockquote>
      <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
        <Image
          src={testimonial.author.image}
          className="h-10 w-10 rounded-full bg-gray-50"
          alt=""
        />

        <div className="flex-auto">
          <div className="font-semibold">{testimonial.author.name}</div>
          <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
        </div>
        {testimonial.author.logo && (
          <Image src={testimonial.author.logo} className="h-10 w-auto flex-none" alt="" />
        )}
      </figcaption>
    </figure>
  )
}

export type TestimonialItem = {
  body: string
  author: {
    name: string
    handle: string
    image: any
  }
  featured: boolean
}

function FeaturedTestimonial({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
      <blockquote className="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
        <p>{`“${testimonial.body}”`}</p>
      </blockquote>
      <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
        <Image
          src={testimonial.author.image}
          className="h-10 w-10 rounded-full bg-gray-50"
          alt=""
        />
        <div className="flex-auto">
          <div className="font-semibold">{testimonial.author.name}</div>
          <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
        </div>
      </figcaption>
    </figure>
  )
}

export function Testimonial({
  testimonial,
  columnIdx,
  columnGroupIdx
}: {
  testimonial: TestimonialItem
  columnIdx: number
  columnGroupIdx: number
}) {
  return (
    <figure
      key={`${testimonial.author.handle}-${columnIdx}-${columnGroupIdx}`}
      className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
    >
      <blockquote className="text-gray-900">
        <p>{`“${testimonial.body}”`}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-x-4">
        <Image
          src={testimonial.author.image}
          className="h-10 w-10 rounded-full bg-gray-50"
          alt=""
        />
        <div>
          <div className="font-semibold">{testimonial.author.name}</div>
          <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
        </div>
      </figcaption>
    </figure>
  )
}

function TestimonialForLargeScreen({ testimonials }: { testimonials: TestimonialItem[][][] }) {
  return (
    <>
      {testimonials.map((columnGroup, columnGroupIdx) => (
        <div key={columnGroupIdx} className="hidden space-y-8 xl:visible xl:contents xl:space-y-0">
          {columnGroup.map((column, columnIdx) => (
            <div
              key={columnIdx}
              className={classNames(
                (columnGroupIdx === 0 && columnIdx === 0) ||
                  (columnGroupIdx === testimonials.length - 1 &&
                    columnIdx === columnGroup.length - 1)
                  ? 'xl:row-span-2'
                  : 'xl:row-start-1',
                'space-y-8'
              )}
            >
              {column.map((testimonial, i) => (
                <Testimonial
                  key={i}
                  testimonial={testimonial}
                  columnIdx={i}
                  columnGroupIdx={columnGroupIdx}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export function Testimonials({ testimonials }: LandingPageFragment) {
  const newTestimonials = testimonials.testimonials.items.map((testimonial) => ({
    body: testimonial.quote,
    author: {
      name: testimonial._title,
      handle: testimonial.title,
      image: images[testimonial.image as keyof typeof images]
    },
    featured: testimonial.featured
  }))

  const newCaseStudies = testimonials.caseStudies.items.map((testimonial) => ({
    body: testimonial.quote,
    author: {
      name: testimonial.name,
      handle: testimonial.handle,
      image: images[testimonial.image as keyof typeof images],
      logo: images[testimonial.logo as keyof typeof images]
    },
    url: testimonial.url
  }))

  const breaks = [0, 6, 10, 14, 19]

  const featuredTestimonial = newTestimonials.filter((t) => t.featured)[0]
  const notFeaturedTestimonials = newTestimonials.filter((t) => !t.featured)

  const baseHubTestimonials = [
    [
      notFeaturedTestimonials.slice(breaks[0], breaks[1]),
      notFeaturedTestimonials.slice(breaks[1], breaks[2])
    ],
    [
      notFeaturedTestimonials.slice(breaks[2], breaks[3]),
      notFeaturedTestimonials.slice(breaks[3], breaks[4])
    ]
  ]

  return (
    <div className="relative isolate bg-white pb-32 pt-24 sm:pt-32">
      <div
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
      <div
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        aria-hidden="true"
      >
        <div
          className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={styles.sectionSubhead}>{testimonials.caseStudySubTitle}</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {testimonials.caseStudyTitle}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-1 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-3">
          {newCaseStudies.map((caseStudy, index) => (
            <CaseStudy testimonial={caseStudy} colStart={index + 1} rowEnd={1} key={index} />
          ))}
        </div>

        <div className="mx-auto mt-32 max-w-2xl text-center">
          <h2 className={styles.sectionSubhead}>{testimonials.subtitle}</h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {testimonials.title}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          {<FeaturedTestimonial testimonial={featuredTestimonial} />}
          <TestimonialForSmallScreen testimonials={baseHubTestimonials} />
          <TestimonialForLargeScreen testimonials={baseHubTestimonials} />
        </div>
      </div>
    </div>
  )
}

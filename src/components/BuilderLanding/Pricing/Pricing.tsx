'use client'

import { useRef, useCallback } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import { Carousel } from '~/components/common/carousel'
import { RightArrowIcon } from '~/components/icons/rightArrow'
import { PricingCard } from './components/PricingCard'
import type { PricingFeature } from './components/PricingCard'

interface PricingPlan {
  id: 'free' | 'builder' | 'pro'
  title: string
  description: string
  price: string
  pricePeriod: string
  features: PricingFeature[]
  emphasized: boolean
  featuresLabel?: string
}

export function Pricing() {
  const carouselRef = useRef<EmblaCarouselType | undefined>(undefined)

  const scrollPrev = useCallback(() => {
    const embla = carouselRef.current
    if (!embla) return
    embla.scrollPrev()
  }, [])

  const scrollNext = useCallback(() => {
    const embla = carouselRef.current
    if (!embla) return
    embla.scrollNext()
  }, [])

  const pricingPlans: PricingPlan[] = [
    {
      id: 'free',
      title: 'Free',
      description: 'Our free tier to get you started',
      price: '$0',
      pricePeriod: '/month',
      emphasized: false,
      features: [
        { name: 'One project', included: true, tooltip: 'Build one project' },
        {
          name: 'Limited customer support',
          included: true,
          tooltip: 'Email support during business hours',
        },
        { name: 'API connectors', included: false, tooltip: 'Connect to external APIs' },
        {
          name: 'Download your code',
          included: false,
          tooltip: 'Download your project source code',
        },
        { name: 'Deploy your applications', included: false, tooltip: 'Deploy apps to production' },
      ],
    },
    {
      id: 'builder',
      title: 'Builder',
      description: 'No limits on any features.\nGo nuts!',
      price: '$20',
      pricePeriod: '/month',
      emphasized: true,
      featuresLabel: 'Everything in Basic, plus:',
      features: [
        { name: 'Unlimited projects', included: true, tooltip: 'Build as many apps as you want' },
        {
          name: 'Priority Customer Support',
          included: true,
          tooltip: 'Priority email and chat support',
        },
        { name: 'API connectors', included: true, tooltip: 'Connect to external APIs' },
        { name: 'Download your code', included: true, tooltip: 'Download your project source code' },
        { name: 'Deploy your applications', included: true, tooltip: 'Deploy apps to production' },
      ],
    },
    // {
    //   id: 'pro',
    //   title: 'Pro',
    //   description: 'Coming Soon!',
    //   price: '$199',
    //   pricePeriod: '/month',
    //   emphasized: false,
    //   features: [
    //     { name: 'Unlimited projects', included: true, tooltip: 'Build as many apps as you want' },
    //     {
    //       name: 'VIP Customer Support',
    //       included: true,
    //       tooltip: '24/7 priority support with dedicated account manager',
    //     },
    //     { name: 'API connectors', included: true, tooltip: 'Connect to external APIs' },
    //     { name: 'Download your code', included: true, tooltip: 'Download your project source code' },
    //     { name: 'Deploy your applications', included: true, tooltip: 'Deploy apps to production' },
    //   ],
    // },
  ]

  return (
    <section id="pricing" className="relative isolate overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
      <Container className="relative">
        {/* Header - Left aligned */}
        <div className="max-w-4xl mb-10">
          <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            Simple,
            <br />
            <span className="text-accent">transparent</span> pricing
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Building software shouldn&apos;t feel like a trip to Las Vegas.
          </p>
        </div>

        {/* Desktop Pricing Cards */}
        <div className="hidden md:flex flex-col items-center gap-6 md:flex-row md:items-stretch md:justify-center">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              pricePeriod={plan.pricePeriod}
              features={plan.features}
              emphasized={plan.emphasized}
              featuresLabel={plan.featuresLabel}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel
            ref={carouselRef}
            config={{
              align: 'start',
              slidesToScroll: 1,
              dragFree: true,
              loop: true,
            }}
            slideClassName="!w-full flex-shrink-0"
            dots={false}
            arrows={false}
          >
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                title={plan.title}
                description={plan.description}
                price={plan.price}
                pricePeriod={plan.pricePeriod}
                features={plan.features}
                emphasized={plan.emphasized}
                featuresLabel={plan.featuresLabel}
              />
            ))}
          </Carousel>

          {/* Mobile navigation buttons */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={scrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-accent active:scale-95 transition-transform"
              aria-label="Previous pricing plan"
            >
              <span className="inline-flex rotate-180">
                <RightArrowIcon width={18} height={18} />
              </span>
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-accent active:scale-95 transition-transform"
              aria-label="Next pricing plan"
            >
              <RightArrowIcon width={18} height={18} />
            </button>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-12 flex justify-center">
          <Button
            variant="solid"
            color="default"
            size="base"
            className="px-8"
            href="https://builder.replay.io/?focus=true"
            target="_blank"
          >
            Start Building
          </Button>
        </div>
      </Container>
    </section>
  )
}

'use client'

import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
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

        {/* Pricing Cards */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch md:justify-center">
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

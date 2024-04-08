import clsx from 'clsx'

import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { PricingPageFragment } from '~/lib/basehub-queries'
import { RichText } from 'basehub/react-rich-text'
import { SquigglyTitle } from '~/components/SquigglyTitle'
import { FEATURES, tiers, Tier } from './comparison'
import { PricingTooltip } from '../PricingTooltip'

function CheckIcon({ className, ...props }: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      className={clsx('h-6 w-6 flex-none fill-current stroke-current', className)}
      {...props}
    >
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        strokeWidth={0}
      />
      <circle
        cx={12}
        cy={12}
        r={8.25}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Plan({ tier }: { tier: Tier }) {
  return (
    <section
      className={clsx(
        'flex flex-col rounded-3xl px-6 sm:px-8',

        tier.featured ? `order-first bg-indigo-600 py-8 lg:order-none` : 'lg:py-8'
      )}
    >
      <h3 className="mt-5 font-display text-lg text-white">{tier.name}</h3>
      <p className={clsx('mt-2 text-base', tier.featured ? 'text-white' : 'text-slate-400')}>
        {tier.description}
      </p>
      <div className="flex flex-grow flex-col">
        {tier.name == 'Enterprise' ? (
          <div className="mt-8">
            <p className="text-sm font-light text-slate-300">-</p>
            <p className="order-first font-display text-3xl font-light tracking-tight text-white">
              Let&lsquo;s chat
            </p>
            <p className="mt-1 font-light tracking-tight text-slate-300 ">
              <a className="text-indigo-300" href={tier.href}>
                Start a conversation
              </a>
            </p>
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-sm font-light text-slate-300">Starting at</p>
            <p className="order-first font-display text-3xl font-light tracking-tight text-white">
              ${tier.price}
              <span className="text-sm  font-light text-slate-300">&nbsp;/ &nbsp; month</span>
            </p>
            <p className="mt-1 text-sm font-light tracking-tight text-slate-300">
              {tier.priceDescription}
            </p>
          </div>
        )}

        <ul
          role="list"
          className={clsx(
            'order-last mt-10 flex flex-col  border-t text-sm',
            tier.featured ? 'text-white' : 'text-slate-200',
            tier.featured ? 'border-indigo-500' : 'border-slate-700'
          )}
        >
          {Object.entries(tier.features)
            .filter(([label]) => !FEATURES[label].hidden)
            .map(([label, value]) => (
              <li
                key={label}
                className={`flex items-center  justify-between border-b  py-2 ${tier.featured ? 'border-indigo-500' : 'border-slate-700'}`}
              >
                <PricingTooltip
                  learnMore={FEATURES[label].learnMore}
                  body={FEATURES[label].description}
                >
                  <span className="cursor-pointer hover:underline">{FEATURES[label].name}</span>
                </PricingTooltip>
                <span className="mr-2">{value.toLocaleString()}</span>
              </li>
            ))}
        </ul>

        <ul
          role="list"
          className={clsx(
            'order-last mt-10 flex flex-col gap-y-3 text-sm',
            tier.featured ? 'text-white' : 'text-slate-200'
          )}
        >
          {tier.included.map((feature) => (
            <PricingTooltip
              key={feature.name}
              learnMore={feature.learnMore}
              body={feature.description}
            >
              <li className="flex cursor-pointer hover:underline">
                <CheckIcon className={tier.featured ? 'text-white' : 'border-indigo-500'} />
                <span className="ml-4">{feature.name}</span>
              </li>
            </PricingTooltip>
          ))}
        </ul>
      </div>
      <Button
        href={tier.href}
        variant={tier.featured ? 'solid' : 'outline'}
        color="white"
        className="mt-8"
        aria-label={`Get started with the ${tier.name} plan for ${tier.price}`}
      >
        Get started
      </Button>
    </section>
  )
}

export function PricingHero({ hero }: { hero: PricingPageFragment['hero'] }) {
  return (
    <section
      id="pricing"
      data-testid="pricing"
      aria-label="Pricing"
      className="bg-slate-900 py-20 sm:py-32"
    >
      <Container>
        <div className="md:text-left">
          <h2 className="text-base font-semibold leading-7 text-indigo-300">Test Suites</h2>
          <SquigglyTitle {...hero.title} />
          <div className="text-md mt-4 text-slate-300 md:max-w-2xl">
            <RichText>{hero.description.json.content}</RichText>
          </div>
        </div>
        <div className="mt-16 grid max-w-7xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-4 xl:gap-x-8">
          {Object.values(tiers).map((tier) => (
            <Plan key={tier.name} tier={tier} />
          ))}
        </div>
      </Container>
    </section>
  )
}

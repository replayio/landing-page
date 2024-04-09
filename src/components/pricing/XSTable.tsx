import { CheckIcon } from '@heroicons/react/20/solid'
import { Tier, Section } from './sections/comparison'
import { classNames } from '~/lib/utils'

export function XSTable({ tiers, sections }: { tiers: Record<string, Tier>; sections: Section[] }) {
  return (
    <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
      {Object.entries(tiers).map(([tierKey, tier]) => (
        <section
          key={tierKey}
          className={classNames(
            tier.featured ? 'rounded-xl bg-gray-400/5 ring-1 ring-inset ring-gray-200' : '',
            'p-8'
          )}
        >
          <h3 id={tierKey} className="text-sm font-semibold leading-6 text-gray-900">
            {tier.name}
          </h3>
          <p className="mt-2 flex items-baseline gap-x-1 text-gray-900">
            {tier.price < 0 ? (
              <span className="text-3xl font-bold">Let&apos;s Talk</span>
            ) : (
              <>
                <span className="text-3xl font-bold">${tier.price}</span>
                <span className="text-sm font-semibold">/month</span>
              </>
            )}
          </p>
          <a
            href={tier.href}
            aria-describedby={tierKey}
            className={classNames(
              tier.featured
                ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
              'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            )}
          >
            {tier.name == 'Enterprise' ? 'Reach out' : 'Buy plan'}
          </a>
          {sections.map((section) => (
            <div key={`${tierKey}-${section.name}`} className="mt-10">
              <div className="mb-4">
                {section.name && <h4 className="text-sm font-semibold">{section.name}</h4>}
                {section.subtitle && (
                  <p className="mt-0 text-xs text-gray-500">{section.subtitle}</p>
                )}
              </div>
              <ul role="list" className="space-y-4 text-sm leading-6 text-gray-900">
                {section.features.map((feature) => (
                  <li key={feature.name} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span className="text-sm text-gray-500">
                      <span className="leading-6">{feature.values[tierKey]}</span> {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

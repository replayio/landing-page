import { CheckIcon, MinusIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

import { Tier, Section } from './sections/comparison'
import { classNames } from '~/lib/utils'
import { Button } from '../Button'

export function LGTable({ tiers, sections }: { tiers: Record<string, Tier>; sections: Section[] }) {
  const tierEntries = Object.entries(tiers)

  return (
    <div className="isolate mt-20 hidden lg:block">
      <div className="relative -mx-8">
        {tierEntries.some(([_, tier]) => tier.featured) ? (
          <div className="pointer-events-none absolute inset-x-4 inset-y-0 z-10 flex">
            <div
              className="flex w-1/5 px-4"
              aria-hidden="true"
              style={{
                marginLeft: `${(Object.values(tiers).findIndex((tier) => tier.featured) + 1) * 20}%`
              }}
            >
              <div className="w-full rounded-t-xl border-x border-t border-gray-900/10 bg-gray-400/5" />
            </div>
          </div>
        ) : null}
        <p className="sr-only">Pricing plan comparison</p>
        <table className="sticky top-[var(--header-height)] w-full table-fixed border-separate border-spacing-x-8 bg-gradient-to-b from-white to-white/50 text-left">
          <thead>
            <tr>
              <td />
              {tierEntries.map(([_, tier]) => (
                <th key={tier.name} scope="col" className="px-6 pt-6 xl:px-8 xl:pt-8">
                  <div className="text-sm font-semibold leading-7 text-gray-900">{tier.name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <span className="sr-only">Price</span>
              </th>
              {tierEntries.map(([_, tier]) => (
                <td key={tier.name} className="px-6 pt-2 xl:px-8">
                  <div className="flex items-baseline gap-x-1 text-gray-900">
                    {tier.price != -1 ? (
                      <>
                        <span className="text-2xl font-bold">${tier.price}</span>
                        <span className="text-sm font-semibold leading-6">/month</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl font-bold">Let&lsquo;s talk</span>
                      </>
                    )}
                  </div>
                  <Button
                    href={tier.href}
                    variant={tier.featured ? 'solid' : 'outline'}
                    color="default"
                    size="sm"
                    className="mt-8 w-full"
                  >
                    {tier.name == 'Enterprise' ? 'Reach out' : 'Buy plan'}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <table className="w-full table-fixed border-separate border-spacing-x-8 text-left">
          <tbody>
            {sections.map((section, sectionIdx) => (
              <Fragment key={`{${section.name}-${sectionIdx}`}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={5}
                    className={classNames(
                      sectionIdx === 0 ? 'pt-8' : 'pt-16',
                      'pb-4  leading-6 text-gray-900'
                    )}
                  >
                    <div className="text font-semibold">{section.name}</div>
                    <div className="text-sm font-medium">{section.subtitle}</div>
                    <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/10" />
                  </th>
                </tr>
                {section.features.map((feature) => (
                  <tr key={feature.name}>
                    <th scope="row" className="py-4 text-sm font-normal leading-6 text-gray-900">
                      {feature.name}
                      <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/5" />
                    </th>
                    {tierEntries.map(([tierKey, _]) => {
                      const value = feature.values[tierKey]

                      return (
                        <td key={`${feature.name}-${tierKey}`} className="px-6 py-4 xl:px-8">
                          {typeof value === 'string' || typeof value === 'number' ? (
                            <div className="text-center text-sm leading-6 text-gray-500">
                              {value}
                            </div>
                          ) : (
                            <>
                              {value === true ? (
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-accent"
                                  aria-hidden="true"
                                />
                              ) : (
                                <MinusIcon
                                  className="mx-auto h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              )}

                              <span className="sr-only">
                                {value === true ? 'Included' : 'Not included'}
                              </span>
                            </>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

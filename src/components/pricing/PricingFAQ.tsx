'use client'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import { PricingPageFragment } from '~/lib/basehub-queries'

import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'

export function PricingFAQ({ faq }: { faq: PricingPageFragment['faq'] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            {faq.title}
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faq.questions.items.map((question) => (
              <Collapsible.Root key={question._title} className="pt-6" onOpenChange={setOpen}>
                <dt>
                  <Collapsible.Trigger className="flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base font-semibold leading-7">{question._title}</span>
                    <span className="ml-6 flex h-7 items-center">
                      {open ? (
                        <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </span>
                  </Collapsible.Trigger>
                </dt>
                <Collapsible.Content className="mt-2 pr-12">
                  <p className="text-base leading-7 text-gray-600">{question.answer}</p>
                </Collapsible.Content>
              </Collapsible.Root>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

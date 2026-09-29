'use client'

import { type ReactNode } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '~/components/ui/accordion'

type Faq = { question: string; answer: ReactNode }

export function FaqAccordionList({
  faqs,
  defaultOpenIndex
}: {
  faqs: Faq[]
  defaultOpenIndex?: number
}) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpenIndex !== undefined ? `item-${defaultOpenIndex}` : undefined}
      className="flex flex-col gap-2"
    >
      {faqs.map((faq, index) => (
        <AccordionItem
          key={faq.question}
          value={`item-${index}`}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white px-5 data-[state=open]:shadow-sm"
        >
          <AccordionTrigger className="py-4 text-left text-sm font-medium text-gray-900 hover:no-underline sm:text-base [&>svg]:text-gray-400">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-sm leading-relaxed text-gray-600">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

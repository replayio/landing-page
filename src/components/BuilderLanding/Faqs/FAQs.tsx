'use client'

import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'
import { useMemo } from 'react'
import { extractTextFromNode } from '~/lib/utils/extractTextFromNode'

export interface FAQItem {
  question: string
  answer: string | React.ReactNode
}

export interface FAQsProps {
  id?: string
  title: React.ReactNode
  subtitle?: string
  faqs: FAQItem[]
  theme?: 'light' | 'white' | 'dark'
  ctaButton?: { href: string; label: string }
  /** Optional bottom CTA block with heading and subtitle (e.g. "Stop going in circles." / "Record the bug. Get the fix. Get back to building.") */
  bottomCta?: { heading: string; subtitle: string }
}

export function FAQs({
  id = 'faq',
  title,
  subtitle,
  faqs,
  theme = 'light',
  ctaButton,
  bottomCta
}: FAQsProps) {
  const faqSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: extractTextFromNode(faq.answer).trim(),
        },
      })),
    }
  }, [faqs])

  const isWhite = theme === 'white'
  const isDark = theme === 'dark'

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20 ${
        isDark ? 'bg-gray-900' : isWhite ? 'bg-white' : 'bg-gray-200'
      }`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container className="relative">
        <div
          className={`max-w-4xl mb-12 ${isWhite || isDark ? 'text-center' : ''}`}
        >
          <h2
            className={`text-4xl font-bold leading-tight sm:text-5xl md:text-6xl ${
              isDark ? 'text-white' : isWhite ? 'text-slate-900' : 'text-gray-900'
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`mt-4 text-base sm:text-lg ${
                isDark ? 'text-gray-400' : isWhite ? 'text-slate-600' : 'text-gray-700'
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={
                  isDark
                    ? 'border-b border-gray-700'
                    : isWhite
                      ? 'border-b border-gray-300'
                      : 'border-b border-gray-400'
                }
              >
                <AccordionTrigger
                  className={`py-5 text-left hover:no-underline text-base font-medium sm:text-lg [&>svg]:text-gray-400 ${
                    isDark ? 'text-white' : isWhite ? 'text-slate-900' : 'text-accent'
                  }`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className={`text-sm leading-relaxed sm:text-base ${
                    isDark ? 'text-gray-300' : isWhite ? 'text-slate-600' : 'text-gray-600'
                  }`}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {bottomCta && (
        <div className="bg-gray-900 mt-16 md:mt-24">
          <Container>
            <div className="text-center">
              <h3 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                {bottomCta.heading}
              </h3>
              <p className="mt-4 text-base text-gray-400 sm:text-lg">
                {bottomCta.subtitle}
              </p>
            </div>
          </Container>
        </div>
      )}

        {ctaButton && (
          <div className="mt-16 flex justify-center">
            <Button
              variant="solid"
              color="default"
              size="base"
              className="px-8"
              href={ctaButton.href}
              target="_blank"
            >
              {ctaButton.label}
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}

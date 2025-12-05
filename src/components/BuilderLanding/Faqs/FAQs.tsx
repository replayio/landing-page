'use client'

import { Container } from '~/components/Container'
import { Button } from '~/components/Button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'

interface FAQ {
  question: string
  answer: string | React.ReactNode
}

export function FAQs() {
  const faqs: FAQ[] = [
    {
      question: 'What makes Replay.Builder so good at debugging code?',
      answer: (
        <div className="flex flex-col gap-4">
          <p>
            Our secret sauce is Replay, our powerful code debugging tool. Before building Replay.Builder, 
            the team at Replay built an insanely good deterministic browser-based code
            debugger that recorded billions of activities as your code runs and makes sense of it
            all to then correct issues.
          </p>
          <p>Replay.Builder was built with this core debugging engine inside it.</p>
        </div>
      ),
    },
    {
      question: 'Can I use Replay.Builder for free?',
      answer: (
        <p>
          It&apos;s the age-old question. Short answer is, yes. All new customers start on the Free
          plan, where you can build one app, from start to finish.
        </p>
      ),
    },
    {
      question: 'Can I cancel my plan?',
      answer: (
        <p>
          Yes, you can. If you cancel your plan, you can continue using Replay.Builder to build
          your apps until you reach the end of the current billing cycle.
        </p>
      ),
    },
    {
      question: 'How can I get help or contact support?',
      answer: (
        <div className="flex flex-col gap-4">
          <p>
            We&apos;re here to help! You can reach out to our support team through multiple
            channels:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Join our Discord community for quick help from our team and other users</li>
            <li>Send us an email at support@replay.io for detailed technical questions</li>
            <li>Check out our documentation and tutorials for common questions</li>
          </ul>
          <p>Our team typically responds within 24 hours during business days.</p>
        </div>
      ),
    },
    {
      question: 'Do Builder apps have a built in database?',
      answer: (
        <p>
          Yes! Every app built with Replay.Builder will automatically have a database created along 
          with the interface of the app. We have a deep integration with Supabase. 
          (No, you don't need a crash-course in SQL)
        </p>
      ),
    },
  ]

  return (
    <section id="faq" className="relative isolate overflow-hidden bg-gray-200 pb-16 pt-12 md:pb-24 md:pt-20">
      <Container className="relative">
        {/* Header - Left aligned */}
        <div className="max-w-4xl mb-12">
          <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            Frequently
            <br />
            asked <span className="text-accent">questions</span>
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Everything you need to know about Replay.Builder.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-400"
              >
                <AccordionTrigger className="py-5 text-left hover:no-underline text-base font-medium text-accent sm:text-lg [&>svg]:text-gray-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-16 flex justify-center">
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

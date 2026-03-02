import type { FAQItem } from './FAQs'

export const builderFaqsConfig = {
  title: (
    <>
      Frequently
      <br />
      asked <span className="text-accent">questions</span>
    </>
  ),
  subtitle: 'Everything you need to know about Replay Builder.',
  faqs: [
    {
      question: 'What makes Replay Builder so good at debugging code?',
      answer: (
        <div className="flex flex-col gap-4">
          <p>
            Our secret sauce is Replay, our powerful code debugging tool. Before building Replay
            Builder, the team at Replay built an insanely good deterministic browser-based code
            debugger that recorded billions of activities as your code runs and makes sense of it
            all to then correct issues.
          </p>
          <p>Replay Builder was built with this core debugging engine inside it.</p>
        </div>
      ),
    },
    {
      question: 'Can I use Replay Builder for free?',
      answer: (
        <p>
          It&apos;s the age-old question. Short answer is, yes. All new customers start on the
          Free plan, where you can build one app, from start to finish.
        </p>
      ),
    },
    {
      question: 'Can I cancel my plan?',
      answer: (
        <p>
          Yes, you can. If you cancel your plan, you can continue using Replay Builder to build
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
          Yes! Every app built with Replay Builder will automatically have a database created
          along with the interface of the app. We have a deep integration with Supabase. (No,
          you don&apos;t need a crash-course in SQL)
        </p>
      ),
    },
  ] as FAQItem[],
  theme: 'light' as const,
  ctaButton: {
    href: 'https://builder.replay.io/?focus=true',
    label: 'Start Building',
  },
}

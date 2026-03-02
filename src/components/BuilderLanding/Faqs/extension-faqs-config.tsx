import type { FAQItem } from './FAQs'

export const extensionFaqsConfig = {
  title: 'Common questions',
  subtitle: "Everything you need to know about the Replay Chrome Extension.",
  faqs: [
    {
      question: 'What is the Replay Chrome Extension?',
      answer:
        "It's a free Chrome extension that records what happens in your browser while you use your app. When you hit a bug, Replay analyzes the recording and tells your AI agent exactly how to fix it.",
    },
    {
      question: 'Do I need to know how to code?',
      answer:
        "Nope. Replay is built for people who build with AI tools like Lovable, Base44, Bolt, and Replit. You don't need to read code or understand error messages — Replay handles the debugging for you.",
    },
    {
      question: 'Which AI tools does it work with?',
      answer:
        "Replay works with any AI coding tool that runs in the browser. If you're building with Lovable, Base44, Bolt, Replit, or similar tools, Replay can help your AI fix bugs faster.",
    },
    {
      question: 'Is it free?',
      answer:
        'Yes, Replay is free to get started. Install the extension, record a bug, and get your first fix at no cost.',
    },
  ] as FAQItem[],
  theme: 'dark' as const,
  ctaButton: {
    href: 'https://chromewebstore.google.com/detail/replay/ndjijdodfmndgibhajpdhhnofmnjibhb',
    label: 'Get Replay for Chrome',
  },
  bottomCta: {
    heading: 'Stop going in circles.',
    subtitle: 'Record the bug. Get the fix. Get back to building.',
  },
}

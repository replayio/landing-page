import { Container } from '~/components/Container'
import Link from 'next/link'

const Check = () => (
  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      className="stroke-emerald-500"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="1.5,4.5 3.5,7 7.5,2" />
    </svg>
  </span>
)

const tiers = [
  {
    label: 'Starter',
    name: 'For individuals & small teams',
    desc: 'When hard bugs come up occasionally and you need answers fast.',
    price: 'TBD',
    pricePrefix: '$',
    billing: 'per month · billed annually',
    volume: '~XX sessions / month',
    featuresLabel: 'Includes',
    features: [
      'Full session recording & replay',
      'AI root cause analysis per session',
      'Proposed fix with code context',
      'IDE (MCP) + Chrome extension access',
      '7-day session history',
      'Community support'
    ],
    cta: 'Get started',
    variant: 'default' as const
  },
  {
    label: 'Professional',
    name: 'For teams shipping fast',
    desc: 'Growing teams with no dedicated QA, where every debugging hour is an hour not shipping.',
    price: 'TBD',
    pricePrefix: '$',
    billing: 'per month · billed annually',
    volume: '~XXX sessions / month',
    featuresLabel: 'Everything in Starter, plus',
    features: [
      'Higher monthly session volume',
      'Team sharing & collaborative sessions',
      '30-day session history',
      'Priority RCA queue',
      'Slack-based support',
      'Usage analytics dashboard'
    ],
    cta: 'Talk to us',
    variant: 'featured' as const
  },
  {
    label: 'Enterprise',
    name: 'For high-stakes, high-volume teams',
    desc: 'When production bugs affect revenue or user trust at scale. Custom volume, custom terms.',
    price: 'Custom',
    pricePrefix: '',
    billing: 'volume-based · negotiated annually',
    volume: 'Unlimited or defined session cap',
    featuresLabel: 'Everything in Professional, plus',
    features: [
      'Dedicated Replay engineer support',
      'Custom data retention & compliance',
      'SSO & advanced access controls',
      'SLA guarantees',
      'Private deployment options',
      'Roadmap input & joint planning'
    ],
    cta: 'Contact us',
    variant: 'outline' as const
  }
]

export function PricingTiers() {
  return (
    <section className="relative bg-[#F8F7FB]" id="partner">
      {/* Blurred tiers behind the overlay */}
      <Container className="py-20">
        <div className="pointer-events-none grid select-none gap-5 opacity-50 blur-[2px] md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.label}
              className={`relative flex flex-col rounded-xl border p-7 ${
                tier.variant === 'featured'
                  ? 'border-accent bg-accent/[0.03]'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {tier.variant === 'featured' && (
                <span className="absolute -top-px right-5 rounded-b-lg bg-accent px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white">
                  Most popular
                </span>
              )}

              <p
                className={`mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                  tier.variant === 'featured' ? 'text-accent' : 'text-slate-400'
                }`}
              >
                {tier.label}
              </p>
              <h2 className="mb-2 text-xl font-semibold leading-snug tracking-tight text-slate-900">
                {tier.name}
              </h2>
              <p className="mb-6 min-h-[48px] text-sm leading-relaxed text-slate-500">
                {tier.desc}
              </p>

              <div
                className={`mb-1 font-semibold leading-none tracking-tight text-slate-900 ${
                  tier.price === 'Custom' ? 'text-[34px]' : 'text-[42px]'
                }`}
              >
                {tier.pricePrefix && (
                  <sup className="mr-0.5 align-top text-xl font-medium">{tier.pricePrefix}</sup>
                )}
                {tier.price}
              </div>
              <p className="mb-4 text-xs text-slate-400">{tier.billing}</p>

              <div className="mb-6 flex items-center gap-2 rounded-lg border border-accent/[0.18] bg-accent/[0.07] px-3 py-2">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  className="flex-shrink-0 stroke-accent"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                >
                  <circle cx="6.5" cy="6.5" r="5.5" />
                  <path d="M6.5 4v3l2 1.5" />
                </svg>
                <span className="text-xs font-medium text-accent">{tier.volume}</span>
              </div>

              <div className="mb-5 h-px bg-gray-200" />

              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                {tier.featuresLabel}
              </p>
              <ul className="mb-7 flex flex-1 flex-col gap-2.5">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm leading-snug text-slate-500"
                  >
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>

              <span
                className={`block w-full rounded-xl py-3 text-center text-sm font-medium ${
                  tier.variant === 'featured'
                    ? 'bg-accent text-white'
                    : tier.variant === 'outline'
                      ? 'border border-gray-200 text-slate-500'
                      : 'border border-gray-200 bg-gray-50 text-slate-500'
                }`}
              >
                {tier.cta}
              </span>
            </div>
          ))}
        </div>
      </Container>

      {/* Design Partner overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-10 shadow-xl md:p-14">
            <div
              className="pointer-events-none absolute -right-20 top-1/2 h-[400px] w-[400px] -translate-y-1/2"
              style={{
                background: 'radial-gradient(circle, rgba(240,45,94,0.07) 0%, transparent 70%)'
              }}
            />

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-lg">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
                  Early access &middot; Design partners
                </p>
                <h2 className="mb-3 text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl">
                  Shape what Replay becomes
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  We&apos;re working with a small group of engineering teams to build and refine
                  Replay MCP. Design partners get free access during the program and favorable
                  pricing when they convert &mdash; in exchange for real usage and regular feedback.
                  If your team ships a React or Next.js app and hard bugs are costing you hours,
                  we&apos;d like to talk.
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-row gap-3 md:flex-col">
                <Link
                  href="/partner#apply"
                  className="rounded-full bg-accent px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-accent-light"
                >
                  Apply to partner
                </Link>
                <Link
                  href="mailto:support@replay.io"
                  className="rounded-full border border-gray-200 px-6 py-3 text-center text-sm font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                >
                  Discuss pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import clsx from 'clsx'
import { Container } from '~/components/Container'

export function PricingTiers() {
  const [annual, setAnnual] = useState(true)

  const individualPrice = annual ? 17 : 20
  const individualBillingNote = annual
    ? 'per month · $204 billed annually'
    : 'per month · billed monthly'

  const teamPrice = annual ? 170 : 200
  const teamBillingNote = annual
    ? 'per month · $2,040 billed annually'
    : 'per month · billed monthly'

  return (
    <section className="relative bg-[#F8F7FB] py-16 md:py-20">
      <Container>
        <div className="mb-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={clsx(
              'text-sm font-medium transition',
              !annual ? 'text-gray-900' : 'text-gray-500'
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(!annual)}
            className="relative h-6 w-11 cursor-pointer rounded-full border border-gray-200 bg-white transition-colors focus:outline-none"
            aria-label="Toggle billing period"
          >
            <span
              className={clsx(
                'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-accent shadow transition-transform duration-200',
                annual ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={clsx(
              'flex items-center gap-2 text-sm font-medium transition',
              annual ? 'text-gray-900' : 'text-gray-500'
            )}
          >
            Annual
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
              Save 15%
            </span>
          </button>
        </div>

        <p className="mb-10 text-center text-sm text-gray-600">
          Not sure if it&apos;s worth it?{' '}
          <Link
            href="/roi-calculator"
            className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          >
            Calculate your team&apos;s ROI &rarr;
          </Link>
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative flex flex-col rounded-xl border border-gray-200 bg-white p-7">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400">
              Free
            </p>
            <div className="mb-1 text-[38px] font-semibold leading-none tracking-tight text-gray-900">
              $0
            </div>
            <p className="mb-6 text-xs text-gray-500">always free</p>
            <h2 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-gray-900">
              Try Replay with no commitment
            </h2>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
              25 credits a month, no time limit, no credit card required.
            </p>
            <Link
              href="https://qa.replay.io"
              className="block w-full rounded-xl border border-gray-200 py-3 text-center text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
            >
              Get started free
            </Link>
          </div>

          <div className="relative flex flex-col rounded-xl border border-gray-200 bg-white p-7">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400">
              Individual
            </p>
            <div className="mb-1 text-[38px] font-semibold leading-none tracking-tight text-gray-900">
              <sup className="mr-0.5 align-top text-lg font-medium">$</sup>
              {individualPrice}
            </div>
            <p className="mb-6 text-xs text-gray-500">{individualBillingNote}</p>
            <h2 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-gray-900">
              For individuals using Replay beyond the basics
            </h2>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
              50 credits a month — the right volume for solo builders running a handful of apps or
              workflows.
            </p>
            <Link
              href="https://qa.replay.io"
              className="block w-full rounded-xl border border-gray-200 py-3 text-center text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
            >
              Get started
            </Link>
          </div>

          <div className="relative flex flex-col rounded-xl border border-accent bg-accent/[0.03] p-7">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="whitespace-nowrap rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                Most popular
              </span>
            </div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
              Team
            </p>
            <div className="mb-1 text-[38px] font-semibold leading-none tracking-tight text-gray-900">
              <sup className="mr-0.5 align-top text-lg font-medium">$</sup>
              {teamPrice}
            </div>
            <p className="mb-6 text-xs text-gray-500">{teamBillingNote}</p>
            <h2 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-gray-900">
              For startups and small teams moving fast
            </h2>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
              500 credits a month for teams that ship often and need consistent coverage — however
              they use Replay.
            </p>
            <Link
              href="https://qa.replay.io"
              className="block w-full rounded-xl bg-accent py-3 text-center text-sm font-medium text-white transition hover:bg-accent-light"
            >
              Get started
            </Link>
          </div>

          <div className="relative flex flex-col rounded-xl border border-gray-200 bg-white p-7">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400">
              Enterprise
            </p>
            <div className="mb-1 text-[30px] font-semibold leading-none tracking-tight text-gray-900">
              Custom
            </div>
            <p className="mb-6 text-xs text-gray-500">
              usage-based or seat-based · negotiated together
            </p>
            <h2 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-gray-900">
              For organizations using Replay at scale
            </h2>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
              Custom credit volume, contracts, and support — for however your organization uses
              Replay.
            </p>
            <Link
              href="/contact"
              className="block w-full rounded-xl border border-gray-200 py-3 text-center text-sm font-medium text-gray-600 transition hover:border-accent hover:bg-accent/[0.06] hover:text-accent"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

import Link from 'next/link'
import { Container } from '~/components/Container'
import { Button } from '~/components/Button'

export function SecurityCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Find the vulnerabilities before your users do.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Run a Security Scan against your app. It takes minutes to set up and works on any live
            web app — no security expertise required.
          </p>
          <div className="mt-8">
            <Button href="https://qa.replay.io/new" target="_blank" size="base">
              Run a Security Scan
            </Button>
          </div>
          <p className="mt-4 text-xs text-gray-500">No credit card. Ownership verification required.</p>
          <p className="mt-8 text-sm text-gray-600">
            Need to run this across many projects?{' '}
            <a
              href="mailto:sales@replay.io"
              className="font-medium text-accent transition hover:opacity-80"
            >
              Talk to us
            </a>{' '}
            or{' '}
            <Link href="/pricing" className="font-medium text-accent transition hover:opacity-80">
              see plans
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  )
}

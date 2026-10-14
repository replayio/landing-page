import Link from 'next/link'
import { Container } from '~/components/Container'
import { CopyAgentPrompt } from '~/app/components/CopyAgentPrompt'
import { Button } from '~/components/Button'

const SECURITY_PROMPT = `Run a Replay QA Security Scan (https://qa.replay.io) against the app we're building, then fix what it finds.

Drive everything through the REST API at https://qa.replay.io/api/v1 — read the OpenAPI spec at /api/v1/openapi.json first. Authenticate with my API token ("Authorization: Bearer lqa_..."), asking me for it if needed.

Your job:
1. Create a QA project for the app — preferably the staging environment, not production. Give it the target_url and a short note on the key flows, especially anything involving auth, permissions, or multi-tenant data.
2. Verify ownership. Security Scan sends real attack traffic, so Replay QA requires the app to serve a short plain-text verification file at a specific path. Ask me for the path and contents shown in Replay QA, add the route to the codebase, and check with me before deploying it to the target environment.
3. Enable Security Scan on the project via the API.
4. For each finding, read the full report (how it was found, the exact requests sent, severity, and recommended fix) and apply the fix in the codebase, then mark it fixed via the API.
5. Re-run the scan to confirm each fix, and keep looping until no open findings remain.`

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
            <Button href="https://qa.replay.io/new?utm_source=security" target="_blank" size="base">
              Run a Security Scan
            </Button>
          </div>
          <p className="mt-4 text-xs text-gray-500">No credit card. Ownership verification required.</p>
          <CopyAgentPrompt prompt={SECURITY_PROMPT} />
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

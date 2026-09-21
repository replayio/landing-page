import Link from 'next/link'
import { Container } from '~/components/Container'
import { AutoplayVideo } from '~/app/for-teams/components/AutoplayVideo'

export function SecurityAndProofSection() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gray-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Security Scan</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Your security review reads code. Ours attacks the running app.
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
              <p>
                Static analysis traces data flow and flags what looks dangerous. It structurally
                cannot tell you whether a finding is exploitable, because it never executes
                anything.
              </p>
              <p>
                Security Scan runs a full pentest-scope pass against your running app: injection,
                broken access control, bypassable authentication, insecure API behavior. Because it
                reasons about how your app is <em>supposed</em> to work, it finds the authorization
                and business-logic flaws generic scanners miss — IDOR and cross-tenant data exposure
                in particular. It confirms findings by exploiting them, so what you get is a list of
                real vulnerabilities, not a list of maybes.
              </p>
              <p>
                These are the vulnerability classes AI agents introduce at scale. If your agents are
                writing thousands of pull requests against a multi-tenant database, cross-tenant
                leakage isn&apos;t a ticket — it&apos;s an account-losing event.
              </p>
              <p>
                It sends real attack traffic, so ownership verification is required before a scan
                runs: serve a short plain-text file from your app at a given path. Staging is the
                recommended target. Billed at the same rate as a standard pass.
              </p>
              <p>
                Security Scan adds runtime evidence to your security workflow. It does not replace a
                specialist assessment where your compliance, customer, or risk model requires one.
              </p>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              <Link
                href="/security"
                className="font-medium text-accent transition hover:opacity-80"
              >
                Learn more about Security Scan →
              </Link>
            </p>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              Honest boundary
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              What this doesn&apos;t solve
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
              <p>
                A passing check doesn&apos;t tell you that you understood the original problem. A
                merged pull request doesn&apos;t either. That&apos;s a judgment problem — domain
                understanding, talking to the people who reported the thing, knowing which requests
                are symptoms of something else. No verification layer touches it, and we&apos;re not
                going to claim ours does.
              </p>
              <p>
                We narrow it from one side: your crawls test flows against written intent, and
                Replay QA explores flows nobody specified — so it finds failure paths that sit
                outside the written intent entirely. That&apos;s a smaller claim than solving the
                intent problem. It&apos;s the one that&apos;s true.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-gray-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Proof</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              What we can show you
            </h2>
            <div className="mt-8 flex flex-col gap-8">
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="overflow-hidden rounded-t-lg">
                  <AutoplayVideo
                    src="/benchmark-stat.mp4"
                    label="76% vs 61% runtime access benchmark bar chart"
                  />
                </div>
                <div className="p-6">
                  <p className="font-semibold text-gray-900">Web Debug Bench (Apr 2026)</p>
                  <p className="mt-2 leading-relaxed text-gray-600">
                    177 hard, realistic bugs in agent-built web apps. An agent with runtime access
                    solved <span className="font-semibold text-gray-900">76%</span>; the same agent
                    reading code alone solved{' '}
                    <span className="font-semibold text-gray-900">61%</span>. The largest single
                    delta of any configuration tested.{' '}
                    <Link
                      href="https://blog.replay.io/web-debug-bench"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent transition hover:opacity-80"
                    >
                      blog.replay.io/web-debug-bench →
                    </Link>
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <p className="font-semibold text-gray-900">
                  Deterministic recording, not a JS shim.
                </p>
                <p className="mt-2 leading-relaxed text-gray-600">
                  Chromium-level capture, so a recorded session replays identically every time. This
                  is why root cause analysis works on race conditions and async timing bugs instead
                  of guessing at them.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <p className="font-semibold text-gray-900">The practitioner case.</p>
                <p className="mt-2 leading-relaxed text-gray-600">
                  Charity Majors (co-founder/CTO, Honeycomb) argues that AI-written code demands a
                  shift from code review to validation — behavioral testing, observability, and
                  capture/replay as a core primitive. She also notes that under 10% of engineering
                  teams currently operate in short, fast feedback loops.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

import {
  Eye,
  Gauge,
  MessageSquareWarning,
  ShieldCheck,
  TriangleAlert,
  type LucideIcon
} from 'lucide-react'
import { Container } from '~/components/Container'

const kinds: Array<{ title: string; icon: LucideIcon; examples: string[] }> = [
  {
    title: 'Broken functionality and reliability',
    icon: TriangleAlert,
    examples: [
      'Oversized API responses returning 502',
      'onboarding sending invalid URLs',
      'older PR-run links returning “not found”',
      'repeated login redirects'
    ]
  },
  {
    title: 'Performance',
    icon: Gauge,
    examples: [
      'Smaller API payloads',
      'database indexes',
      'parallel database reads',
      'cached repeated requests',
      'smaller initial JavaScript bundles',
      'appropriately sized images'
    ]
  },
  {
    title: 'Visual/accessibility polish',
    icon: Eye,
    examples: [
      'Layout shifts',
      'low-contrast labels',
      'overflowing sidebar text',
      'mismatched button heights',
      'font-loading shifts'
    ]
  },
  {
    title: 'Error handling and usability',
    icon: MessageSquareWarning,
    examples: [
      'Retry controls instead of falsely saying a run was deleted',
      'checkout confirmation',
      'clearer progress and permission messages',
      'a not-found page for nonexistent routes'
    ]
  },
  {
    title: 'Security and hardening',
    icon: ShieldCheck,
    examples: [
      'Credential redaction',
      'restricting project data returned to viewers',
      'authentication gates',
      'CSP and response headers',
      'removing unused third-party scripts'
    ]
  }
]

export function BugKindsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Our runtime recording and analysis catches issues that static code review can&apos;t
              see.
            </h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              Built upon our core time-travel debugging infrastructure, Replay QA explores each
              generated app, writes and runs its own tests, and catches failures before your users
              do.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {kinds.map(({ title, icon: Icon, examples }, i) => (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg lg:col-span-2 ${i >= 3 ? 'lg:col-span-3' : ''} ${i === 4 ? 'sm:col-span-2 lg:col-span-3' : ''}`}
              >
                <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent/5">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {examples.map((ex) => (
                    <li
                      key={ex}
                      className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs leading-snug text-gray-700 first-letter:uppercase"
                    >
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

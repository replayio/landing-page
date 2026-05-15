import Image from 'next/image'
import { Container } from '~/components/Container'
import { cn } from '~/lib/utils'

import playwright from '~/images/logos/playwright.svg'
import cypress from '~/images/logos/cypress.svg'
import github from '~/images/logos/github.svg'
import circle from '~/images/faq/circle.png'
import claude from '~/images/hero-logos/claude.svg'
import codex from '~/images/hero-logos/Openai.svg'
import cursor from '~/images/hero-logos/cursor.svg'
import copilot from '~/images/hero-logos/copilot.svg'
import windsurf from '~/images/hero-logos/windsurf.svg'

type Integration = {
  name: string
  logo?: typeof playwright | typeof circle
  monochrome?: boolean
}

const testFrameworksAndCi: Integration[] = [
  { name: 'Playwright', logo: playwright, monochrome: true },
  { name: 'Cypress', logo: cypress, monochrome: true },
  { name: 'GitHub Actions', logo: github },
  { name: 'CircleCI', logo: circle },
  { name: 'Jenkins' }
]

const codingAgents: Integration[] = [
  { name: 'Claude Code', logo: claude },
  { name: 'Codex', logo: codex },
  { name: 'Cursor', logo: cursor },
  { name: 'Copilot', logo: copilot },
  { name: 'Windsurf', logo: windsurf }
]

function IntegrationPills({ items }: { items: Integration[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {items.map((item) => (
        <span
          key={item.name}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800"
        >
          {item.logo && (
            <Image
              src={item.logo}
              alt=""
              width={20}
              height={20}
              className={cn('h-5 w-5 object-contain', item.monochrome && 'brightness-0')}
            />
          )}
          {item.name}
        </span>
      ))}
    </div>
  )
}

export function CiPipelineIntegrations() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-200 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            Fits your existing CI pipeline
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:text-lg">
            Swap in Replay in your Playwright or Cypress config and install the GitHub bot. No
            changes to your test code.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <div>
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
              Test frameworks &amp; CI
            </p>
            <IntegrationPills items={testFrameworksAndCi} />
          </div>
          <div>
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
              Coding agents
            </p>
            <IntegrationPills items={codingAgents} />
          </div>
        </div>
      </Container>
    </section>
  )
}

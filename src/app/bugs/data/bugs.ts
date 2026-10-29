import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

// One bug per file in ./bugs, named by its slug. Prose fields are markdown.

/** A collapsed group of evidence probes: `2 evidence probes (NetworkRequest)` and each probe's text. */
export type Evidence = { summary: string; probes: string[] }

export type Step = {
  text: string
  evidence: Evidence[]
  /** A chronology step's timestamp and screenshot. */
  time?: string | null
  shot?: string | null
}

/** Props for the replay player, `ReplayFile`. */
export type Replay = {
  url: string
  title: string
  har?: string
  log?: string
  evidence?: string
  captions?: string
}

type BugFile = {
  title: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: keyof typeof CATEGORIES
  why: string
  project: string
  discovered: string
  report: string
  /** "What the recording showed". */
  finding: string
  actual: string
  expected: string
  replay: Replay | null
  chronology: Step[]
  reproduce: Step[]
  rootCause: Step
  rootCauseSteps: Step[]
}

export type Bug = BugFile & {
  slug: string
  categoryName: string
  homepage: boolean
  thumbnail: string | null
}

// What a card shows: small enough to hand to a client component without the whole report.
export type BugSummary = Pick<
  Bug,
  'slug' | 'title' | 'severity' | 'category' | 'categoryName' | 'why' | 'project' | 'thumbnail'
>

const CATEGORIES = {
  race: 'Races & ordering',
  flash: 'Sub-second glitches',
  state: 'Hidden state corruption',
  silent: 'Swallowed failures',
  perf: 'Render & network forensics'
}

// The six shown on the homepage, in order. Everything else follows on /bugs, high severity first.
const HOMEPAGE = [
  'search-shows-results-for-the-previous-keystroke',
  'checkout-charges-the-pre-discount-total-after-a-promo-code',
  'home-greeting-fails-hydration-good-afternoon-vs-good-evening',
  'users-with-9-notes-are-told-they-have-none-for-760ms',
  'inviting-a-teammate-throws-object-is-not-extensible',
  'every-grid-row-fetches-the-same-owner-record-again'
]

const SEVERITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 }

const DIR = join(process.cwd(), 'src/app/bugs/data/bugs')

const homepageRank = (slug: string) =>
  HOMEPAGE.includes(slug) ? HOMEPAGE.indexOf(slug) : HOMEPAGE.length

export const bugs: Bug[] = readdirSync(DIR)
  .filter((file) => file.endsWith('.json'))
  .map((file) => {
    const bug: BugFile = JSON.parse(readFileSync(join(DIR, file), 'utf8'))
    const slug = file.replace(/\.json$/, '')
    return {
      ...bug,
      slug,
      categoryName: CATEGORIES[bug.category],
      homepage: HOMEPAGE.includes(slug),
      thumbnail: bug.chronology.find((step) => step.shot)?.shot ?? null
    }
  })
  .sort(
    (a, b) =>
      homepageRank(a.slug) - homepageRank(b.slug) ||
      SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity] ||
      a.title.localeCompare(b.title)
  )

export const homepageBugs = bugs.filter((bug) => bug.homepage)

export const getBug = (slug: string) => bugs.find((bug) => bug.slug === slug)

export const summarize = ({
  slug,
  title,
  severity,
  category,
  categoryName,
  why,
  project,
  thumbnail
}: Bug): BugSummary => ({ slug, title, severity, category, categoryName, why, project, thumbnail })

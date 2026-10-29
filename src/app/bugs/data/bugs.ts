import data from './bugs.json'

// Generated from the Replay QA bug catalog by scripts/import-qa-bugs.mjs; edit the catalog, not bugs.json.
// The prose fields (finding, actual, expected, rootCause, the steps) are pre-rendered HTML.
export type Bug = (typeof data)[number]
export type ChronologyStep = Bug['chronology'][number]
/** A collapsed group of evidence probes: `2 evidence probes (NetworkRequest)` and each probe's text. */
export type Evidence = { summary: string; probes: string[] }
// What a card shows: small enough to hand to a client component without the whole report.
export type BugSummary = Pick<
  Bug,
  'slug' | 'title' | 'severity' | 'category' | 'categoryName' | 'why' | 'project' | 'thumbnail'
>

export const bugs: Bug[] = data

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

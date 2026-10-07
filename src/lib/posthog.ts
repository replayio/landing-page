import posthog from 'posthog-js'

/**
 * Path on replay.io that proxies through to PostHog (see the rewrites in next.config.js). Sending
 * ingest and the SDK's lazily-loaded assets through our own origin keeps them off the hostnames
 * tracking blockers filter on. qa.replay.io proxies the same path through its netlify.toml, so the
 * two sites look identical to the SDK.
 *
 * Deliberately not /analytics, /track or /posthog: blocklists match those path names directly,
 * which would defeat the point of proxying at all.
 */
const PROXY_PATH = '/rly'

/**
 * Public, write-only project token — it ships in the client bundle either way, like the Mixpanel
 * token next door. It is read from the environment rather than written here so that rotating it is
 * a Vercel setting and a redeploy, instead of a commit to a public repository.
 */
const PROJECT_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY

/**
 * The key is meant to be scoped to Vercel's production environment, but a variable scoped to the
 * wrong one is a quiet way to pour preview traffic into the project, and the deploy that does it
 * looks exactly like a good one. So the origin is checked too, the way qa.replay.io checks its own.
 *
 * The apex is listed next to www because the .replay.io cookie below spans both, so a visitor who
 * stays on the apex is the same person and should not fall out of the funnel.
 */
const PRODUCTION_ORIGINS = new Set(['https://www.replay.io', 'https://replay.io'])

/**
 * PostHog's real app URL. api_host points at our proxy, so without this the SDK would build links
 * back into replay.io/rly (toolbar, session links) instead of the PostHog UI.
 */
const UI_HOST = process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? 'https://us.posthog.com'

/**
 * Boot PostHog for www.replay.io. No-ops without a key, and on any origin but the live site, which
 * is what keeps local dev and preview deploys out of the production project.
 *
 * The cookie options below are the whole reason this is shared with qa.replay.io: a visitor who
 * reads the marketing site and then signs into the app must stay one person in PostHog rather than
 * splitting into two anonymous profiles at the subdomain boundary.
 */
export function initPostHog(): void {
  if (!PROJECT_KEY) return
  if (!PRODUCTION_ORIGINS.has(window.location.origin)) return

  posthog.init(PROJECT_KEY, {
    api_host: PROXY_PATH,
    ui_host: UI_HOST,

    // The cookie half of this pair is the part that crosses subdomains; localStorage is per-origin
    // and cannot be read by qa.replay.io.
    persistence: 'localStorage+cookie',
    // Write the cookie on .replay.io rather than www.replay.io, so qa.replay.io sees the same
    // distinct_id and session_id.
    cross_subdomain_cookie: true,
    // Each origin keeps its own localStorage copy of that identity, and a stale copy otherwise wins
    // over the shared cookie — which silently breaks the hand-off in exactly the case we care about
    // (a returning visitor who already has a www.replay.io profile). Let the cookie win.
    cookieWinsOnConflict: true,

    // App Router navigations are history pushes, not page loads, so the default load-time pageview
    // would only ever fire for the first page of a visit.
    capture_pageview: 'history_change',
    // Injecting the SDK's lazily-loaded scripts into <body> races React hydration in Next.
    external_scripts_inject_target: 'head',

    // Session recording proxied through Next would be billed against our own bandwidth.
    disable_session_recording: true
  })
}

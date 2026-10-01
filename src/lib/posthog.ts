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

/** Public, write-only project token — safe in the client bundle, like the Mixpanel token above it. */
const PROJECT_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY

/**
 * PostHog's real app URL. api_host points at our proxy, so without this the SDK would build links
 * back into replay.io/rly (toolbar, session links) instead of the PostHog UI.
 */
const UI_HOST = process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? 'https://us.posthog.com'

/**
 * Boot PostHog for www.replay.io. No-ops when NEXT_PUBLIC_POSTHOG_KEY is unset, which is what keeps
 * local dev and preview builds out of the production project.
 *
 * The cookie options below are the whole reason this is shared with qa.replay.io: a visitor who
 * reads the marketing site and then signs into the app must stay one person in PostHog rather than
 * splitting into two anonymous profiles at the subdomain boundary.
 */
export function initPostHog(): void {
  if (!PROJECT_KEY) return

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

    // LogRocket already records this site, and replays proxied through Next would be billed against
    // our own bandwidth. Revisit once we decide which recorder we are standardizing on.
    disable_session_recording: true
  })
}

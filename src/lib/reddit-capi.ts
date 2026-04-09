/**
 * Reddit Conversions API (server-side only — do not import from client components).
 *
 * Setup: Reddit Ads Manager → Set up Conversions API → generate a Conversion Access Token.
 * The URL path uses your Reddit **Ads account ID** (from the dashboard), which may differ
 * from the browser pixel id (`NEXT_PUBLIC_REDDIT_PIXEL_ID`).
 *
 * @see https://business.reddithelp.com/s/article/send-conversion-events-with-the-API
 * @see https://business.reddithelp.com/s/article/conversion-access-token
 */

const REDDIT_CAPI_BASE = 'https://ads-api.reddit.com/api/v2.0/conversions/events'

export type RedditCapiStandardEvent =
  | 'PageVisit'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'Purchase'
  | 'Lead'
  | 'SignUp'
  | 'Custom'

export type RedditCapiEventTypePayload =
  | { tracking_type: RedditCapiStandardEvent }
  | { tracking_type: 'Custom'; custom_event_name: string }

export type RedditCapiEvent = {
  event_at: string
  event_type: RedditCapiEventTypePayload
  user?: Record<string, unknown>
  event_metadata?: Record<string, unknown>
  /** Reddit click id when available (e.g. from ads). */
  click_id?: string
}

function toEventTypePayload(name: string): RedditCapiEventTypePayload {
  const standard = [
    'PageVisit',
    'ViewContent',
    'Search',
    'AddToCart',
    'AddToWishlist',
    'Purchase',
    'Lead',
    'SignUp'
  ] as const
  if ((standard as readonly string[]).includes(name)) {
    return { tracking_type: name as RedditCapiStandardEvent }
  }
  return { tracking_type: 'Custom', custom_event_name: name }
}

/** Build one CAPI event (ISO-8601 `event_at`, Reddit `event_type` shape). */
export function redditCapiEvent(input: {
  eventName: string
  eventAt?: Date
  clickId?: string
  user?: Record<string, unknown>
  eventMetadata?: Record<string, unknown>
}): RedditCapiEvent {
  const event: RedditCapiEvent = {
    event_at: (input.eventAt ?? new Date()).toISOString(),
    event_type: toEventTypePayload(input.eventName)
  }
  if (input.clickId) event.click_id = input.clickId
  if (input.user && Object.keys(input.user).length) event.user = input.user
  if (input.eventMetadata && Object.keys(input.eventMetadata).length) {
    event.event_metadata = input.eventMetadata
  }
  return event
}

export type SendRedditCapiResult =
  | { ok: true; status: number }
  | { ok: false; reason: 'missing_env' }
  | { ok: false; reason: 'http_error'; status: number; body: string }

/**
 * POST conversion events to Reddit. Requires `REDDIT_ADS_ACCOUNT_ID` and
 * `REDDIT_CONVERSION_ACCESS_TOKEN` in the environment.
 */
export async function sendRedditConversionEvents(
  events: RedditCapiEvent[],
  options?: { testMode?: boolean }
): Promise<SendRedditCapiResult> {
  const token = process.env.REDDIT_CONVERSION_ACCESS_TOKEN
  const accountId = process.env.REDDIT_ADS_ACCOUNT_ID?.trim()

  if (!token || !accountId || events.length === 0) {
    return { ok: false, reason: 'missing_env' }
  }

  const body = {
    test_mode: options?.testMode ?? false,
    events
  }

  const res = await fetch(`${REDDIT_CAPI_BASE}/${accountId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const text = await res.text()
    return { ok: false, reason: 'http_error', status: res.status, body: text }
  }

  return { ok: true, status: res.status }
}

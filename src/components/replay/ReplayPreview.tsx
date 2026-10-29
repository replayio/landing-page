import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { BrowserBar, ReplayPlayer } from './ReplayPlayer';
import type { ReplayPlayerOptions, ReplayPreviewHandle } from './ReplayPlayer';
import type { ReplayEvent } from './types';
import { normalizeReplayEmbedUrl } from './url';

export { formatReplayTime } from './ReplayPlayer';
export type { ReplayChrome, ReplayPlayerOptions, ReplayPreviewHandle } from './ReplayPlayer';

export interface ReplayPageSource {
  kind: 'url';
  url: string;
  title?: string;
}

export interface ReplayEventsSource {
  kind: 'events';
  events: ReplayEvent[];
}

export interface ReplayEventsUrlSource {
  kind: 'events-url';
  url: string;
  fetchInit?: RequestInit;
}

export type ReplaySource =
  | string
  | ReplayEvent[]
  | ReplayPageSource
  | ReplayEventsSource
  | ReplayEventsUrlSource;

interface ReplayPreviewCommon extends ReplayPlayerOptions {
  /** Keep the player unmounted (a placeholder frame) until true, e.g. until an editor block is visible. */
  active?: boolean;
}

/** Play an rrweb recording you already hold. */
export interface ReplayPreviewEventsProps extends ReplayPreviewCommon {
  events: ReplayEvent[];
  source?: undefined;
}

/** Embed a public Loop QA URL, a public event endpoint, or an in-memory rrweb event list. */
export interface ReplayPreviewSourceProps extends ReplayPreviewCommon {
  source: ReplaySource;
  events?: undefined;
}

/** Pass `events` (the player API) or `source` (the embed API): both render the same player. */
export type ReplayPreviewProps = ReplayPreviewEventsProps | ReplayPreviewSourceProps;

function sourcePage(source: ReplaySource): ReplayPageSource | null {
  if (typeof source === 'string') return { kind: 'url', url: source };
  if (Array.isArray(source)) return null;
  return source.kind === 'url' ? source : null;
}

function sourceEvents(source: ReplaySource): ReplayEventsSource | null {
  if (Array.isArray(source)) return { kind: 'events', events: source };
  if (typeof source === 'string') return null;
  return source.kind === 'events' ? source : null;
}

function sourceEventsUrl(source: ReplaySource): ReplayEventsUrlSource | null {
  if (Array.isArray(source) || typeof source === 'string') return null;
  return source.kind === 'events-url' ? source : null;
}

/** The frame around a non-player body (an iframe, a loading or error note): same root, same chrome hooks. */
function Frame({
  kind, chrome, className, title, href, trafficLights = true, ar, style, children,
}: {
  kind: string;
  chrome: NonNullable<ReplayPlayerOptions['chrome']>;
  className?: string;
  title?: string;
  href?: string;
  trafficLights?: boolean;
  ar?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={className ? `replay-preview ${className}` : 'replay-preview'}
      data-slot="replay-preview"
      data-replay-preview={kind}
      data-chrome={chrome}
      data-fit="width"
      style={style}
      {...(title ? { role: 'group', 'aria-label': title } : null)}
    >
      {chrome === 'browser' ? <BrowserBar href={href ?? ''} trafficLights={trafficLights} loading={false} /> : null}
      <div data-slot="replay-preview-stage" style={ar ? ({ '--replay-ar': ar } as CSSProperties) : undefined}>
        {children}
      </div>
    </div>
  );
}

function ReplayFrame({
  source, title, chrome = 'minimal', className, style, trafficLights,
}: { source: ReplayPageSource } & Pick<ReplayPlayerOptions, 'title' | 'chrome' | 'className' | 'style' | 'trafficLights'>) {
  const url = normalizeReplayEmbedUrl(source.url);
  return (
    <Frame kind="iframe" chrome={chrome} className={className} style={style} href={url ?? source.url} trafficLights={trafficLights} ar="16 / 9">
      {url ? (
        <iframe
          className="replay-preview__frame"
          src={url}
          title={title ?? source.title ?? 'Replay preview'}
          loading="lazy"
          allow="autoplay; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <a className="replay-preview__invalid" href={source.url} target="_blank" rel="noreferrer">
          Open replay
        </a>
      )}
    </Frame>
  );
}

function RemoteReplay({ source, options }: { source: ReplayEventsUrlSource; options: ReplayPlayerOptions }) {
  const [events, setEvents] = useState<ReplayEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setEvents(null);
    setError(null);
    fetch(source.url, { ...source.fetchInit, signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Replay event request failed (${response.status})`);
        const body = (await response.json()) as unknown;
        const value = Array.isArray(body)
          ? body
          : body && typeof body === 'object' && Array.isArray((body as { events?: unknown }).events)
            ? (body as { events: unknown[] }).events
            : null;
        if (!value) throw new Error('Replay event endpoint must return an event array or { events }');
        return value as ReplayEvent[];
      })
      .then(setEvents)
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === 'AbortError') return;
        setError(reason instanceof Error ? reason.message : 'Unable to load replay data');
      });
    return () => controller.abort();
  }, [source.url, source.fetchInit]);

  if (events) return <ReplayPlayer {...options} events={events} />;
  return (
    <Frame kind="rrweb" chrome={options.chrome ?? 'browser'} className={options.className} style={options.style} href={options.url} trafficLights={options.trafficLights} ar="16 / 9">
      {error ? (
        <div className="replay-preview__error" role="alert">{error}</div>
      ) : (
        <div className="replay-preview__empty">Loading replay…</div>
      )}
    </Frame>
  );
}

/**
 * A session replay in a browser frame. Pass `events` (an rrweb recording) to play it with the full player:
 * URL bar, poster, scrubber with markers, pointer overlay, keyboard map, fullscreen. Or pass `source` (a
 * public Loop QA URL, an events URL, or an event list), which renders the same player, or an iframe for
 * page URLs. rrweb loads on first render of an event player, never for iframes.
 */
export function ReplayPreview(props: ReplayPreviewProps) {
  const { active = true, source, events, ...options } = props;
  const { chrome, className, style } = options;

  if (!active) {
    return (
      <div
        className={className ? `replay-preview ${className}` : 'replay-preview'}
        data-slot="replay-preview"
        data-replay-preview="paused"
        data-chrome={chrome ?? 'minimal'}
        style={style}
      />
    );
  }

  if (events) return <ReplayPlayer {...options} events={events} />;
  if (source === undefined) return null;

  const page = sourcePage(source);
  if (page) {
    return <ReplayFrame source={page} title={options.title} chrome={chrome} className={className} style={style} trafficLights={options.trafficLights} />;
  }
  const list = sourceEvents(source);
  if (list) return <ReplayPlayer {...options} events={list.events} />;
  const remote = sourceEventsUrl(source);
  if (remote) return <RemoteReplay source={remote} options={options} />;
  return null;
}

/** Semantic alias for markdown/document renderers. */
export const ReplayEmbed = ReplayPreview;

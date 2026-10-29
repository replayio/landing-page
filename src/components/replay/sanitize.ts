import { ReplayEventType as EventType, ReplayIncrementalSource as IncrementalSource, type ReplayEvent } from './types';

const TRANSPARENT_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const EMPTY_STYLESHEET = 'data:text/css,';

function isLocalNetworkUrl(value: string): boolean {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')) return true;
  if (host === '0.0.0.0' || host === '::1' || host.startsWith('127.') || host.startsWith('10.')) {
    return true;
  }
  if (host.startsWith('192.168.')) return true;
  const private172 = host.match(/^172\.(\d{1,3})\./);
  if (private172 && Number(private172[1]) >= 16 && Number(private172[1]) <= 31) return true;
  return host.includes(':') && (host.startsWith('fc') || host.startsWith('fd'));
}

function sanitizeCss(value: string): string {
  return value.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, (whole, quote: string, raw: string) =>
    isLocalNetworkUrl(raw.trim()) ? `url(${quote}${TRANSPARENT_PIXEL}${quote})` : whole,
  );
}

function sanitizeAttributes(attributes: Record<string, unknown>): void {
  for (const key of Object.keys(attributes)) {
    const value = attributes[key];
    if (typeof value !== 'string') continue;
    const lower = key.toLowerCase();
    if (lower === 'src' || lower === 'poster' || lower === 'background') {
      if (isLocalNetworkUrl(value)) attributes[key] = TRANSPARENT_PIXEL;
    } else if (lower === 'data') {
      if (isLocalNetworkUrl(value)) attributes[key] = 'about:blank';
    } else if (lower === 'style' || lower === '_csstext') {
      attributes[key] = sanitizeCss(value);
    } else if (lower === 'href' || lower === 'xlink:href') {
      if (isLocalNetworkUrl(value)) attributes[key] = EMPTY_STYLESHEET;
    }
  }
}

function walkNode(node: unknown): void {
  if (!node || typeof node !== 'object') return;
  const value = node as { attributes?: unknown; childNodes?: unknown };
  if (value.attributes && typeof value.attributes === 'object') {
    sanitizeAttributes(value.attributes as Record<string, unknown>);
  }
  if (Array.isArray(value.childNodes)) value.childNodes.forEach(walkNode);
}

/** Prevent a replay iframe from making the viewer fetch localhost/private assets. */
export function sanitizeReplayEvent<T extends ReplayEvent>(event: T): T {
  try {
    if (event.type === EventType.FullSnapshot) {
      walkNode((event.data as { node?: unknown }).node);
    } else if (event.type === EventType.IncrementalSnapshot) {
      const data = event.data as {
        source?: number;
        adds?: Array<{ node?: unknown }>;
        attributes?: Array<{ attributes?: unknown }>;
      };
      if (data.source === IncrementalSource.Mutation) {
        data.adds?.forEach((item) => walkNode(item.node));
        data.attributes?.forEach((item) => {
          if (item.attributes && typeof item.attributes === 'object') {
            sanitizeAttributes(item.attributes as Record<string, unknown>);
          }
        });
      }
    }
  } catch {
    // A malformed asset must never take down the player.
  }
  return event;
}

/**
 * Convert a normal Loop QA project URL to its chrome-free public embed route.
 * The application owns auth/public-access decisions; this helper only changes
 * the route shape that Loop QA already exposes for cross-site iframes.
 */
export function normalizeReplayEmbedUrl(input: string): string | null {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return null;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;

  const parts = url.pathname.split('/').filter(Boolean);
  if (parts[0] === 'projects' && parts.length >= 4) {
    const projectId = decodeURIComponent(parts[1] ?? '');
    const kind = parts[2] === 'explorations' ? 'tasks' : parts[2];
    const resourceId = decodeURIComponent(parts[3] ?? '');
    if (
      projectId &&
      resourceId &&
      (kind === 'tasks' || kind === 'journeys' || kind === 'test-runs')
    ) {
      url.pathname = `/p/${encodeURIComponent(projectId)}/${kind}/${encodeURIComponent(resourceId)}`;
    }
  }

  return url.toString();
}

export function isReplayQaUrl(input: string): boolean {
  const normalized = normalizeReplayEmbedUrl(input);
  if (!normalized) return false;
  try {
    const url = new URL(normalized);
    return url.pathname.startsWith('/p/') || url.hostname.endsWith('.replay.io');
  } catch {
    return false;
  }
}

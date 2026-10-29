'use client'

import { useEffect, useRef, useState } from 'react';
import { ReplayPreview } from './ReplayPreview';
import type { ReplayPlayerOptions } from './ReplayPlayer';

export interface ReplayFileProps extends Omit<ReplayPlayerOptions, 'url' | 'har' | 'consoleLog' | 'evidence' | 'captions'> {
  /** The `.rrweb` file as written in the document; the host's asset resolver maps it to a loadable URL. */
  url: string;
  /** A `.har` file recorded alongside (resolved the same way): its requests join DevTools' Network list. */
  har?: string;
  /** A console log recorded alongside (`<ISO time> [level] message` lines): its messages join the Console. */
  log?: string;
  /** A debugger's evidence (evidence.ts): source, logpoints and screenshots. */
  evidence?: string;
  /** Captions: a WebVTT file on the recording's clock. */
  captions?: string;
}

// docstream maps document-relative URLs through its AssetResolverProvider; here every URL is already public.
const useAsset = (url: string): string | undefined => url;

/** The text of a file the asset resolver maps, fetched once `enabled`; undefined until it arrives or if it fails. */
function useAssetText(url: string | undefined, enabled: boolean): { text?: string; done: boolean } {
  const src = useAsset(url ?? '');
  const [state, setState] = useState<{ text?: string; done: boolean }>({ done: !url });
  useEffect(() => {
    if (!url || !enabled || src === undefined) return;
    const controller = new AbortController();
    fetch(src, { signal: controller.signal })
      .then((r) => (r.ok ? r.text() : undefined))
      .then((text) => setState({ text, done: true }), () => !controller.signal.aborted && setState({ done: true }));
    return () => controller.abort();
  }, [url, src, enabled]);
  return url ? state : { done: true };
}

/**
 * An rrweb recording file (a JSON event array, or `{ events }`), played in the replay browser frame. A HAR and a
 * console log recorded beside it are fetched alongside and join DevTools when they arrive, without holding up
 * (or restarting) the replay. The URL goes through `AssetResolverProvider`, and the file is fetched only once the frame nears the
 * viewport, so a page of recordings doesn't download them all up front. A media fragment on the URL,
 * `recording.rrweb#t=4.7,7.4` (seconds), is its `timeWindow`.
 */
export function ReplayFile({ url, har, log, evidence, captions, ...options }: ReplayFileProps) {
  const { file, segment } = splitReplayFragment(url);
  const src = useAsset(file);
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (near) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return setNear(true);
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && setNear(true), { rootMargin: '240px' });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  const harFile = useAssetText(har, near);
  const logFile = useAssetText(log, near);
  const evidenceFile = useAssetText(evidence, near);
  const captionsFile = useAssetText(captions, near);

  // The recording plays as soon as it's here; the HAR and the log join DevTools whenever they arrive.
  if (!near || src === undefined) return <div ref={ref} className="docstream-asset-pending" data-slot="replay-file" aria-busy="true" />;
  return (
    <ReplayPreview
      source={{ kind: 'events-url', url: src }}
      chrome="browser"
      timeWindow={segment}
      har={harFile.text}
      consoleLog={logFile.text}
      evidence={evidenceFile.text}
      captions={captionsFile.text}
      {...options}
    />
  );
}

/** Splits `#t=start,end` (a media fragment, in seconds; `#t=start` runs to the end) off a recording's URL. */
export function splitReplayFragment(url: string): { file: string; segment?: [number, number] } {
  const hash = url.indexOf('#');
  if (hash < 0) return { file: url };
  const m = url.slice(hash + 1).match(/(?:^|&)t=(?:npt:)?([\d.]*)(?:,([\d.]+))?(?:&|$)/);
  if (!m) return { file: url };
  const start = m[1] ? Number(m[1]) * 1000 : 0;
  const end = m[2] ? Number(m[2]) * 1000 : Infinity;
  return { file: url.slice(0, hash), segment: Number.isFinite(start) && end > start ? [start, end] : undefined };
}

const RRWEB = /\.rrweb(?:[?#]|$)/i;

/** True for an rrweb recording file: a URL whose path ends in `.rrweb`. */
export function isRrwebUrl(url: string): boolean {
  return RRWEB.test(url.trim());
}

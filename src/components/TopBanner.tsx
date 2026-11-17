'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent
} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { ArrowRight } from 'lucide-react'
import { SelfHealingVideo } from '~/components/SelfHealingVideo'

const HREF = '/self-healing-mode'
// The Self-healing Mode launch on Product Hunt.
const PRODUCT_HUNT_URL =
  'https://www.producthunt.com/products/replayio?launch=replay-qa-self-healing-mode'

// Routes that skip the banner. The page it links to doesn't need to announce itself.
const HIDDEN_ON = new Set([HREF])

// A short grace period so the panel doesn't snap shut when the pointer grazes its edge.
const CLOSE_DELAY_MS = 200

/**
 * Site-wide announcement bar above the header. Rendering it also reserves its height through
 * `--banner-height`, which the header and `--site-header-offset` read. Hidden routes render
 * nothing, so they keep the 0px default and never shift on load.
 *
 * Hovering (or tabbing into) the bar drops down a panel with the overview video. The panel
 * overlays the page instead of pushing it down, the video only mounts on first open, and it
 * pauses when the panel closes. Touch devices skip the panel and follow the link.
 */
export function TopBanner() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const show = useCallback(() => {
    window.clearTimeout(closeTimer.current)
    setLoaded(true)
    setOpen(true)
  }, [])

  const hide = useCallback((delay = CLOSE_DELAY_MS) => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(false), delay)
  }, [])

  // Pause playback whenever the panel closes, so nothing keeps playing out of sight.
  useEffect(() => {
    if (!open) videoRef.current?.pause()
  }, [open])

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  if (HIDDEN_ON.has(pathname)) return null

  const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hide(0)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') hide(0)
  }

  return (
    <>
      <style>{':root{--banner-height:40px}'}</style>
      <div
        className={clsx(
          'fixed top-0 z-[60] w-full bg-gray-900 text-white transition-shadow duration-300',
          open && 'shadow-[0_18px_40px_rgba(0,0,0,0.35)]'
        )}
        onMouseEnter={() => canHover() && show()}
        onMouseLeave={() => hide()}
        onFocus={show}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      >
        <Link
          href={HREF}
          onClick={() => setOpen(false)}
          className="group flex h-[var(--banner-height)] w-full items-center justify-center gap-2 px-3 text-xs sm:gap-3 sm:text-sm"
        >
          {/* A light streak loops around the label's 1px border while the box glows. */}
          <span className="relative inline-flex shrink-0 overflow-hidden rounded-md p-px shadow-[0_0_6px_rgba(240,45,94,0.45)] motion-safe:animate-glowPulse">
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -ml-12 -mt-12 h-24 w-24 bg-[conic-gradient(from_0deg,transparent_0deg,#f02d5e_90deg,#fff_140deg,transparent_180deg,transparent_360deg)] motion-safe:animate-borderSpin motion-reduce:bg-accent motion-reduce:bg-none"
            />
            <span className="relative rounded-[5px] bg-gray-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
              New
            </span>
          </span>
          <span className="truncate">
            <span className="sm:hidden">Self-healing Mode is here.</span>
            <span className="hidden sm:inline">
              Turn user frustration into verified fixes with Self-healing Mode.
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 font-semibold underline decoration-white/40 underline-offset-2 transition group-hover:decoration-white">
            Learn more
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        {/* Animating grid rows from 0fr to 1fr lets the panel ease to its natural height. */}
        <div
          inert={!open}
          className={clsx(
            'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
        >
          <div className="overflow-hidden">
            <div
              className={clsx(
                'mx-auto w-full max-w-[560px] px-4 pb-5 pt-1 transition-opacity duration-300',
                open ? 'opacity-100' : 'opacity-0'
              )}
            >
              {loaded && (
                <SelfHealingVideo ref={videoRef} className="rounded-lg border border-white/10" />
              )}
              <p className="mt-3 text-center text-sm text-gray-300">
                We&apos;re live on Product Hunt today.{' '}
                <a
                  href={PRODUCT_HUNT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#ff6154] underline decoration-[#ff6154]/40 underline-offset-2 transition hover:decoration-[#ff6154]"
                >
                  Come check us out
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

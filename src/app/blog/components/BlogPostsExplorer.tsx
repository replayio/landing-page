'use client'

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { Search } from 'lucide-react'
import { clsx } from 'clsx'
import { BlogPost } from '~/lib/notion-blog'
import { loadAllBlogPosts, loadMoreBlogPosts } from '../actions'
import { BlogPostCard } from './BlogPostCard'

const ALL_FILTER = 'All'
const LOAD_MORE_BATCH = 24
const PRIORITY_CARD_COUNT = 3
/** Delay before kicking off the background prefetch so it never competes with LCP/initial paint. */
const BACKGROUND_PREFETCH_DELAY_MS = 1500

type BlogPostsExplorerProps = {
  initialPosts: BlogPost[]
  totalCount: number
  initialTags: string[]
}

type IdleDeadline = { didTimeout: boolean; timeRemaining: () => number }
type RequestIdleCallback = (
  callback: (deadline: IdleDeadline) => void,
  options?: { timeout?: number }
) => number
type CancelIdleCallback = (handle: number) => void

const scheduleIdle = (cb: () => void): (() => void) => {
  if (typeof window === 'undefined') return () => {}

  const ric = (window as unknown as { requestIdleCallback?: RequestIdleCallback })
    .requestIdleCallback
  const cic = (window as unknown as { cancelIdleCallback?: CancelIdleCallback }).cancelIdleCallback

  if (typeof ric === 'function') {
    const handle = ric(() => cb(), { timeout: 4000 })
    return () => {
      if (typeof cic === 'function') cic(handle)
    }
  }

  const timeout = window.setTimeout(cb, 0)
  return () => window.clearTimeout(timeout)
}

export function BlogPostsExplorer({
  initialPosts,
  totalCount,
  initialTags
}: BlogPostsExplorerProps) {
  const initiallyComplete = initialPosts.length >= totalCount

  const [loadedPosts, setLoadedPosts] = useState<BlogPost[]>(initialPosts)
  const [allPostsCache, setAllPostsCache] = useState<BlogPost[] | null>(
    initiallyComplete ? initialPosts : null
  )
  const [isBackgroundLoading, setIsBackgroundLoading] = useState<boolean>(!initiallyComplete)
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string>(ALL_FILTER)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const backgroundInFlightRef = useRef<Promise<BlogPost[]> | null>(null)

  const hasAllPosts = allPostsCache !== null
  const isFiltering = query.trim().length > 0 || activeTag !== ALL_FILTER

  const runBackgroundPrefetch = useCallback((): Promise<BlogPost[]> => {
    if (allPostsCache) return Promise.resolve(allPostsCache)
    if (backgroundInFlightRef.current) return backgroundInFlightRef.current

    setIsBackgroundLoading(true)
    const promise = loadAllBlogPosts()
      .then((all) => {
        setAllPostsCache(all)
        setError(null)
        return all
      })
      .catch((err) => {
        console.warn('[blog] Background prefetch failed:', err)
        throw err
      })
      .finally(() => {
        setIsBackgroundLoading(false)
        backgroundInFlightRef.current = null
      })

    backgroundInFlightRef.current = promise
    return promise
  }, [allPostsCache])

  useEffect(() => {
    if (initiallyComplete) return undefined

    let cancelled = false
    let cancelIdle: (() => void) | null = null
    const timer = window.setTimeout(() => {
      if (cancelled) return
      cancelIdle = scheduleIdle(() => {
        if (cancelled) return
        runBackgroundPrefetch().catch(() => {
          // surfaced via state if user-initiated; silent otherwise
        })
      })
    }, BACKGROUND_PREFETCH_DELAY_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      if (cancelIdle) cancelIdle()
    }
  }, [initiallyComplete, runBackgroundPrefetch])

  const ensureAllPostsForUserAction = useCallback(() => {
    if (allPostsCache) return
    runBackgroundPrefetch().catch((err) => {
      console.error('[blog] Failed to load all posts:', err)
      setError('Could not load the full archive. Please try again.')
    })
  }, [allPostsCache, runBackgroundPrefetch])

  const handleSearchChange = (value: string) => {
    setQuery(value)
    if (value.trim().length > 0) ensureAllPostsForUserAction()
  }

  const handleTagSelect = (tag: string) => {
    setActiveTag(tag)
    if (tag !== ALL_FILTER) ensureAllPostsForUserAction()
  }

  const handleLoadMore = () => {
    if (loadedPosts.length >= totalCount) return

    if (allPostsCache) {
      const nextCount = Math.min(loadedPosts.length + LOAD_MORE_BATCH, allPostsCache.length)
      setLoadedPosts(allPostsCache.slice(0, nextCount))
      return
    }

    if (isPending) return

    startTransition(async () => {
      try {
        const { posts: nextBatch, total } = await loadMoreBlogPosts(
          loadedPosts.length,
          LOAD_MORE_BATCH
        )
        setLoadedPosts((prev) => {
          const seen = new Set(prev.map((p) => p.id))
          const merged = [...prev]
          for (const post of nextBatch) {
            if (!seen.has(post.id)) merged.push(post)
          }
          if (merged.length >= total) setAllPostsCache(merged)
          return merged
        })
        setError(null)
      } catch (err) {
        console.error('[blog] Failed to load more posts:', err)
        setError('Could not load more posts. Please try again.')
      }
    })
  }

  const tags = useMemo(() => {
    const source = allPostsCache ?? loadedPosts
    const seen = new Set<string>(initialTags)
    for (const post of source) {
      for (const tag of post.tags) seen.add(tag)
    }
    return [ALL_FILTER, ...Array.from(seen).sort((a, b) => a.localeCompare(b))]
  }, [allPostsCache, loadedPosts, initialTags])

  const normalizedQuery = query.trim().toLowerCase()

  const filterSource = isFiltering ? allPostsCache ?? loadedPosts : loadedPosts

  const filteredPosts = useMemo(() => {
    return filterSource.filter((post) => {
      const matchesTag = activeTag === ALL_FILTER || post.tags.includes(activeTag)
      if (!matchesTag) return false

      if (!normalizedQuery) return true

      const haystack = [post.title, post.excerpt, ...post.authors, ...post.tags]
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedQuery)
    })
  }, [filterSource, activeTag, normalizedQuery])

  const showLoadMore = !isFiltering && loadedPosts.length < totalCount
  const remainingCount = Math.max(0, totalCount - loadedPosts.length)
  const filteringWithoutCache = isFiltering && !allPostsCache && isBackgroundLoading

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search posts..."
            aria-label="Search blog posts"
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="-mx-4 overflow-x-auto md:mx-0">
          <div className="flex min-w-min items-center gap-2 px-4 md:px-0">
            {tags.map((tag) => {
              const isActive = tag === activeTag
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagSelect(tag)}
                  aria-pressed={isActive}
                  className={clsx(
                    'whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'border-accent bg-accent text-white shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:text-gray-900'
                  )}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {error ? (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      ) : null}

      <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <BlogPostCard key={post.id} post={post} priority={index < PRIORITY_CARD_COUNT} />
        ))}
      </section>

      {filteredPosts.length === 0 ? (
        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-600">
          {totalCount === 0 ? (
            <>
              No blog posts are published yet. Make sure posts in Notion have <code>hidden</code>{' '}
              unchecked.
            </>
          ) : filteringWithoutCache ? (
            <>Loading the full archive&hellip;</>
          ) : (
            <>
              No posts match
              {normalizedQuery ? <> &ldquo;{query}&rdquo;</> : null}
              {activeTag !== ALL_FILTER ? <> in {activeTag}</> : null}.
            </>
          )}
        </div>
      ) : null}

      {showLoadMore ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isPending}
            className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Loading…' : `Load more (${remainingCount} remaining)`}
          </button>
        </div>
      ) : null}

      {filteringWithoutCache && filteredPosts.length > 0 ? (
        <p className="mt-6 text-center text-sm text-gray-500">Searching the full archive&hellip;</p>
      ) : null}
    </div>
  )
}

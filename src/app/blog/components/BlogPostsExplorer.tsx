'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { clsx } from 'clsx'
import { BlogPost } from '~/lib/notion-blog'
import { BlogPostCard } from './BlogPostCard'

type BlogPostsExplorerProps = {
  posts: BlogPost[]
}

const ALL_FILTER = 'All'

export function BlogPostsExplorer({ posts }: BlogPostsExplorerProps) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string>(ALL_FILTER)

  const tags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const post of posts) {
      for (const tag of post.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }
    return [ALL_FILTER, ...Array.from(counts.keys()).sort((a, b) => a.localeCompare(b))]
  }, [posts])

  const normalizedQuery = query.trim().toLowerCase()

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = activeTag === ALL_FILTER || post.tags.includes(activeTag)
      if (!matchesTag) return false

      if (!normalizedQuery) return true

      const haystack = [post.title, post.excerpt, ...post.authors, ...post.tags]
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedQuery)
    })
  }, [posts, activeTag, normalizedQuery])

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
            onChange={(event) => setQuery(event.target.value)}
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
                  onClick={() => setActiveTag(tag)}
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

      <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </section>

      {filteredPosts.length === 0 ? (
        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-600">
          {posts.length === 0 ? (
            <>
              No blog posts are published yet. Make sure posts in Notion have <code>hidden</code>{' '}
              unchecked.
            </>
          ) : (
            <>
              No posts match
              {normalizedQuery ? <> &ldquo;{query}&rdquo;</> : null}
              {activeTag !== ALL_FILTER ? <> in {activeTag}</> : null}.
            </>
          )}
        </div>
      ) : null}
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '~/lib/notion-blog'

type BlogPostCardProps = {
  post: BlogPost
}

const formatDate = (date: string | null) => {
  if (!date) return null

  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = formatDate(post.publishedAt)
  const href = `/blog/${post.slug}`

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {post.coverEnabled && post.coverImageUrl ? (
        <Link href={href} className="relative block aspect-[16/9] w-full overflow-hidden">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-gray-950">
          <Link href={href} className="transition-colors hover:text-accent">
            {post.title}
          </Link>
        </h2>

        {post.excerpt ? (
          <p className="mt-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
        ) : null}

        <div className="mt-auto flex items-center justify-between pt-6 text-sm text-gray-500">
          <span>{post.authors.join(', ') || 'Replay Team'}</span>
          {formattedDate ? <time dateTime={post.publishedAt!}>{formattedDate}</time> : null}
        </div>
      </div>
    </article>
  )
}

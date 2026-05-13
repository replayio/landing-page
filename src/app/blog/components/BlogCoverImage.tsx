'use client'

import Image from 'next/image'
import { useState } from 'react'

type BlogCoverImageProps = {
  src: string
  alt: string
  priority?: boolean
}

/**
 * Defense-in-depth wrapper around <Image /> for Notion cover URLs.
 * Notion serves cover images via AWS S3 presigned URLs that expire roughly
 * 1 hour after issuance; if /_next/image proxies a fetch to an expired URL
 * it returns 502 and the browser fires onError. Rather than show a broken
 * image icon, we fall back to a neutral gradient and let the rest of the
 * card stand on its own.
 */
export function BlogCoverImage({ src, alt, priority = false }: BlogCoverImageProps) {
  const [hasErrored, setHasErrored] = useState(false)

  if (hasErrored) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      quality={70}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasErrored(true)}
      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
    />
  )
}

import { useRouter } from 'next/dist/client/router'
import NextHead from 'next/head'
import * as React from 'react'

import { defaultMeta, siteOrigin } from '~/lib/constants'

type BasicMeta = {
  title?: string
  description?: string
  cannonical?: string
  ogImage?: string
  noIndex?: boolean
  noFollow?: boolean
  themeColor?: string
  preload?: { href: string; as: string }[]
  prefetch?: { href: string; as: string }[]
}

export type MetaProps = BasicMeta

export const Meta = (props: MetaProps) => {
  const router = useRouter()

  const resolvedMetadata = React.useMemo(() => {
    const data = {
      title: props.title ?? defaultMeta.title,
      description: props.description ?? defaultMeta.description,
      canonical: props.cannonical ?? `${siteOrigin}${router.pathname}`,
      ogImage: {
        url: props.ogImage ?? defaultMeta.ogImage,
        alt: props.title ?? defaultMeta.title,
        width: 1200,
        height: 630
      },
      twitter: {
        cardType: 'summary_large_image',
        handle: defaultMeta.twitter.handle,
        site: defaultMeta.twitter.site
      },
      noIndex: props.noIndex,
      noFollow: props.noFollow
    }

    if (!data.ogImage.url.startsWith('http')) {
      throw new Error('ogImage must be an absolute URL.')
    }

    if (!data.canonical.startsWith('http')) {
      throw new Error('canonical must be an absolute URL.')
    }

    return data
  }, [props, router.pathname])

  return (
    <>
      <NextHead>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          key="viewport"
          content="width=device-width, height=device-height, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content={props.themeColor ?? '#000000'} />

        {/* Favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {props.noIndex && <meta name="robots" content="noindex" />}
        {props.noFollow && <meta name="robots" content="nofollow" />}

        <title>{resolvedMetadata.title}</title>
        <meta name="description" content={resolvedMetadata.description} />
        <meta name="twitter:card" content={resolvedMetadata.twitter.cardType} />
        <meta name="twitter:site" content={resolvedMetadata.twitter.site} />
        <meta name="twitter:creator" content={resolvedMetadata.twitter.site} />
        <meta name="twitter:title" content={resolvedMetadata.title} />
        <meta
          name="twitter:description"
          content={resolvedMetadata.description}
        />
        <meta name="twitter:image" content={resolvedMetadata.ogImage.url} />
        <meta property="og:title" content={resolvedMetadata.title} />
        <meta
          property="og:description"
          content={resolvedMetadata.description}
        />
        <meta property="og:url" content={resolvedMetadata.canonical} />
        <meta property="og:image" content={resolvedMetadata.ogImage.url} />
        <meta property="og:image:alt" content={resolvedMetadata.ogImage.alt} />
        <meta
          property="og:image:width"
          content={resolvedMetadata.ogImage.width + ''}
        />
        <meta
          property="og:image:height"
          content={resolvedMetadata.ogImage.height + ''}
        />
        <link rel="canonical" href={resolvedMetadata.canonical} />

        {props.preload?.map(({ href, as }) => (
          <link key={href} rel="preload" href={href} as={as} />
        ))}
        {props.prefetch?.map(({ href, as }) => (
          <link key={href} rel="prefetch" href={href} as={as} />
        ))}
      </NextHead>
    </>
  )
}

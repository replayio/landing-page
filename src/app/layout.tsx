import '~/styles/tailwind.css'
import { Viewport, type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import { defaultMeta } from '~/lib/constants'
import { ReactNode } from 'react'
import Analytics from '~/lib/analytics'
import { Toolbar } from 'basehub/next-toolbar'

export const metadata: Metadata = {
  title: {
    template: '%s - Replay',
    default: 'Replay - Time Travel Browser DevTools'
  },
  description: defaultMeta.description,
  openGraph: {
    title: defaultMeta.title,
    description: defaultMeta.description,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  twitter: {
    site: defaultMeta.twitter.site,
    title: defaultMeta.title,
    description: defaultMeta.description,
    creator: defaultMeta.twitter.handle,
    images: [{ url: defaultMeta.ogImage, width: 1200, height: 630 }]
  },
  other: {
    name: 'ahrefs-site-verification',
    content: 'd6acf1324602b320f37276d0f77e3e8ced24a91e2298c91fdcb79f2143e73bc6'
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend'
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={clsx('h-full scroll-smooth bg-white antialiased', inter.variable, lexend.variable)}
    >
      <head>
        <Analytics />
        <Toolbar />
      </head>
      <body>{children}</body>
    </html>
  )
}
